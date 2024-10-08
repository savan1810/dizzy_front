import React from 'react'

export default function Spotify(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={15}
            height={15}
            fill="none"
            {...props}
        >
            <path
                fill={props?.color ? props?.color : "#fff"}
                d="M7.477 0a7.477 7.477 0 1 0 0 14.953A7.477 7.477 0 0 0 7.477 0Zm3.429 10.784a.466.466 0 0 1-.641.154c-1.756-1.072-3.966-1.315-6.568-.72a.466.466 0 0 1-.208-.91c2.849-.65 5.292-.37 7.262.835.22.135.29.421.155.64Zm.915-2.036a.583.583 0 0 1-.802.192c-2.01-1.235-5.073-1.593-7.45-.872a.584.584 0 0 1-.34-1.115c2.716-.824 6.092-.425 8.4.993.274.17.36.528.192.802Zm.079-2.12c-2.41-1.432-6.386-1.563-8.687-.865a.7.7 0 1 1-.406-1.338c2.641-.802 7.032-.647 9.806 1a.699.699 0 1 1-.713 1.203Z"
            />
        </svg>
    )
}
