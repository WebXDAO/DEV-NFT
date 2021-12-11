import React from 'react';
import { useEffect, useState } from 'react'
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
    LogoutIcon
  } from '@heroicons/react/outline';



function Features() {

    // Features section data
    const features = [
        { name: 'Push to Deploy', icon: CloudUploadIcon },
        { name: 'SSL Certificates', icon: LockClosedIcon },
        { name: 'Simple Queues', icon: RefreshIcon },
        { name: 'Advanced Security', icon: ShieldCheckIcon },
        // { name: 'Powerful API', icon: CogIcon },
        // { name: 'Database Backups', icon: ServerIcon },
        // More features...
    ]

    return (
        <>
            {/* Features */}
            <div className="relative bg-white py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="text-base font-semibold tracking-wider text-purple-600 uppercase">DEV-NFT</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Create and sell your NFTs
                    </p>
                    <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                        Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
                        malesuada. Eleifend condimentum id viverra nulla.
                    </p>
                    <div className="mt-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

        </>
    )
}


export default Features;