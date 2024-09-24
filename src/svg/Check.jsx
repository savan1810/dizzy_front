import React from 'react'

export default function Check(props) {
    let { className } = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={className}
        >
            <path
                fill="#fff"
                d="M3.784 8c.25 0 .447-.089.586-.262L9.855.772C9.959.637 10 .534 10 .426 10 .169 9.791 0 9.472 0c-.232 0-.36.06-.5.239L3.762 6.937 1.056 4.082a.606.606 0 0 0-.499-.23c-.33 0-.557.183-.557.44 0 .108.058.23.168.342L3.18 7.73c.175.182.355.271.604.271Z"
            />
        </svg>
        // <svg
        //     xmlns="http://www.w3.org/2000/svg"

        //     fill="none"
        //     viewBox="0 0 24 24"
        //     {...props}
        // >
        //     <path
        //         stroke="#000"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth={2}
        //         d="M4 12.611 8.923 17.5 20 6.5"
        //     />
        // </svg>
    )
}
