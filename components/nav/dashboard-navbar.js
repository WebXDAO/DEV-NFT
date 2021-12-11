import { useEffect, useState } from 'react'
import {
    getSession,
    signIn,
    signOut,
    useSession
} from 'next-auth/client';
import Link from 'next/link';
import { BellIcon, MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline'
import { Disclosure, Menu, Transition } from '@headlessui/react'
let Web3 = require('web3');
import { withRouter } from 'next/router'


function Navbar({  router, headerName }) {

    const navigation = [
        { name: 'Home', href: '/dashboard' },
        { name: 'Generate and Sell', href: '/dashboard/create-nft' },
        { name: 'My NFTs', href: '/dashboard/my-nfts' },
        { name: 'My Creations', href: '/dashboard/my-creations' }
    ]
    const userNavigation = [
        { name: 'Sign out', href: '#' },
    ]

    const initSession = useSession();
    const session = initSession[0];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [address, setAddress] = useState([])
    const [web3, setWeb3] = useState([])

    function connectToMetamask() {
        window.ethereum ?
            ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
                setAddress(accounts[0])

                let w3 = new Web3(ethereum)
                setWeb3(w3)

                // console.log("Account", accounts)
                // console.log("Web3", web3)
                // console.log(address)

                setHeroButton("Marketplace")

            }).catch((err) => console.log(err))
            : console.log("Please install MetaMask")
    }

    useEffect(() => {
        const checkConnection = async () => {

            // Check if browser is running Metamask
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            };

            if (web3) {
                // Check if User is already connected by retrieving the accounts
                web3.eth.getAccounts()
                .then(async (addr) => {

                    // Set User account into state
                    setAddress(addr);

                    if (addr.length > 0) {
                        // Code here
                        console.log("Current metamask wallet: ", addr)
                    }
                });
            }
            
        };

        checkConnection();
    }, [])


    return (
        <>
            <Disclosure as="nav" className="bg-purple-600">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 cursor-pointer">
                                        <Link href="/">
                                            <img
                                                className="h-16 w-16"
                                                src="/DevNFT.svg"
                                                alt="Workflow"
                                            />
                                        </Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                >
                                                    <a
                                                        className={classNames(
                                                            router.asPath == item.href
                                                                ? 'bg-purple-700 text-white'
                                                                : 'text-white hover:bg-purple-500 hover:bg-opacity-75',
                                                            'px-3 py-2 rounded-md text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <div className="max-w-xs bg-purple-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>

                                                    {session && <>
                                                        <img className="h-8 w-8 rounded-full" src={session.picture} alt="" />
                                                        <div className="text-base font-medium text-white mx-4">{session.name}</div>
                                                    </>}
                                                    {!session && <>
                                                        <a
                                                            onClick={() => signIn()}
                                                            href="#"
                                                            className="flex items-center justify-center px-4 py-2 text-xs rounded-md text-white bg-purple-800 hover:bg-purple-700 md:py-2 md:text-sm md:px-10"
                                                        >
                                                            Login to Github
                                                        </a>
                                                    </>}
                                                </div>

                                            </div>

                                        </Menu>

                                        {/* Logout button */}
                                        {session && <>
                                            <button
                                                type="button"
                                                className="p-1 bg-purple-600 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white"
                                            >
                                                {/* <LogoutIcon onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} className="h-6 w-6" aria-hidden="true" /> */}
                                                <LogoutIcon onClick={() => signOut()} className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </>}
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-purple-600 inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu */}
                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-purple-700 text-white'
                                                : 'text-white hover:bg-purple-500 hover:bg-opacity-75',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="flex pt-4 pb-3 border-t border-purple-700 justify-between">
                                {session && <>
                                    <div className="flex">
                                        <img className="h-8 w-8 mx-2 rounded-full" src={session.picture} alt="" />
                                        <div className="text-base font-medium text-white">{session.name}</div>
                                    </div>
                                </>}
                                {!session && <>
                                    <a
                                        onClick={() => signIn()}
                                        href="#"
                                        className="flex items-center justify-center px-4 py-2 text-xs rounded-md text-white bg-purple-800 hover:bg-purple-700 md:py-2 md:text-sm md:px-10"
                                    >
                                        Login to Github
                                    </a>
                                </>}
                                {/* Logout button */}
                                {session && <>
                                    <button
                                        type="button"
                                        className="p-1 bg-purple-600 rounded-full text-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white"
                                    >
                                        {/* <LogoutIcon onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} className="h-6 w-6" aria-hidden="true" /> */}
                                        <LogoutIcon onClick={() => signOut()} className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </>}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between">
                    <h1 className="flex items-center justify-center text-lg leading-6 font-semibold text-gray-900">{headerName}</h1>
                    {address.length > 0 && <>
                        <span className="text-sm leading-7 font-semibold text-gray-900">
                            Metamask wallet: {address}
                        </span>
                    </>}
                    {!address.length > 0 && <>
                        <a
                            onClick={connectToMetamask}
                            href="#"
                            className="flex items-center justify-center px-4 py-2 text-xs rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-2 md:text-sm md:px-10"
                        >
                            Connect wallet
                        </a>
                    </>}
                </div>
            </header>
        </>
    )
}

export default withRouter(Navbar);