import * as React from "react";

function SvgPreview({ props, githubUsername, selectedRepos, description }) {

    // Uncomment to debug :
    console.log("svgCards username =>", githubUsername)
    console.log("svgCards repos =>", selectedRepos)

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={1200}
                height={900}
                xmlSpace="preserve"
                {...props}
            >
                <rect width="100%" height="100%" fill="transparent" />
                <rect
                    style={{
                        stroke: "none",
                        strokeWidth: 1,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeDashoffset: 0,
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 4,
                        fill: "#0c0c0c",
                        fillRule: "nonzero",
                        opacity: 1,
                    }}
                    vectorEffect="non-scaling-stroke"
                    x={-600}
                    y={-450}
                    rx={25}
                    ry={25}
                    width={1200}
                    height={900}
                    transform="translate(600 450)"
                />
                <g>
                    <text
                        xmlSpace="preserve"
                        fontFamily="Prompt"
                        fontSize={57}
                        fontWeight={300}
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
                        transform="translate(354.03 552.57)"
                    >
                        <tspan x={-233.64} y={17.91}>
                            {githubUsername}
                        </tspan>
                        <tspan x={-233.64} y={17.91}>
                            {selectedRepos}
                        </tspan>
                    </text>
                </g>
                <g>
                    <text
                        xmlSpace="preserve"
                        fontFamily="Prompt"
                        fontSize={57}
                        fontWeight={300}
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
                        transform="translate(780.76 552.57)"
                    >
                        <tspan x={-149.88} y={17.91}>
                            {selectedRepos}
                        </tspan>
                    </text>
                </g>
                <g>
                    <text
                        xmlSpace="preserve"
                        fontFamily="Prompt"
                        fontSize={57}
                        fontWeight={300}
                        style={{
                            stroke: "none",
                            strokeWidth: 1,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeDashoffset: 0,
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 4,
                            fill: "#8b949e",
                            fillRule: "nonzero",
                            opacity: 1,
                            whiteSpace: "pre",
                        }}
                        transform="translate(600 555.83)"
                    >
                        <tspan x={-13.28} y={17.91}>
                            {"/"}
                        </tspan>
                    </text>
                </g>
                <g>
                    <text
                        xmlSpace="preserve"
                        fontFamily="Lato"
                        fontSize={28}
                        fontWeight={400}
                        style={{
                            stroke: "none",
                            strokeWidth: 1,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeDashoffset: 0,
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 4,
                            fill: "#8b949e",
                            fillRule: "nonzero",
                            opacity: 1,
                            whiteSpace: "pre",
                        }}
                        transform="translate(600 693.77)"
                    >
                        <tspan x={-501.77} y={-14.93}>
                            {
                                description
                            }
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
                            fill: "#ebe2e2",
                            fillRule: "evenodd",
                            opacity: 1,
                        }}
                        vectorEffect="non-scaling-stroke"
                        transform="matrix(12.98 0 0 12.82 444.24 136.265)"
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
                            fill: "#ebe2e2",
                            fillRule: "nonzero",
                            opacity: 1,
                        }}
                        vectorEffect="non-scaling-stroke"
                        transform="matrix(12.98 0 0 12.82 444.24 136.265)"
                        d="M7 18.25a.25.25 0 0 1 .25-.25h5a.25.25 0 0 1 .25.25v5.01a.25.25 0 0 1-.397.201l-2.206-1.604a.25.25 0 0 0-.294 0L7.397 23.46a.25.25 0 0 1-.397-.2v-5.01z"
                    />
                </g>
            </svg>
        </>
    )

};

export default SvgPreview;