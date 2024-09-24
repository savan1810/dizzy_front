import React from 'react';

export default function ImageCard({ txt, dotimgclss, onImageChange, imagePreview, resetImage }) {
    return (
        <div className='flex w-full justify-between items-center'>
            <>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    onChange={onImageChange}
                />

            </>
            <div className='flex items-center cursor-pointer' onClick={onImageChange}>
                <label htmlFor="image-upload" className='text-white cursor-pointer'>{txt}</label>
            </div>
            <div>
                {imagePreview && (
                    <div className='flex items-center text-right'>
                        <img src={imagePreview} alt='Preview' className='h-[40px] w-[40px] ' />
                        {/* <p onClick={resetImage} className='text-white opacity-0'>Change Images</p> */}
                    </div>

                )}
            </div>

        </div>
    );
}
