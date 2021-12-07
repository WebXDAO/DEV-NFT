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

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import Layout from '../../layout/Layout'

export default function CreateItem({ session, reposList }) {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()
  const [open, setOpen] = useState(false);

  const people = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
    // More people...
  ]

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  // Transit or fetch github selected repos

  async function createMarket() {
    const { name, description, price } = formInput
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

  // Show the repos informations
  async function selectRepo(repos) {
    console.log("clicked repos =>", repos)
  }

  return (
    <Layout headerName="Create a NFT" session={session}>
      <div className="flex mx-auto">

        {/* If user is connected to github, it display user's repos list */}
        {session &&
          <>
            <div className="flex flex-col overflow-auto">
              <h2 className="text-2xl font-semibold text-center mt-4">Select your repos</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-10">
                    {reposList.map((repos, i) => (
                      <div
                        onClick={() => selectRepo(repos)}
                        key={i}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                      >
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={repos.owner.avatar_url} alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <a href="#" className="focus:outline-none">
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-gray-900">{repos.full_name}</p>
                            <p className="text-sm text-gray-500 truncate">{repos.description}</p>
                          </a>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Preview
                        </button>
                      </div>
                    ))}
                  </div>
            </div>
          </>}

        {/* If user isn't connected to github, asking to connect */}
        {!session &&
          <>
            {/* <div className="flex justify-center items-center w-full h-full">
            <a
              onClick={() => signIn()}
              href="#"
              className="flex items-center justify-center px-4 py-2 text-xs rounded-md text-white bg-purple-800 hover:bg-purple-700 md:py-2 md:text-sm md:px-10"
            >
              Login to Github
            </a>
          </div> */}


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
          </>}

        

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

      console.log(reposList)

      return {
        props: {
          session,
          reposList
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