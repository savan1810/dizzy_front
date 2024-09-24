import React from 'react'

export default function Pause(props) {
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
                fill={props?.color}
                fillRule="evenodd"
                d="M10 5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5ZM8 5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5ZM22 5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V5Zm-2 0a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5Z"
                clipRule="evenodd"
            />
        </svg>
    )
}
