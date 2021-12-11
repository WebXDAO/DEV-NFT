import * as React from "react";
import { Fragment, useState, useEffect } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'

function SvgPreview({ props, githubUsername, selectedRepos, description, setSharedState, sharedState }) {

    // Uncomment to debug :
    // console.log("svgCards username =>", githubUsername)
    // console.log("svgCards repos =>", selectedRepos)
    // console.log("svgCards description =>", description)
    // console.log("svgCards sharedState =>", sharedState)

    // infura gateway
    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

    /**
     * Get the SVG from the modal
     * @returns svgElement
     */
    const getSvgPreview = () => {
      let svgElement = document.getElementById('svg_element');
      
      if (svgElement) {
        return svgElement;
      } else {
        console.warning('svg_element not selectable');
      }
    }


    /**
     * Create a blob object
     * @returns Blob object
     */
    const createBlob = () => {
      let svgElement = getSvgPreview();
      
      if (svgElement) {
        let clonedSvgElement = svgElement.cloneNode(true);
        let outerHTML = clonedSvgElement.outerHTML;
        let blob = new Blob([outerHTML], {
          type: 'image/svg+xml;charset=utf-8'
        });

         // Uncomment to debug
        //  console.log("Blob object =>", blob)

         if (blob) {
           return blob;
         } else {
           console.warning('no blob available')
         }
      }
    }

    /**
     * Create a blobURL
     * @param {*} blob 
     * @returns blobURL
     */
    function createBlobUrl(blob) {
      
      // Make blob url
      let URL = window.URL || window.webkitURL || window;
      let blobURL = URL.createObjectURL(blob);

      if (blobURL) {
        return blobURL
      }
    }

    /**
     * Upload a blob object
     * @param {*} blob 
     */
    async function uploadToIpfs(blob) {

      // We send a blob object instead of fileobject
      if (blob) {
        try {
          const added = await client.add(
            blob,
            {
              progress: (prog) => console.log(`received: ${prog}`)
            }
          )
    
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log("[IPFS URL] => ", url)

          // Share the state to the reposList component :
          setSharedState(url)
          
        } catch (error) {
          console.log('Error uploading file to ipfs: ', error)
        }
      }
    }


    useEffect(() => {

        // sharedState = DOMelement?

        // Load the svg preview into ipfs at the openning
        // Maybe we should do it after the creation.
        var blob = createBlob();
        if (blob) {
          uploadToIpfs(blob);
        }

    }, []);

    
    const time = Date.now();
    return (
        <>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width={330}
            height={330}
            xmlSpace="preserve"
            id="svg_element"
            {...props}
          >
            <rect
              style={{
                stroke: "none",
                strokeWidth: 1,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "#010000",
                fillRule: "nonzero",
                opacity: 1,
              }}
              vectorEffect="non-scaling-stroke"
              x={-150}
              y={-150}
              rx={10}
              ry={10}
              width={330}
              height={330}
              transform="translate(150 150)"
            />
            <g>
              <text
                xmlSpace="preserve"
                fontFamily="Prompt"
                fontSize={16}
                fontWeight={700}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "#58a6ff",
                  fillRule: "nonzero",
                  opacity: 1,
                  whiteSpace: "pre",
                }}
                transform="translate(104.62 150)"
              >
                <tspan
                  x={-70.62}
                  y={5.03}
                  style={{
                    whiteSpace: "pre",
                  }}
                >
                  {githubUsername}
                </tspan>
              </text>
            </g>
            <g>
              <text
                xmlSpace="preserve"
                fontFamily="Lato"
                fontSize={12}
                fontWeight={400}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "#58a6ff",
                  fillRule: "nonzero",
                  opacity: 1,
                  whiteSpace: "pre",
                }}
                transform="translate(150 195.68)"
              >
                <tspan x={-111.62} y={3.77}>
                  {description}
                </tspan>
              </text>
            </g>
            <g>
              <path
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "#efe4e4",
                  fillRule: "evenodd",
                  opacity: 1,
                }}
                vectorEffect="non-scaling-stroke"
                transform="matrix(1.78 0 0 1.78 128.64 63.495)"
                d="M3 2.75A2.75 2.75 0 0 1 5.75 0h14.5a.75.75 0 0 1 .75.75v20.5a.75.75 0 0 1-.75.75h-6a.75.75 0 1 1 0-1.5h5.25v-4H6A1.5 1.5 0 0 0 4.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 0 1-.6 1.374A3.25 3.25 0 0 1 3 18.75v-16zM19.5 1.5V15H6c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H19.5z"
              />
              <path
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "#efe4e4",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                vectorEffect="non-scaling-stroke"
                transform="matrix(1.78 0 0 1.78 128.64 63.495)"
                d="M7 18.25a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v5.01a.25.25 0 0 1-.397.201l-2.206-1.604a.25.25 0 0 0-.294 0L7.397 23.46a.25.25 0 0 1-.397-.2v-5.01z"
              />
            </g>
            <g>
              <text
                xmlSpace="preserve"
                fontFamily="Lato"
                fontSize={31}
                fontWeight={700}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeDashoffset: 0,
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 4,
                  fill: "#e85a0d",
                  fillRule: "nonzero",
                  opacity: 1,
                  whiteSpace: "pre",
                }}
                transform="matrix(.44 0 0 .44 255.8 13.61)"
              >
                <tspan x={-88.02} y={9.74}>
                  {time}
                </tspan>
              </text>
            </g>
          </svg>
        </>
    )

};

export default SvgPreview;