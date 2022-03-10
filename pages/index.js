

import Navbar from "../components/nav/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/landing-v2/Footer";
import Started from "../components/landing-v2/GetStarted";
import Explore from "../components/landing-v2/Explore";
import OsMarketplace from "../components/landing-v2/OsMarketplace";
import Banner from "../components/landing-v2/Banner";
import Heroo from "../components/landing-v2/Heroo";
import { getSession } from "next-auth/client";

const Home = ({ session }) => {
  return (
    <div className="bg-white">
      <div className="relative h-screen">
        <Navbar session={session}/>

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
          <Hero />
          {/* <Heroo /> */}
          <OsMarketplace />
          {/* <Started /> */}
          <Explore />
        </main>
        {/* Footer <footer></footer> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // Get account from web3.js (not used atm)
  // web3.eth.getAccounts(function(err, accounts){
  //   if (err != null) console.error("An error occurred: "+err);
  //   else if (accounts.length == 0) console.log("User is not logged in to MetaMask");
  //   else console.log("User is logged in to MetaMask");
  // });

  return {
    props: {
      session,
    },
  };
};

export default Home;