import React from 'react';
import CrossArrow from '../../../svg/CrossArrow';
import Check from '../../../svg/Check';

export default function SelectSection({ txt, value, selected, onSelect }) {
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center gap-x-[16px]'>
                <span className='text-white'>{txt}</span>
            </div>
            <div onClick={onSelect}>
                {selected ? <Check className='h-[12px] w-[18px] cursor-pointer' />
                    : <CrossArrow className='cursor-pointer text-white' />}
            </div>
        </div>
    );
}
