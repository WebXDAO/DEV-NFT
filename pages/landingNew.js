import Navbar from "../components/nav/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/landing-v2/Footer";
import Started from "../components/landing-v2/GetStarted";
const landingNew = () => {
  return (
    <div className="bg-white">
      <div className="relative h-screen">
        <Navbar />

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
          <Hero />
          <Started />
        </main>
        {/* Footer <footer></footer> */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default landingNew;
