import Head from 'next/head';
import styles from '../styles/Home.module.css';

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
} from '@heroicons/react/outline';
// If you need another icon, just add his name in the list below
// from https://unpkg.com/browse/@heroicons/react@1.0.5/outline/

// Faq sesction data
const faqs = [
  {
    question: 'Question 1?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'Question 2?',
    answer:
      'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  // More questions...
]

// Features section data
const features = [
  { name: 'Push to Deploy', icon: CloudUploadIcon },
  { name: 'SSL Certificates', icon: LockClosedIcon },
  { name: 'Simple Queues', icon: RefreshIcon },
  { name: 'Advanced Security', icon: ShieldCheckIcon },
  { name: 'Powerful API', icon: CogIcon },
  { name: 'Database Backups', icon: ServerIcon },
  // More features...
]

// Mobile menu data
const mobileMenu = [
  { name: 'Dashboard', icon: CogIcon }
]

const home = ({ session }) => {

  // ---- METAMASK ----
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)

  // MetaMask injects the window.ethereum object into our browser whenever the extension
  // is installed and active. We do this when our page is done loading in a useEffect hook
  // and put it into our state for later use.
  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        console.log("Account", accounts)
        console.log("Account[0]", accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)

      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
  }, [])

  function connectToMetamask() {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        console.log("Account", accounts)
        console.log("Account[0]", accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)

      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
  }

  return (
    <div className="relative bg-gray-50">
      <Head>
        <title>Dev-nft</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      {/* Menu */}
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Devnft</span>
                <span className="text-2xl font-bold text-purple-600">Devnft</span>

                {/* If we need a logo, put it here !
                 <img
                  className="h-8 w-auto sm:h-10"
                  src="/section-media.png"
                  alt=""
                /> */}

              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Connect Wallet
              </a>
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
                  <nav className="grid gap-y-8">
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
                  </nav>
                </div>
              </div>

            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Hero */}
      <main className="lg:relative">

        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block xl:inline">Lorem ipsum dolor sit amet,</span>{' '}
              <span className="block text-purple-600 xl:inline">consectetur adipiscing elit</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam est sit amet quam dignissim varius. Fusce sit amet quam nec
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-2 md:text-lg md:px-10"
                >
                  Connect Wallet
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
          />
        </div>
      </main>

      {/* S-TOKEN */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center justify-center item-center object-center">
            <img
              className="h-24 w-auto sm:h-48 mx-auto my-8"
              src="/section-media.png"
              alt=""
            />
            <h3 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              S-TOKEN
            </h3>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam est sit amet quam dignissim varius. Fusce sit amet quam nec.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  customer support
                </a>{' '}
                team.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-purple-600 uppercase">Deploy faster</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to deploy your app
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
            malesuada. Eleifend condimentum id viverra nulla.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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

