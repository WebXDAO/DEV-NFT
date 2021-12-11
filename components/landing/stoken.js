import React from 'react';
import { useEffect, useState } from 'react'


function SToken() {

    // Faq section data
    const faqs = [
        {
            question: 'Question 1',
            answer:
                'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
        },
        {
            question: 'Question 2',
            answer:
                'You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
        },
        // More questions...
    ]


    return (
        <>
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
                        
                        Want to support your favorite up-and-coming organizations?

Buy their DEV-NFT's with a seamless marketplace experience, to support your favorite projects! 
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}


export default SToken;