import Navbar from "../components/nav/Navbar";
import Hero from '../components/Hero'
import Footer from "../components/landing-v2/Footer";
const landingNew = () => {
  return (
    <div className="bg-white">
      <div className="relative h-screen">
        <Navbar />

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
        <Hero />
        </main>

        {/* Footer <footer></footer> */}
        <Footer></Footer>
      </div>
    </div>
  );
}

export default landingNew;