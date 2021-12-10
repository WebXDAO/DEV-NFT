import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import {
  getSession,
  signIn,
  signOut,
  useSession
} from 'next-auth/client';
import {
  LoginIcon
} from '@heroicons/react/outline';
import ReposList from '../../components/ReposList'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import Layout from '../../layout/Layout'

export default function CreateItem({ session, reposList, login }) {

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()
  const [open, setOpen] = useState(false);

  

  // The file are upload first here
  async function onChange(e) {
    const file = e.target.files[0]
    console.log(file)
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )

      console.log("added", added)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createBlobUrl() {
    var svgElement = document.getElementById('svg_element');
    console.log("svg element", svgElement)
    let {width, height} = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);
    let outerHTML = clonedSvgElement.outerHTML;
    let blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});

    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);

    return blobURL;
  }

  async function createPng() {
    
    var svgElement = document.getElementById('svg_element');
    console.log("svg element", svgElement)
    let {width, height} = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);
    let outerHTML = clonedSvgElement.outerHTML;
    let blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});

    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);

    let canvas = document.querySelector('canvas');

    // Need image procession here
    let image = new Image();
    image.onload = () => {
      
      let canvas = document.createElement('canvas');
      
      canvas.widht = width;
      
      canvas.height = height;
      let context = canvas.getContext('2d');
      // draw image in canvas starting left-0 , top - 0  
      context.drawImage(image, 0, 0, width, height );
      //  downloadImage(canvas); need to implement
    };
    image.src = blobURL;


    let png = canvas.toDataURL(); // default png
    console.log("png dataUrl", png)
    
    return png;
  }

  // Transit or fetch github selected repos

  async function createMarket() {
    const { name, description, price } = formInput
    // const fileUrl = createPng();
    console.log("createMarket fileUrl", fileUrl)

    if (!name || !description || !price || !fileUrl) return

    
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url) {

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    // TODO: Udpate form here
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()

    // Maybe we can redirect the user to a 'creation-ok' pages
    // or trigger an tailwind alert!
    // If transaction is successfull, we redirect the user to
    // the dashboard.
    router.push('/dashboard')
  }



  return (
    <Layout headerName="Create a NFT" session={session}>
      <div className="flex mx-auto">

        {/* If user is connected to github, it display user's repos list */}
        {session &&
          <>
          <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in MATIC"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
            <ReposList reposList={reposList} login={login} />
          </>
        }

        {/* If user isn't connected to github, asking to connect */}
        {!session &&
          <>
            <div className="mx-auto w-3/4 mt-10">
              <button
                onClick={() => signIn()}
                type="button"
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >

                <LoginIcon className="h-10 w-10 mx-auto"/>
                <span className="mt-2 block text-sm font-medium text-gray-900">Login to Github</span>
              </button>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {

  // Get github login
  const session = await getSession(context)
  if (session) {
    var login = session.profile.login;

    if (login) {
      const res = await fetch('https://api.github.com/users/' + login + '/repos');
      const reposList = await res.json();

      // uncomment to see the api response
      // console.log(reposList)

      return {
        props: {
          session,
          reposList,
          login
        },
      };
    }
  }


  return {
    props: {
      session
    },
  };
};