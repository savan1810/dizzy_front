import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DotSvg from '../../../svg/DotSvg';
import CrossArrow from '../../../svg/CrossArrow';
import { setWholeFocusMusic } from '../../../store/focuspage/focuspageSlice';

export default function MusicRedirectCard({ txt, link, dotimgclss, item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center'>
                <span className='text-white'>{txt}</span>
                {dotimgclss && (

                    <DotSvg width={6} height={6} color={'red'} className='ml-2' />

                )}
            </div>
            <button onClick={() => {
                dispatch(setWholeFocusMusic(item))
                navigate(link)
            }} >
                <CrossArrow className='h-[14px] w-[14px]  cursor-pointer' />
                {/* <img src={plus} alt='plus'  /> */}
            </button>
        </div>
    );
}
