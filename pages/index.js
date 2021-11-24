import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  signIn, 
  signOut,
  useSession
} from 'next-auth/client';
import Link from 'next/link';

const  home = () => {
  
  const [ session, loading ] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>NFT-DEV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        {!session && <>
          <h1>You are not signed in</h1> <br/>
          <button onClick={signIn}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Sign in
          </button>
        </>}

        {session && <>
          <h1>Signed in as {session.user.name} </h1> <br/>
          <h2>Go to <Link href="/marketplace"><a>Marketplace</a></Link>  </h2>
          <button onClick={signOut}
                  className="bg-blue-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Sign out
          </button>
        </>}

      </main>

      <footer className={styles.footer}>
          Powered by Web3Community
      </footer>
    </div>
  )
}

export default home;

