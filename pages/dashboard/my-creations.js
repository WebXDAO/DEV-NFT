import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import {
  getSession,
} from 'next-auth/client';

import {
  nftmarketaddress, nftaddress
} from '../../config'

import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Layout from '../../layout/Layout'

export default function MyCreation() {
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [])
  
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
      
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        description: meta.data.description,
        name: meta.data.name
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return (
      <Layout headerName="My NFTs">
        <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
      </Layout>
    )
  }
  
  return (
    <Layout headerName="My creations">
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            // NFT card UI
            nfts.map((nft, i) => (
              <div key={i} className="border shadow-md rounded-xl overflow-hidden">
                  <div className="w-full h-full flex justify-center items-center">
                      <div className="relative flex flex-col justify-center rounded-xl w-full">
                          <div className="top-0 left-0 mt-5 px-1 mx-5 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">{nft.price} MATIC</div>
                              <div className="relative m-4">

                                  {/*<!-- :src="image.largeImageURL"     -->*/}
                                  <img src={nft.image} className="object-contain rounded-t-xl w-full" alt=""/>
                              </div>
                              <div className="px-2 py-1 ">

                                  {/*<!-- Product Title -->*/}
                                  <div className="mx-auto px-2 py-2">
                                      <div className="text-sm md:text-base font-bold pr-2">{nft.name}</div>
                                      <p  className="h-16 pb-1 md:pb-2 text-xs md:text-sm text-gray-500">{nft.description}</p>
                                  </div>
                              </div>
                      </div> 
                  </div>
              </div>
            ))
          }
        </div>
      </div>
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                      <img src={nft.image} className="rounded" />
                      <div className="p-4 bg-black">
                        <p className="text-2xl font-bold text-white">Price - {nft.price} MATIC</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
    </Layout>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {

  // Get github login
  const session = await getSession(context)
  if (session) {
    // Do something...
  }

  return {
    props: {
      session
    }
  };
};
