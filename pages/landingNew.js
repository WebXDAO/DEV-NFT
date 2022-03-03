import Navbar from "../components/nav/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/landing-v2/Footer";
import Started from "../components/landing-v2/GetStarted";
import Explore from "../components/landing-v2/Explore";
const landingNew = () => {
  return (
    <div className="bg-white">
      <div className="relative h-screen">
        <Navbar />

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
          <Hero />
          <Started />
          <Explore />
        </main>
        {/* Footer <footer></footer> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default landingNew;
