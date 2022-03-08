import Image from "next/image";

const marketplaceMocked = [
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25215252",
    nft_img: "mocked/mock-ppl.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25215258",
    nft_img: "mocked/mock-ppl.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25215255",
    nft_img: "mocked/mock-ppl.png",
  },
  {
    collection: "Metaverse",
    collection_img: "mocked/mock-nft.png",
    price: "0.05",
    likes: "372",
    owner: "John Doe",
    nft_id: "#25215253",
    nft_img: "mocked/mock-ppl.png",
  },
  // ...
];

export default function OsMarketplace() {
  return (
    <div className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
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
            <div
              key={nft.nft_id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              {/* NFT IMG */}
              <div className="flex-shrink-0 p-4">
                <img
                  className="h-48 w-full object-cover rounded-md bg-[#F2B4B0]"
                  src={nft.nft_img}
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
                            src={nft.collection_img}
                            alt=""
                          />
                        </a>
                      </div>

                      {/* PP + Collection + Owned by ...  */}
                      <div className="ml-3">
                        <div className="">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                              {nft.collection}
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
                  <div className="flex-grow">
                    <div id="nft_id" className="">
                      <p className="text-[11px] text-right text-slate-500">
                        <a href="#" className="hover:underline">
                          {nft.nft_id}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIKE = PRICE */}
              <div className="flex gap-5 px-6 pb-4">
                <div className="w-full text-center">
                  <p>coeur</p>
                </div>
                <div className="flex items-end text-center">
                  <Image className="mr-1" src="/polygon_network.png" alt="Polygon" width="30" height="30"/>
                  <p className="">{nft.price}</p>
                </div>
              </div>

              {/* PURCHASE */}
              <div className="px-6 pb-4">
                <div className="flex w-full  text-center">
                  <button
                    type="button"
                    className="w-full items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft"
                  >
                    Purchase
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
