import React from 'react'

export default function DotSvg(props) {
    let { width, height, color, className } = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill={color}
            viewBox="0 0 16 16"
            className={className}
        >
            <circle cx={8} cy={8} r={6} fill={color} />
        </svg>
    )
}
