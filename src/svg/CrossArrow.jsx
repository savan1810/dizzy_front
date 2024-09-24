import React from 'react'

export default function CrossArrow(props) {
    return (
        <svg
            height={16}
            width={16}
            fill={props?.color ? props?.color : 'white'}
            viewBox="0 0 24 24"
            className={props.className}
        >
            <path
                stroke={props?.color ? props?.color : 'white'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17 17 7m0 0H8m9 0v9"
            />
        </svg>
    )
}
