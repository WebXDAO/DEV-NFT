import Image from "next/image";
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import {
  nftaddress, nftmarketaddress
} from '../../config'
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../artifacts/contracts/Market.sol/NFTMarket.json'

const NFTIdComponent = (props) => {
  return (
    <>
      <div className="flex-grow">
        <div id="nft_id" className="">
          <p className="text-[11px] text-right text-slate-500">
            <a href="#" className="hover:underline">
              {props.nft.nft_id}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

const buyNft = async (nft) => {
  console.log("buyNft", nft)
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

const NFTCards = (props) => {
  console.log(props.nftItem)
  const nft = props.nftItem;
  
  return (
    <div
      key={nft.tokenId}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
    >
      {/* NFT IMG */}
      <div className="flex-shrink-0 p-4">
        <img
          className="h-48 w-full object-cover rounded-md bg-[#F2B4B0]"
          src={nft.image}
          alt=""
        />
      </div>

      {/* NFT AUTHOR */}
      <div className="flex-1 bg-white px-6 pb-4 flex flex-col justify-between">
        <div className="flex ">
          <div className="flex-grow">
            <div className="flex">
              <div className="flex-shrink-0">
                <a href={nft.owner}>
                  <span className="sr-only">Owned by {nft.owner}</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={nft.image}
                    alt=""
                  />
                </a>
              </div>

              {/* PP + Collection + Owned by ...  */}
              <div className="ml-3">
                <div className="">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      {nft.name}
                    </a>
                  </p>
                  <div className="flex space-x-1 text-xs text-gray-500">
                    <span>
                      Owned by{" "}
                      <span className="font-medium text-devnft">
                        {nft.owner}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NFT ID */}
          <NFTIdComponent nft={nft} />
        </div>
      </div>

      {/* PRICE */}
      <div className="flex gap-5 px-6 pb-4 justify-between text-gray-800">
        <div className="font-medium">
          <p>Price</p>
        </div>

        <div className="flex space-x-1 items-en">
          <span>
            <Image src="/polygon_network.png" height="15" width="15" />
          </span>
          <span className="text-md font-medium">{nft.price}</span>
        </div>
      </div>

      {/* PURCHASE */}
      <div className="px-6 pb-4">
        <div className="flex w-full text-center">
          <button
          onClick={() => buyNft(nft)}
            type="button"
            className="w-full items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCards;
