/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function NavNetworkSwitcher( ) {

    const networks = [
        {name:'Polygon', link:'', scanner: ''},
    ];

    const [currentNetwork, setCurrentNetwork] = useState(networks[0]);
    
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-devnft">
          <Image height={25} width={25} src="/polygon-network.png" aria-hidden="true" />
          <span className="mx-2 font-medium">

          { currentNetwork.name }
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            {/* {networks.length > 0 &&
              networks.map((item, i) => (
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
              ))} */}

            <Menu.Item>
              {({ active }) => (
                  <>
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Polygon
                </a>
                </>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Ethereum
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
