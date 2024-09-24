import React from 'react'
import Header from './Header'

export default function LayoutHeader({ children }) {
    return (
        <div className='h-auto bg-black'>
            <Header />
            <div className='relative w-full text-[12px] pt-[100px] h-auto flex justify-center items-start bg-[black]'>
                {children}
            </div>
        </div>
    )
}
