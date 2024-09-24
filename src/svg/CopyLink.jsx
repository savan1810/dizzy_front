import React from 'react'

export default function CopyLink(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={800}
            height={800}
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                stroke="white"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M15.197 3.355c1.673-1.68 4.25-1.816 5.757-.305 1.506 1.512 1.37 4.1-.303 5.78l-2.424 2.433M10.047 14c-1.507-1.512-1.37-4.1.302-5.779L12.5 6.062"
            />
            <path
                stroke="white"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305-1.506-1.512-1.37-4.1.303-5.78l2.424-2.433"
            />
        </svg>
    )
}
