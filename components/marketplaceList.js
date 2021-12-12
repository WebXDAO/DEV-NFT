import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Image from "next/image";
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'


import {
    nftaddress, nftmarketaddress
} from '../config'


function MarketplaceList() {

    // Load the NFTs from mainnet :
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    let rpcEndpoint = "https://matic-mumbai.chainstacklabs.com"

    if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
      rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
    }

    // Load Marketplace NFT List 
    async function loadNFTs() {
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
        const data = await marketContract.fetchMarketItems()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    // Buy NFT
    async function buyNft(nft) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nftaddress, nft.itemId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

     // Main
     useEffect(() => {
        loadNFTs()
    }, []);


    console.log("nft object", nfts)

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
        <>
            <div className="flex justify-center">
                <div className="px-4" style={{ maxWidth: '1600px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        {
                            nfts.map((nft, i) => (
                                <div key={i} className="border shadow rounded-xl overflow-hidden">
                                    {/* <Image src={nft.image} layout="fill"/> */}
                                    
                                    {/*temp card testing*/}
                                                                        {/*<!-- component -->*/}
                                    {/*<!-- This is an example component -->*/}
                                    <div class=" w-full h-full flex justify-center items-center">
                                        <div class="relative flex justify-center rounded-xl">
                                            <div class="top-0 left-0 mt-3 px-1 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">{nft.price} MATIC</div>
                                            <div class="w-65 pb-2 bg-white rounded-xl shadow-xl z-10">
                                                <div class="relative">
                                                {/*<!-- :src="image.largeImageURL"     -->*/}
                                                    <img src={nft.image} class="object-cover rounded-t-xl" alt=""/>
                                                </div>
                                                <div class="px-2 py-1">
                                                    {/*<!-- Product Title -->*/}
                                                    <div class="text-sm md:text-base font-bold pr-2">{nft.name}</div>
                                                    <p style={{ height: '70px', overflow: 'hidden' }} class="pb-1 md:pb-2 text-xs md:text-sm text-gray-500">{nft.description}</p>
                                                    {/*<!-- Tombol pesan -->*/}
                                                    <button class="font-bold inset-x-0 bottom-0 flex justify-center bg-purple-600 hover:bg-white text-sm md:text-base border hover:border-2 hover:border-purple-800 rounded-xl w-14 md:w-16 p-1 text-gray-100 hover:text-blue-900" onClick={() => buyNft(nft)}>Buy</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}


export default MarketplaceList;