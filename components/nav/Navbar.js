import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { LogoutIcon, SearchIcon, UserIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import NavMenuList from "./NavMenuList";
import NavNetworkSwitcher from "./NavNetworkSwitcher";
import { ethers } from "ethers";
import Link from "next/link";
let Web3 = require('web3');
import {
  getSession,
  signIn,
  signOut,
  useSession
} from 'next-auth/client';
import { useRouter } from "next/router";
import { getEllipsisTxt } from "../../helpers/formatters";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MarketplaceMenuItems = [
  { name: "Home", link: "/" },
  { name: "Discover", link: "/" },
  { name: "Top Collections", link: "/" },
  { name: "Top Auctions", link: "/" },
  { name: "Get Started", link: "/" },
];

const ResourcesMenuItems = [
  { name: "Docs", link: "/" },
  { name: "Features", link: "/" },
  { name: "Contact Us", link: "/" },
];

const CommunityMenuItems = [
  { name: "About us", link: "/" },
  { name: "Join WebXDAO", link: "/" },
  { name: "Our Socials", link: "/" },
  { name: "Team", link: "/" },
];

const mobileMenuItems = [
  { name: "Home", link: "/" },
  { name: "Discover", link: "/" },
  { name: "Top Collections", link: "/" },
  { name: "Top Auctions", link: "/" },
  { name: "Get Started", link: "/" },
];

const Navbar = ({ session }) => {
  console.log(session);
  const router = useRouter();
  const [address, setAddress] = useState([])
  const goToLogin = () => {
    router.push("/login")
  }

  // TODO: replace by redux-toolkit
  useEffect(() => {
    const checkConnection = async () => {

      // Check if browser is running Metamask
      let web3 = null;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      }

      // Check if User is already connected by retrieving the accounts
      if (web3 === null) {
        setHeroButton("Please Install Metamask Wallet");
      }
      if (web3) {
        web3.eth.getAccounts().then(async (addr) => {
          // Set User account into state
          setAddress(addr);

          if (addr.length > 0) {
            console.log("Current Metamask wallet: ", addr);
          }
        });
      }
    };
    checkConnection();
  }, []);

  return (
    // mb-10 to test shadow - bg-gray-800
    <Disclosure
      as="nav"
      className=" bg-white shadow-md fixed top-0 z-50 w-full"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo */}
              <div className="cursor-pointer flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <img
                      className="block lg:hidden h-5 w-auto"
                      src="/DevNFT.png"
                      alt="DevNFT"
                      />
                  </Link>
                  <Link href="/">
                    <img
                      className="hidden lg:block h-5 w-auto"
                      src="/DevNFT.png"
                      alt="DevNFT"
                    />
                  </Link>
                </div>

                {/* Menu desktop */}
                <div className="hidden lg:block lg:ml-6">
                  <div className="flex space-x-4">
                    <NavMenuList
                      title="Marketplace"
                      menuItems={MarketplaceMenuItems}
                    ></NavMenuList>
                    <NavMenuList
                      title="Resources"
                      menuItems={ResourcesMenuItems}
                    ></NavMenuList>
                    <NavMenuList
                      title="Community"
                      menuItems={CommunityMenuItems}
                    ></NavMenuList>
                  </div>
                </div>
              </div>

              {/* Search zone  */}
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
                <div className="max-w-lg w-full lg:max-w-md">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-gray-300 focus:ring-gray-300 focus:text-gray-900 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-purple-700  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-devnft">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden lg:block lg:ml-4">
                <div className="flex items-center">
                  {/* Network switcher */}
                  <NavNetworkSwitcher></NavNetworkSwitcher>

                  {/* Language switcher */}

                  {/* Curency switcher */}

                  {/* Theme switcher button */}
                  <button
                    type="button"
                    className="rounded-full flex-shrink-0 bg-white p-1 mx-6 before:rounded-full text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft"
                  >
                    <span className="sr-only">Theme Switcher</span>
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Web3 Wallet authentification */}

                  {/* ------ Display if not connected ------ */}
                  {!session && (
                    <>
                      <button
                        type="button"
                        className="truncate inline-flex items-center px-6 py-2.5 text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-devnft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft"
                        onClick={goToLogin}
                      >
                        Connect Github
                      </button>
                    </>
                  )}

                  {address.length == 0 && (
                    <>
                      <button
                        type="button"
                        className="truncate inline-flex items-center px-6 py-2.5 text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-devnft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft"
                        onClick={goToLogin}
                      >
                        Connect Wallet
                      </button>
                    </>
                  )}

                  {/* ------ Display if connected ------ */}
                  {address.length > 0 && (
                    <>
                      &nbsp; 🦊 &nbsp;
                      <span className="px-1 text-sm text-black font-bold">
                    {getEllipsisTxt(address[0], 6)}
                  </span>
                    </>
                  )}

                  
                  {/* Profile dropdown + Web3 wallet authentification | todo: make component */}
                  {session && (

                    <Menu as="div" className="mx-2 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="rounded-full flex text-sm bg-white text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-devnft">
                          <div
                            type="button"
                            className="rounded-full flex-shrink-0 bg-white p-1  before:rounded-full text-gray-400 hover:text-gray-200 "
                          >
                            <span className="sr-only">View notifications</span>
                            <span className="ml-1 whitespace-nowrap inline-flex items-center justify-center px-2 py-2 text-sm font-medium text-black">
                          <b>{session.name}</b>
                          <img
                            className="w-6 h-6 rounded-full mx-auto ml-2"
                            src={session.picture}
                            alt={session.name}
                          />
                        </span>
                          </div>
                        </Menu.Button>
                      </div>

                    {/* DropdownMenu */}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={`/collections/${address}`}> 
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Collection
                            </a>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => signOut()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Mobile */}
          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              {mobileMenuItems.map((item, index) => (
                <Disclosure.Button
                  key={index}
                  as="a"
                  href={item.href}
                  className="bg-gray-100 hover:bg-gradient-to-r  hover:text-white hover:from-rose-400 hover:via-fuchsia-500 hover:to-indigo-500  text-gray-500 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
