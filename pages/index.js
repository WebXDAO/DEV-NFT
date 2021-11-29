import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  getSession,
  signIn, 
  signOut,
  useSession
} from 'next-auth/client';
import Link from 'next/link';

const  home = ({ session }) => {

  return (
    <div className="bg-gradient-to-r from-pink-400 to-blue-500">
      <Head>
        <title>NFT-DEV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen w-screen">
        
        {/* If not session = Display if not connected to Github */}
        {!session && <>
          <h1 className="text-4xl text-white">You are not signed in</h1> <br/>
          <button onClick={signIn}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Sign in
          </button>
        </>}

        {/* If session = Display if connected to Github */}
        {session && <>

          {/* Login status */}
          <div className="flex justify-center items-center space-x-2">
            <h1 className="text-4xl text-white">Signed in as <b>{session.name}</b> - Login: {session.profile.login}</h1>
            <img className="w-12 h-12 rounded-full" src={session.picture} alt={session.name} />
            <span className="text-4xl">🎉</span>
          </div>
        

          {/* Show the repository list */}
          <div className="flex flex-col justify-center items-center space-y-5 mt-10">

            <Link href="/repos-list"><a>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Go to Repository list</span>
              </button>
            </a></Link>

            <button onClick={signOut}
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 hover:border-blue-500 rounded">
                      Sign out
            </button>
          </div>
        </>}

      </main>
    </div>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log("session", session)

  return {
    props: {
      session,
    },
  };
};

export default home;

