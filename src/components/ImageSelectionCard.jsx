import React from 'react';
import plus from '../assets/images/components/plus.png';
import DotSvg from '../svg/DotSvg';
import Plus from '../svg/Plus';

export default function ImageSelectionCard({ txt, dotimgclss, onImageChange, imagePreview, resetImage }) {
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center'>
            <div className='flex items-center'>
                <label htmlFor="image-upload" className='text-white'>{txt}</label>
                {dotimgclss && (
                    <DotSvg width={6} height={6} color={'red'} className='ml-2' />
                )}
            </div>
            <div>
                {imagePreview ? (
                    <div className='flex items-center'>
                        <img src={imagePreview} alt='Preview' className='h-[40px] w-[40px] mr-2' />
                        <button onClick={resetImage} className='text-white'>Change Image</button>
                    </div>
                ) : (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload"
                            onChange={onImageChange}
                        />
                        <label htmlFor="image-upload">
                            <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                            {/* <img src={plus} alt='plus' className='h-[12px] w-[12px] cursor-pointer' /> */}
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}
