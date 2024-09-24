import React from 'react'
import more from '../../../assets/images/components/More.png';
import { maxLength, removeUploadsFromUrl } from '../../DixeeInput2';
import More from '../../../svg/More';


export default function AddedVideoCard({ video, setAvatarForBackend, setOverlayVisible }) {


    return (
        <div className='w-[350px] sm:w-[390px] p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                {
                    video?.type === 1 ? (
                        <video src={video?.avatar} alt='Preview' className='object-cover h-[50px]  w-[50px] rounded-[3px] ' muted controls={false} />

                    ) : (
                        <img src={removeUploadsFromUrl(video?.avatar)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />

                    )
                }
                <div className='flex flex-col items-start justify-start  h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(video?.title, 25)}</p>
                </div>
            </div>
            <More className='h-[20px] w-[20px] cursor-pointer ml-7 ' onClick={() => {
                setOverlayVisible(true)
                setAvatarForBackend(video?.avatar)
            }} />
            {/* <img src={more}
                alt='sp' className='h-[3px] w-[12px] ml-7 cursor-pointer'
            /> */}
        </div>
    )
}
