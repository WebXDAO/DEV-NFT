import Image from "next/image";
import NFTCardsMocked from "../NFT/NFTCardsMocked";

// Replace this with DevNFT Feeds
const marketplaceMocked = [
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-astrochair.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25915252",
    nft_img: "mocked/mock-astrochair.png",
  },
  {
    collection: "Cryptobros",
    collection_img: "mocked/mock-ppl.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25215658",
    nft_img: "mocked/mock-ppl.png",
  },
  {
    collection: "WebxArt",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25295255",
    nft_img: "mocked/mock-astropool.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25245253",
    nft_img: "mocked/mock-hearth.png",
  },
  // ...
  {
    collection: "WebxArt",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#24215252",
    nft_img: "mocked/mock-ppl.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-astropool.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#21215258",
    nft_img: "mocked/mock-astropool.png",
  },
  {
    collection: "HearthBros",
    collection_img: "mocked/mock-hearth.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#23215255",
    nft_img: "mocked/mock-hearth.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-astrochair.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#22215253",
    nft_img: "mocked/mock-ppl.png",
  },
  // ...
];

export default function OsMarketplace() {
  return (
    <div className="relative bg-[#F7F9FB] pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-[#F7F9FB] h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Open Source Marketplace
          </h2>
          <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Checkout the latest DevNFT minted 🌳
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
          {marketplaceMocked.map((nft) => (
            <NFTCardsMocked key={nft.nft_id} item={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}
