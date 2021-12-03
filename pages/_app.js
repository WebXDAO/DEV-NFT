import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { Provider, useSession, getSession, signOut } from 'next-auth/client'
import { SessionProvider } from 'next-auth/client'


function MyApp({ Component, pageProps }) {

  // Get next-auth session
  const session = pageProps.session;
  
  return (
    <>
    <Provider session={pageProps.session}>
      <Component { ...pageProps } />
    </Provider>
    </>
  )
}

export default MyApp
