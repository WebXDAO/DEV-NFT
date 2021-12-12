import React from 'react';
import { useEffect, useState } from 'react'


function Faq() {

    // Faq section data
    const faqs = [
        {
            question: 'What are NFTs?',
            answer:
                'NFTs (non-fungible tokens) are blockchain-based records that uniquely represent pieces of digital media (say, a digital art piece, a tweet, or a repository 👀). In more practical terms, an NFT can be seen as a digital autograph created by the author of the piece of media the NFT represents. By signing it, the author is guaranteeing its authenticity. ',
        },
        {
            question: 'What\'s DevNFT?',
            answer:
                'The DevNFT app enable users to create NFTs of a repository via GitHub OAuth and cryptographically sign the repos with their MetaMask wallet. Then, the app creates ("mints") an NFT representation of their Repo on the Polygon/Matic blockchain.⛓️',
        },
        {
            question: 'Why would I want to buy a DevNFT?',
            answer:
                'Who knows a project becomes next linux kernel or CURL and you like to be a part of it, Owning a DevNFT you can.\nAnd by buying a DevNFT you can support the project in which you truly believe in.✅️ ',
        },
        {
            question: 'How to buy a DevNFT?',
            answer:
                'Connect your wallet, Sign in with your GitHub account then Select the Repository chose a price & Mint on Polygon. See super easy!😍️',
        },
        {
            question: 'If I buy DevNFT, will I become the owner of Repo?',
            answer:
                'DevNFT is a type of autograph by the developer or repo owner which is sold to make you feel possession or part of the project. Generally, this does not transfer ownership. But, If a developer wants, they can sell their work through the DevNFT. 🎨️',
        },
        {
            question: 'What if a person forks a repo and creates an NFT?',
            answer:
                'Malpractices of copying the others work is years old, but with DevNFT you get all repo information. A person can always visit the repo and verify',
        },
        // More questions...
    ]


    return (
        <>
            {/* FAQ */}
            <div className="bg-white mx-auto px-10">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
                            <p className="mt-4 text-lg text-gray-500">
                                Can’t find the answer you’re looking for? Open an issue to our{' '}
                                <a href="https://github.com/web3community/DEV-NFT" className="font-medium text-purple-600 hover:text-purple-500">
                                    GitHub
                                </a>{' '}
                                repository.
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

        </>
    )
}


export default Faq;
