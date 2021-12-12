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
                'The DevNFT app enable users to create NFTs of a repository via GitHub OAuth and cryptographically sign the repos with their Ethereum wallet. Then, the app creates ("mints") an NFT representation of the commit on the Polygon/Matic blockchain. ',
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