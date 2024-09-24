import React from 'react'

export default function Plus(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            viewBox="0 0 32 32"
            {...props}
            fill={props?.color ? props?.color : "white"}
        >
            <title>{"plus-circle"}</title>
            <path
                fill={props?.color ? props?.color : "white"}
                fillRule="evenodd"
                d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
            />
        </svg>
    )
}
