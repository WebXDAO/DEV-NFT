import Navbar from "../components/nav/Navbar";
import Hero from '../components/Hero'
import Footer from "../components/landing-v2/Footer";
import OsMarketplace from "../components/landing-v2/OsMarketplace";

const landingNew = () => {
  return (
    <div className="bg-white">
      <div className="relative h-screen">
        <Navbar />

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
        <Hero />
        <OsMarketplace />
        </main>

        {/* Footer <footer></footer> */}
        <Footer></Footer>
      </div>
    </div>
  );
}

export default landingNew;