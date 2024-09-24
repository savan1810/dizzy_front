import React from 'react'

export default function Play(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={11}
            fill="none"
            {...props}
        >
            <path
                fill={props.color || "#fff"}
                d="m1.322 10.18 8.239-4.199a.836.836 0 0 0 .322-.285.708.708 0 0 0 .117-.388c0-.136-.04-.27-.117-.388a.84.84 0 0 0-.322-.284L1.322.436A.976.976 0 0 0 .443.435.844.844 0 0 0 .12.718a.713.713 0 0 0-.12.387v8.399c0 .136.04.27.117.39a.84.84 0 0 0 .322.286.972.972 0 0 0 .442.104.973.973 0 0 0 .441-.104Z"
            />
        </svg>
    )
}
