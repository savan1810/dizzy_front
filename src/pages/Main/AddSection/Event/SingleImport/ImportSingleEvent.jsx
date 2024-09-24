import React from 'react'
import LayoutHeader from '../../../../../layout/LayoutHeader'
import { EVENT_PLATFORMS, MANUAL_MUSIC_PLATFORMS } from '../../../../../constants/constants'
import { useNavigate } from 'react-router';
import ManualMusicCard from '../../../../../components/AddSection/Music/ManualMusicCard';
import SignleEventLink from '../../../../../components/AddSection/Event/SignleEventLink';

export default function ImportSingleEvent() {
    const navigate = useNavigate();
    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a platform</p>
                    <p onClick={() => navigate('/add-section/add-event')} className='text-white cursor-pointer'>Go back</p>
                </div>
                {
                    EVENT_PLATFORMS.map((item, index) => (
                        <SignleEventLink
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
