import React from 'react'
import { Link } from 'react-router-dom'
import Check from '../../../svg/Check'

export default function MusicPlatform({ txt, link, selected, onSelect }) {
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center cursor-pointer' onClick={onSelect}>
            <div className='flex items-center'>
                <span className='text-white'>{txt}</span>
            </div>
            {selected && (
                <Link>
                    <Check className='h-[12px] w-[18px] cursor-pointer' />
                </Link>
            )}
        </div>
    )
}
