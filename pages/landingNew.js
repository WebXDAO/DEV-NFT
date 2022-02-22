import Navbar from "../components/nav/Navbar";
import Hero from '../components/Hero'
const landingNew = () => {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden h-screen">
        <Navbar />

        {/* Main content: Hero and others components inside <main></main> */}
        <main>
        <Hero />
        </main>

        {/* Footer <footer></footer> */}
      </div>
    </div>
  );
}

export default landingNew;