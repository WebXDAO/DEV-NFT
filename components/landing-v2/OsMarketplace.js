const marketplaceMocked = [
  {
    collection: 'Metaverse',
    collection_img: 'mocked/mock-nft.png',
    price: '0.05',
    likes: '372',
    owner: 'John Doe',
    nft_id: '#25215252',
    nft_img: 'mocked/mock-ppl.png',
  },
  {
    collection: 'Metaverse',
    collection_img: 'mocked/mock-nft.png',
    price: '0.05',
    likes: '372',
    owner: 'John Doe',
    nft_id: '#25215258',
    nft_img: 'mocked/mock-ppl.png',
  },
  {
    collection: 'Metaverse',
    collection_img: 'mocked/mock-nft.png',
    price: '0.05',
    likes: '372',
    owner: 'John Doe',
    nft_id: '#25215255',
    nft_img: 'mocked/mock-ppl.png',
  },
  {
    collection: 'Metaverse',
    collection_img: 'mocked/mock-nft.png',
    price: '0.05',
    likes: '372',
    owner: 'John Doe',
    nft_id: '#25215253',
    nft_img: 'mocked/mock-ppl.png',
  },
  // ...
]

export default function OsMarketplace() {
  return (
    <div className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Open Source Marketplace 🚀</h2>
          {/* <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
          </p> */}
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
          {marketplaceMocked.map((nft) => (

            <div key={nft.nft_id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0 p-4">
                <img className="h-48 w-full object-cover rounded-md bg-[#F2B4B0]" src={nft.nft_img} alt="" />
              </div>
              <div className="flex-1 bg-white px-6 pb-4 flex flex-col justify-between">
                
              <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href={nft.owner}>
                      <span className="sr-only">Owned by {nft.owner}</span>
                      <img className="h-10 w-10 rounded-full" src={nft.collection_img} alt="" />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        {nft.collection}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      {/* <time dateTime={post.datetime}>{post.date}</time> */}
                      <span>Owned by <span className="font-medium text-devnft">{nft.owner}</span></span>
                      {/* <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span> */}
                    </div>
                  </div>
                </div>
                
                {/* <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                  </a>
                </div> */}
                
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  )
}
