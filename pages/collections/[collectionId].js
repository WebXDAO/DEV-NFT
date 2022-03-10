import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import Navbar from "../../components/nav/Navbar";
import { getSession } from "next-auth/client";
import axios from "axios";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { nftmarketaddress, nftaddress } from "../../config";

import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import NFTCards from "../../components/NFT/NFTCards";

const style = {
  bannerImageContainer: `h-[25vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-black`,
  endRow: `w-full flex justify-end text-black`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-devnft mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl text-gray-800 mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-devnft rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = ({ session }) => {
  console.log(session);
  const router = useRouter();
  const { provider } = useWeb3();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  // const nftModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(
  //     provider.getSigner(),
  //     'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //   )
  //   return sdk.getNFTModule(collectionId)
  // }, [provider])

  // // get all NFTs in the collection
  // useEffect(() => {
  //   if (!nftModule) return
  //   ;(async () => {
  //     const nfts = await nftModule.getAll()

  //     setNfts(nfts)
  //   })()
  // }, [nftModule])

  // const marketPlaceModule = useMemo(() => {
  //   if (!provider) return

  //   //TODO : Replace this

  //   // const sdk = new ThirdwebSDK(
  //   //   provider.getSigner(),
  //   //   'https://rinkeby.infura.io/v3/a464b9152d8c466c8a94a514fce8e837'
  //   // )
  //   // return sdk.getMarketplaceModule(
  //   //   '0x93A771F7ce845C33381f677489cF21a5964EDD0b'
  //   // )
  // }, [provider])

  // // get all listings in the collection
  // useEffect(() => {
  //   if (!marketPlaceModule) return
  //   ;(async () => {
  //     setListings(await marketPlaceModule.getAllListings())
  //   })()
  // }, [marketPlaceModule])

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          description: meta.data.description,
          name: meta.data.name,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  useEffect(() => {
    loadNFTs();
  }, [collectionId]);

  console.log(router.query);
  console.log(router.query.collectionId);

  return (
    <div className="overflow-hidden text-black">
      <Navbar session={session}></Navbar>

      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : "/mocked/profil-cover.png"
          }
          alt="banner"
        />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              session?.picture
                ? session.picture
                : "https://via.placeholder.com/200" // github image
            }
            alt="profile image"
          />
        </div>
        <div className={style.endRow}>
          <div className={style.socialIconsContainer}>
            <div className={style.socialIconsWrapper}>
              <div className={style.socialIconsContent}>
                <div className={style.socialIcon}>
                  <CgWebsite />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineInstagram />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <AiOutlineTwitter />
                </div>
                <div className={style.divider} />
                <div className={style.socialIcon}>
                  <HiDotsVertical />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>{session?.profile.login}</div>
        </div>
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by <span className="text-[#2081e2]">{session?.name}</span>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.statsContainer}>
            <div className={style.collectionStat}>
              <div className={style.statValue}>{nfts.length}</div>
              <div className={style.statName}>items</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                {collection?.allOwners ? collection.allOwners.length : "0"}
              </div>
              <div className={style.statName}>owners</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.floorPrice ? collection.floorPrice : "0"}
              </div>
              <div className={style.statName}>floor price</div>
            </div>
            <div className={style.collectionStat}>
              <div className={style.statValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {collection?.volumeTraded}.5K
              </div>
              <div className={style.statName}>volume traded</div>
            </div>
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.description}>{collection?.description}</div>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {/* {nfts.map((nftItem, id) => (
          <NFTCard
            key={id}
            nftItem={nftItem}
            title={collection?.title}
            listings={listings}
          />
        ))} */}
        {
          // NFT card UI
          nfts.map((nft, i) => (
            <NFTCards key={i} nftItem={nft} />
          ))
        }
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

export default Collection;
