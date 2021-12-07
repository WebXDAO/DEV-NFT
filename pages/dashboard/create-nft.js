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



  return (
    <Layout headerName="Create a NFT" session={session}>
      <div className="flex mx-auto">

        {/* If user is connected to github, it display user's repos list */}
        {session &&
          <>
            <ReposList reposList={reposList} />
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