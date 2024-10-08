import React from 'react'

export default function Close(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width={800}
            // height={800}
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="white"
                d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94l-1.97-1.97Z"
            />
            <path
                fill="white"
                fillRule="evenodd"
                d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75 22.75 17.937 22.75 12 17.937 1.25 12 1.25ZM2.75 12a9.25 9.25 0 1 1 18.5 0 9.25 9.25 0 0 1-18.5 0Z"
                clipRule="evenodd"
            />
        </svg>
    )
}
