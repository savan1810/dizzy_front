import React from 'react';
import { useNavigate } from 'react-router-dom';
import Plus from '../../../../svg/Plus';
import { maxLength } from '../../../DixeeInput2';
import { useSelector } from 'react-redux';

export default function FocusMusicCard({ item }) {
    const music = useSelector((state) => state.focuspage.music);
    const navigate = useNavigate();
    const handleClick = () => {
        if (music?.type === 'single') {
            navigate('/focus-page/music-type/step7', { state: { musicItem: item } });
        } else {
            navigate('/focus-page/music-type/step9', { state: { musicItem: item } });
        }
    };

    return (
        <div className='w-[350px] sm:w-[390px] p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img
                    src={item?.avatar}
                    alt='alt'
                    className='object-cover h-[50px] w-[50px] rounded-[3px]'
                />
                <div className='flex flex-col items-start justify-start h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>
                        {maxLength(item?.title?.toString(), 30)}
                    </p>
                    <p className='text-[#696974]' style={{ fontSize: '12px' }}>
                        {maxLength(item?.artists[0]?.name.toString(), 30)}
                    </p>
                </div>
            </div>
            <button onClick={handleClick}>
                <Plus className='h-[12px] w-[12px] cursor-pointer' />
            </button>
        </div>
    );
}
