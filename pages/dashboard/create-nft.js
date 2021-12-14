import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import {
  getSession,
  signIn,
  signOut,
} from 'next-auth/client';
import {
  LoginIcon
} from '@heroicons/react/outline';
import ReposList from '../../components/ReposList'

import Layout from '../../layout/Layout'

export default function CreateItem({ session, reposList, login }) {

  return (
    <Layout headerName="Create a NFT" session={session}>
      <div className="flex mx-auto">

        {/* If user is connected to github, it display user's repos list */}
        {session &&
          <>
            <ReposList reposList={reposList} login={login} />
          </>
        }

        {/* If user isn't connected to github, asking to connect */}
        {!session &&
          <>
            <div className="mx-auto w-3/4 mt-10">
              <button
                onClick={() => signIn()}
                type="button"
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >

                <LoginIcon className="h-10 w-10 mx-auto"/>
                <span className="mt-2 block text-sm font-medium text-gray-900">Login to Github</span>
              </button>
            </div>
          </>
        }
      </div>
    </Layout>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {

  // Get github login
  const session = await getSession(context)
  if (session) {
    var login = session.profile.login;

    if (login) {
      const res = await fetch('https://api.github.com/users/' + login + '/repos');
      const reposList = await res.json();

      const res2 = await fetch()

      // uncomment to see the api response
      // console.log(reposList)

      return {
        props: {
          session,
          reposList,
          login
        },
      };
    }
  }
  // Redirect the user if not logged to github
  else {
    
    // note: we should trigger an alert if the user isn't connect
    return {
      redirect: { destination: '/dashboard', permanent: false }
    }
  }


  return {
    props: {
      session
    },
  };
};