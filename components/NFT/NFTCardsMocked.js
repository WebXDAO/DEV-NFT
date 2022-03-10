import Image from "next/image";

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

const NFTCardsMocked = (nft) => {
  console.log(nft)
  return (
    <div
      key={nft.item.nft_id}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
    >
      {/* NFT IMG */}
      <div className="flex-shrink-0 p-4">
        <img
          className="h-48 w-full object-cover rounded-md bg-[#F2B4B0]"
          src={nft.item.nft_img}
          alt=""
        />
      </div>

      {/* NFT AUTHOR */}
      <div className="flex-1 bg-white px-6 pb-4 flex flex-col justify-between">
        <div className="flex ">
          <div className="flex-grow">
            <div className="flex">
              <div className="flex-shrink-0">
                <a href={nft.item.owner}>
                  <span className="sr-only">Owned by {nft.item.owner}</span>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={nft.item.collection_img}
                    alt=""
                  />
                </a>
              </div>

              {/* PP + Collection + Owned by ...  */}
              <div className="ml-3">
                <div className="">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      {nft.item.collection}
                    </a>
                  </p>
                  <div className="flex space-x-1 text-xs text-gray-500">
                    <span>
                      Owned by{" "}
                      <span className="font-medium text-devnft">
                        {nft.item.owner}
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
          <span className="text-md font-medium">{nft.item.price}</span>
        </div>
      </div>

      {/* PURCHASE */}
      <div className="px-6 pb-4">
        <div className="flex w-full text-center">
          <button
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

export default NFTCardsMocked;
