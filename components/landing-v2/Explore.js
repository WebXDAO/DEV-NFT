import Image from "next/image";

const Explore = () => {
  return (
    <div className="relative px-2">
      <div className="w-full lg:px-20 lg:mx-auto">
        <Image
          className="scale-95 md:scale-y-75"
          layout="responsive"
          height={720}
          width={1080}
          src="/Group.png"
        />
      </div>
      <div className="absolute bottom-10 md:top-[50%] lg:top-1/2 left-[10%] lg:left-[15%] space-y-2 md:space-y-4 text-white">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
          Be a part of the revolution
        </h1>
        <p className="text-xs md:text-sm w-[90%] md:w-2/3">
          A NFT of your favorite Open Source Project, is like a autograph from
          the repo owner, How cool, isn’t it? Hop in now!
        </p>
        <button className="font-semibold bg-gradient-to-br from-[#AF51C5] to-[#6E297E] text-sm p-0.5 py-1 sm:p-2 px-4 lg:p-4 rounded-md cursor-pointer hover:scale-110 scale-100 transition-all ease-in-out duration-300">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Explore;
