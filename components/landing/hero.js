import React from 'react';
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/router";
let Web3 = require('web3');


function Hero({ heroButton }) {

  const router = useRouter();
   

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
        router.push('/dashboard');


      }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }



    return (
        <>
            <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                        <span className="block xl:inline">The NFT Marketplace,</span>{' '}
                        <span className="block text-purple-600 xl:inline">for Open Source Repositories and Contributors</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam est sit amet quam dignissim varius. Fusce sit amet quam nec
                    </p>
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <Link href={heroButton == "Marketplace" ? "/dashboard" : "/"}>
                                <a
                                    onClick={connectToMetamask}
                                    href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-2 md:text-lg md:px-10"
                                >
                                    { heroButton }
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://img5.goodfon.com/wallpaper/nbig/c/77/iota-cryptocurrency-blockchain-valiuta-fon-logo.jpg"
                    alt=""
                />
            </div>

        </>
    )
}


export default Hero;