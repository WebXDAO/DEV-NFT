import Link from "next/link";

const GetStarted = () => {
  return (
    // <div className="bg-white w-full my-2">
    //   <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
    //         Getting Started
    //   </h2>
    //   <div className="flex flex-wrap my-8">
    //     <div className="w-full lg:w-2/3 p-4">
    //       <PlayerComponent />
    //     </div>
    //     {/* <div className="w-full lg:w-1/3 text-center px-6 lg:-ml-20 lg:text-left py-8">
    //       <RightComponent />
    //     </div> */}
    //   </div>
    // </div>

<div className="relative bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
<div className="absolute inset-0">
  <div className="bg-white h-1/3 sm:h-2/3" />
</div>
<div className="relative max-w-7xl mx-auto">
  <div className="text-left">
    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
      Getting Started
    </h2>
    <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
      Mint your GitHub NFT 🔥
    </p>
  </div>
  <div className="mt-12 max-w-lg mx-auto  gap-5 lg:max-w-none">
    {/* <PlayerComponent /> */}
  </div>
</div>
</div>
  );
};
export default GetStarted;

const PlayerComponent = () => {
  return (
    <div className="relative rounded-xl pt-8 p-2 mx-2 md:mx-20 lg:mx-40 bg-devnft bg-opacity-5 shadow-xl flex flex-col justify-center items-center">
      <div className="absolute top-2 left-4 flex space-x-1 w-full">
        <div className="bg-[#FC1F6F] rounded-full w-3 h-3" />
        <div className="bg-[#FFCC18] rounded-full w-3 h-3" />
        <div className="bg-[#1DF359] rounded-full w-3 h-3" />
        <h1 className="absolute text-center w-full text-gray-500 text-sm">
          YouTube
        </h1>
      </div>
      <div className="w-full h-full p-32 md:p-48 overflow-hidden relative">
        <iframe
          width="853"
          height="520"
          src="https://youtube.com/embed/oUSqSSBQaA4"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="DevNFT"
          className="left-0 rounded-xl top-0 h-full w-full absolute"
        />
      </div>
    </div>
  );
};

const RightComponent = () => {
  const points = [
    { status: true, text: "Design content for products to be sold" },
    { status: true, text: "Design content to offer services" },
    {
      status: true,
      text: "Create product that include Social Feeds as features in it",
    },
    { status: true, text: "Design content to offer services" },
    {
      status: true,
      text: "Create product that include Social Feeds as features in it",
    },
    { status: false, text: "Resell it without making significant changes" },
    {
      status: false,
      text: "Create design generator tool that include Social Feeds",
    },
    { status: false, text: "Resell it without making significant changes" },
    {
      status: false,
      text: "Create design generator tool that include Social Feeds",
    },
  ];
  return (
    <>
      <h1 className="text-xl">
        Figma Social Feeds is Free For Personal or Commercial Use
      </h1>
      <p className="text-xs text-gray-600 my-3">
        Figma Social Feeds is licensed under CC BY 4.0, which means you are free
        to use template designs for personal or commercial purposes with
        attribution to the template design creator.
      </p>
      {points.map(({ status, text }, index) => (
        <div className="flex justify-center lg:justify-start space-x-1 items-center my-2">
          {status ? <CheckIcon /> : <CrossIcon />}
          <h4 className="text-xs text-gray-700">{text}</h4>
        </div>
      ))}
      <Link href="#" passHref>
        <a className="text-blue-400 font-semibold my-1 inline-flex text-sm items-center border border-devnft rounded-lg p-2 min-w-fit">
          Read Documentation <ExternalLink />
        </a>
      </Link>
    </>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="p-0.5 h-4 w-4 font-semibold bg-green-100 rounded-full text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="p-0.5 h-4 w-4 font-semibold bg-red-100 rounded-full text-red-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const ExternalLink = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 h-5 w-5 text-blue-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
};
