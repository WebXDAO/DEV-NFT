import { ethers } from 'ethers'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/client'

import { nftaddress, nftmarketaddress } from '../../config'

import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'
import Layout from '../../layout/Layout'
import MarketplaceList from '../../components/marketplaceList'

let rpcEndpoint = 'https://matic-mumbai.chainstacklabs.com'

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
  rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
}

export default function Home (/** { session } */) {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs () {
    const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    )
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        const item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description
        }
        return item
      })
    )
    setNfts(items)
    setLoadingState('loaded')
  }

  if (loadingState === 'loaded' && !nfts.length) {
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
  }
  return (
    <Layout headerName="Dev-NFT Marketplace">
      <MarketplaceList />
    </Layout>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {
  // Get github login
  const session = await getSession(context)
  if (session) {
    const login = session.profile.login

    if (login) {
      const res = await fetch(
        'https://api.github.com/users/' + login + '/repos'
      )
      const reposList = await res.json()

      return {
        props: {
          session,
          reposList
        }
      }
    }
  }

  return {
    props: {
      session
    }
  }
}
