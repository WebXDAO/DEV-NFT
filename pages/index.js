import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from "next/router";
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  getSession,
  signIn,
  signOut,
  useSession
} from 'next-auth/client';
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  CloudUploadIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  LockClosedIcon,
  CogIcon,
  ServerIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
  LogoutIcon,
  LoginIcon,
  
} from '@heroicons/react/outline';
// If you need another icon, just add his name in the list below
// from https://unpkg.com/browse/@heroicons/react@1.0.5/outline/
let Web3 = require('web3');
import Footer from '../components/landing/footer'
import Features from '../components/landing/features';
import Faq from '../components/landing/faq';
import SToken from '../components/landing/stoken';
import Hero from '../components/landing/hero';

const home = ({ session }) => {

  // Mobile menu data
  const mobileMenu = [
    { name: 'Marketplace', icon: PlayIcon, href:'/dashboard' }
  ]

  // ---- METAMASK ----
  const [address, setAddress] = useState([])
  const [count, setCount] = useState([0])
  const [heroButton, setHeroButton] = useState('Connect Wallet');

  // MetaMask injects the window.ethereum object into our browser whenever the extension
  // is installed and active. We do this when our page is done loading in a useEffect hook
  // and put it into our state for later use.
  useEffect(() => {

    
    const checkConnection = async () => {

      // Check if browser is running Metamask
      let web3 = null;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        setCount(1);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      };

      // Check if User is already connected by retrieving the accounts
      if(web3===null){
        setHeroButton('Please Install Metamask Wallet')
      }
      if(web3){
      web3.eth.getAccounts()
        .then(async (addr) => {
          
          // Set User account into state
          setAddress(addr);

          if (addr.length > 0) {
            console.log("Current Metamask wallet: ", addr)
            setHeroButton("Marketplace")
          }
        });
    };
  }
    checkConnection();

  }, [])

  console.log("Current Github session: ", session);

  return (
    <div className="relative bg-gray-50">
      <Head>
        <title>DevNFT</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      {/* We should add this header inside a component */}
      <Popover className="relative bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" alt="DEV-NFT Home">
                <a href="#">
                  <span className="sr-only">DevNFT</span>
                  <span className="text-2xl font-bold text-purple-600">DevNFT </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Mumbai Testnet
                  </span>

                  {/* If we need a logo, put it here !
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/section-media.png"
                    alt=""
                  /> */}

                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {/* <a
                onClick={connectToMetamask}
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Connect Wallet
              </a> */}

              {/* ------ Display if connected ------ */}
              {address.length > 0 && <>
                &nbsp;
                🦊
                &nbsp;
                <div className="text-sm leading-7 font-semibold text-gray-900">{address}</div>
              </>}
              {session && <>
                <span className="ml-1 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black">
                  <b>{session.name}</b>
                  <img className="w-6 h-6 rounded-full mx-auto ml-2" src={session.picture} alt={session.name} />
                </span>
                <Link href="/dashboard" alt="Go to dashboard">
                  <span className="ml-2 whitespace-nowrap inline-flex items-center cursor-pointer justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700">
                    Marketplace
                  </span>
                </Link>
                <span
                  onClick={() =>
                    signOut({
                      callbackUrl: `${window.location.origin}`
                    })
                  }
                  className="ml-1 whitespace-nowrap inline-flex items-center cursor-pointer justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-800 hover:bg-red-900">
                  <LogoutIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  Logout
                </span>
              </>}

              {/* ------ Display if not connected ------ */}
              {!session && <>
                <Link href="/login">
                  <a
                    href="#"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
                  >
                    Login
                  </a>
                </Link>
              </>}


            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >

          {/* Menu Mobile */}
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    {/* DEV NFT Mobile LOGO */}
                    <img
                      className="h-8 w-auto"
                      src="/section-media.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-6">
                    {mobileMenu.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                      >
                        <item.icon className="flex-shrink-0 h-6 w-6 text-purple-600" aria-hidden="true" />
                        <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                      </a>
                    ))}

                    <div className="flex py-1 justify-between">
                      {/* Login button */}
                      {!session?(
                        <a
                          href="/login"
                          className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                        >
                          <LoginIcon className="flex-shrink-0 h-6 w-6 text-purple-600" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-gray-900">Login</span>
                        </a>
                        ):(
                        <>
                        {/* Profile and Logout button */}
                          <div className="flex items-center">
                              <img className="h-8 w-8 mx-2 rounded-full" src={session.picture} alt="" />
                              <div className="text-base font-medium">{session.name}</div>
                          </div>
                          <button
                              type="button"
                              className="p-1"
                          >
                              <LogoutIcon onClick={() => signOut()} className="h-6 w-6" aria-hidden="true" />
                          </button>
                      </>)}              
                    </div>
                  </nav>
                </div>
              </div>

            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Hero */}
      <main className="lg:relative">
        <Hero heroButton={ heroButton }/>
      </main>

      <SToken />

      <Faq />

      <Features />

      <Footer footerText="&copy; 2021 Web3Community. All rights reserved." />
    </div>
  )
}

// Get the github session at the runtime of the app
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // Get account from web3.js (not used atm)
  // web3.eth.getAccounts(function(err, accounts){
  //   if (err != null) console.error("An error occurred: "+err);
  //   else if (accounts.length == 0) console.log("User is not logged in to MetaMask");
  //   else console.log("User is logged in to MetaMask");
  // });

  return {
    props: {
      session,
    },
  };
};

export default home;

