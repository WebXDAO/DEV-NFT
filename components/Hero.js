const Hero = () => {
  return (
    <div className="my-24 px-8 lg:px-4">
      <div className="grid grid-cols-12 gap-8 lg:gap-0">
        <div className="col-span-12 lg:col-span-6 lg:my-20 lg:ml-20 flex flex-col text-center lg:text-left">
          <div className="text-[#000000] text-3xl lg:text-[46px] lg:leading-tight font-semibold">
            Worlds first NFT marketplace of Open Source Repositories
          </div>
          <div className="text-[#8a939b] container-[400px] lg:text-2xl mt-[0.8rem] lg:mb-[2.5rem]">
            Digital marketplace for non-fungible tokens (NFTs). Buy, Sell, and
            discover exclusive digital assets.
          </div>
          <div className="flex mx-auto lg:mx-0 my-4 space-x-4">
            <button className="relative lg:text-lg font-semibold px-12 py-4 bg-[#3D00B7] rounded-lg text-white hover:bg-[#7E56CE] cursor-pointer lg:rounded-[56px]">
              Explore
            </button>
            <button className="relative text-lg font-semibold px-12 py-4 bg-[#FFFFFF] rounded-lg text-[#3D00B7] hover:bg-[#D2C9E4] cursor-pointer border border-[#3D00B7] lg:rounded-[56px]">
              Create
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 rounded-[3rem] mx-auto h-2/3">
          <img
            className="rounded-t-lg"
            src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
            alt=""
          />
          <div className="h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white">
            <img
              className="h-[2.25rem] rounded-full"
              src="https://iili.io/1MALwG.png"
              alt=""
            />
            <div className="flex flex-col justify-center ml-4">
              <div>Jolly</div>
              <a
                className="text-[#1868b7]"
                href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/2324922113504035910649522729980423429926362207300810036887725141691069366277"
              >
                hola-kanola
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;