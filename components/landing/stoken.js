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
                        <h3 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            About Us
                        </h3>
                        <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500">
                        We are a bunch of 6 people 
                        who met on the internet a few days back and became part of a community. 
                        We all are passionate about opensource. 
                        Thus, created DevNFT to incentivize the opensource.
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}


export default SToken;