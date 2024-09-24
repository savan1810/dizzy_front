import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFocusNewsletter, setFocusProduct } from '../../../../store/focuspage/focuspageSlice';
import CrossArrow from '../../../../svg/CrossArrow';
import DotSvg from '../../../../svg/DotSvg';

export default function RedirectForNews({ txt, link, type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center'>
                <span className='text-white'>{txt}</span>

            </div>
            <button onClick={() => {
                navigate(link)
                dispatch(setFocusNewsletter({ type: type }));
            }} >
                <CrossArrow className='h-[14px] w-[14px]  cursor-pointer' />
                {/* <img src={plus} alt='plus'  /> */}
            </button>
        </div>
    );
}
