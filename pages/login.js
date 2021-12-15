import { useRouter } from "next/router";
import {
    getSession,
    signIn,
    signOut,
    useSession
} from 'next-auth/client';
import Link from 'next/link';
import { checkProperties } from "@ethersproject/properties";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
let Web3 = require('web3');



function Login({ session }) {


    // const [Web3, web3, setWeb3] = useState([])
    const [address, setAddress] = useState([])
    const [isMeta, setMeta] = useState(false)
    const [web3, setWeb3] = useState([])

    const [heroButton, setHeroButton] = useState('Connect Wallet');



    useEffect(() => {

        // TODO: redirect user if already logged

        const checkConnection = async () => {

            // Check if browser is running Metamask
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            };

            // Check if User is already connected by retrieving the accounts
            web3.eth.getAccounts()
                .then(async (addr) => {

                    // Set User account into state
                    setAddress(addr);

                    if (addr.length > 0) {
                        setHeroButton("Dashboard")
                    }
                });
        };
        checkConnection();

    }, [])

    // Generate a random number
    // Math.random()-based solutions do not provide good uniqueness guarantees
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const [loginState, setLoginState] = useState()
    const router = useRouter();

    const login = async () => {
        setLoginState("Connecting to your wallet...")
        if (!window.ethereum) {
            setLoginState("No Metamask wallet... Please install it.");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddr = await signer.getAddress();

        // Set address state
        setAddress(walletAddr)

        // Set web3.js object
        let w3 = new Web3(ethereum)
        setWeb3(w3)

        // security: we need to fetch a backend to get a generated random uuid
        // const signatureNumbers = fetch(our_api_url:api_port/get_nonce)

        // clientside uglyhack :
        const signatureNumbers = uuidv4();

        // Here we can make custom signature at the login popup
        const signature = await signer.signMessage("Welcome to the DEV-NFT Marketplace - uuid: " + signatureNumbers);

        // Uncomment to check signature
        // console.log("signature", signature)

        // redirect to the dashboard after loggin
        router.push('/dashboard');
    }

    return (
        <>
            <div className="min-h-screen h-full flex">
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Or{' '}
                            <Link href="/">
                            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                            back to home
                            </a>
                            </Link>
                            </p>
                        </div>

                        {/* Sign-in button */}
                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 text-center">Sign in with</p>
                                    <p className="mb-4 text-center text-xs text-gray-700">{loginState}</p>

                                    <div className={"mt-1 grid " + (address.length > 0 ? "grid-cols-1" : "grid-cols-2") + " gap-2"}>

                                        {/* Github Login */}
                                        <div>
                                            <a
                                                // onClick={signIn(null, { callbackUrl: `${window.location.origin}` })}
                                                onClick={() => {
                                                    signIn({
                                                        callbackUrl: `${window.location.origin}`
                                                    })
                                                }}
                                                href="#"
                                                className="h-10 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with GitHub</span>
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </div>

                                        {/* Metamask Login */}
                                        {!address.length > 0 && <>
                                            <div>

                                                <a
                                                    onClick={login}
                                                    href="#"
                                                    className="h-10 w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Sign in with Metamask</span>
                                                    <img className="h-6 w-6" src="./metamask-fox.svg" />
                                                </a>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image right */}
                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/hero.png"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context) {

    // Get github login
    const session = await getSession(context)

    if (!session) return { props: { loggedIn: false } };

    if (session) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        }
    }



    // By returning { props: { reposList } }, the ReposList component
    // will receive `reposList` as a prop at build time
    return {
        props: {
            session
        },
    }
}

export default Login;
