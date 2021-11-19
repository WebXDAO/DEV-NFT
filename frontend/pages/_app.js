import 'tailwindcss/tailwind.css'
import api from "../lib/appwrite";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

  // Appwrite connection
  useEffect(() => {
    api
      .createSession()
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
