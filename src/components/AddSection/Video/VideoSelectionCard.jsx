import React from 'react';
import plus from '../../../assets/images/components/plus.png';
import DotSvg from '../../../svg/DotSvg';
import Plus from '../../../svg/Plus';

export default function VideoSelectionCard({ txt, dotimgclss, onVideoChange, videoPreview, resetVideo }) {
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center'>
                <label htmlFor="video-upload" className='text-white'>{txt}</label>
                {dotimgclss && (
                    <DotSvg width={6} height={6} color={'red'} className='ml-2' />
                )}
            </div>
            <div>
                {videoPreview ? (
                    <div className='flex items-center'>
                        <video src={videoPreview} alt='Preview' className='h-[40px] w-[40px] mr-2' controls />
                        <button onClick={resetVideo} className='text-white'>Change Video</button>
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="video/*"
                            style={{ display: 'none' }}
                            id="video-upload"
                            onChange={onVideoChange}
                        />
                        <label htmlFor="video-upload">
                            <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                            {/* <img src={plus} alt='plus' className='h-[12px] w-[12px] cursor-pointer' /> */}
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}
