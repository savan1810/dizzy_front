import React from 'react'
import LayoutHeader from '../../../../layout/LayoutHeader'
import { MANUAL_MUSIC_PLATFORMS, SOCIAL_PLATFORMS_FOR_FEED, VIDEO_PLATFORMS } from '../../../../constants/constants'
import { useNavigate } from 'react-router';
import VideoPlatform from '../../../../components/AddSection/Video/VideoPlatform';

export default function SelectVideoPlatform() {
    const navigate = useNavigate();
    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a platform</p>
                    <p onClick={() => navigate('/add-section')} className='text-white cursor-pointer'>Go back</p>
                </div>
                {
                    VIDEO_PLATFORMS.map((item, index) => (
                        <VideoPlatform
                            txt={item.label}
                            key={index}
                            value={item.value}
                        />
                    ))
                }
            </div>
        </LayoutHeader>
    )
}
