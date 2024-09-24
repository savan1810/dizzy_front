import React from 'react'

export default function More(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={props.color ? props.color : 'white'}
            {...props}
        >
            <title />
            <path d="M8 12a2 2 0 1 1-2-2 2 2 0 0 1 2 2Zm10-2a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm-6 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z" />
        </svg>
    )
}
