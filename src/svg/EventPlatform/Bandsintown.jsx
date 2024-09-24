import React from 'react'

export default function Bandsintown(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={15}
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="#fff"
                    d="M11.74 0H15v7.5h-3.26V0ZM7.825 3.125h3.26V7.5h-3.26V3.125Zm-3.913 0h3.26V7.5h-3.26V3.125ZM15 15H0V0h3.26v11.875h8.48v-.625H3.911V8.125H15V15Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h15v15H0z" />
                </clipPath>
            </defs>
        </svg>
    )

}
