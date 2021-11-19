import 'tailwindcss/tailwind.css';
import "../styles/global.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { useEffect } from "react";
import api from "../lib/appwrite";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    api
      .createSession()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;