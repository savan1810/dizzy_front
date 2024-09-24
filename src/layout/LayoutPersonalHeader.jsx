import React from 'react'
import PersonalHeader from './PersonalHeader'

export default function LayoutPersonalHeader({ children }) {
    return (
        <div className='h-auto bg-black'>
            <PersonalHeader />
            <div className='relative w-full text-[12px] pt-[100px] h-auto flex justify-center items-start bg-[black]'>
                {children}
            </div>
        </div>
    )
}
