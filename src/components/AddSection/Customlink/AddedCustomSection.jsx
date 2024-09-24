import React from 'react';
import more from '../../../assets/images/components/More.png';
import Check from '../../../svg/Check';

export default function AddedCustomSection({ item, isSelected, onSelect, setOverlayVisible, setItemForBackend, setPreviousUrl }) {
    return (
        <div className='w-[350px] sm:w-[390px] p-4 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <div className='flex items-center justify-center gap-x-2 h-full py-2'>
                    <p onClick={onSelect} className='text-white cursor-pointer' style={{ fontSize: '12px' }}>
                        {item?.title}
                    </p>
                    {isSelected && <Check className='h-[12px] w-[18px] cursor-pointer' />}
                </div>
            </div>
            <img
                src={more}
                onClick={() => {
                    setItemForBackend(item);
                    setOverlayVisible(true);
                    setPreviousUrl(item?.title);
                }}
                alt='sp'
                className='h-[3px] w-[12px] ml-7 cursor-pointer'
            />
        </div>
    );
}
