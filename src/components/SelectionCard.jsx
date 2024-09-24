import React from 'react';
import Plus from '../svg/Plus.jsx';
import { Link } from 'react-router-dom';
import DotSvg from '../svg/DotSvg';

export default function SelectionCard({ txt, link, dotimgclss }) {
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center'>
                <span className='text-white'>{txt}</span>
                {dotimgclss && (

                    <DotSvg width={6} height={6} color={'red'} className='ml-2' />

                )}
            </div>
            <Link to={link}>
                <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                {/* <img src={plus} alt='plus'  /> */}
            </Link>
        </div>
    );
}
