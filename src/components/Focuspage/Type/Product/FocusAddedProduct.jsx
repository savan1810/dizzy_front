import React from 'react'
import { useDispatch } from 'react-redux';
import { maxLength, removeUploadsFromUrl } from '../../../DixeeInput2';
import More from '../../../../svg/More';


export default function FocusAddedProduct({ item, setLinkForBackend, setOverlayVisible, setItemForBackend, setPreviousUrl }) {
    const dispatch = useDispatch();

    return (
        <div className='w-[350px] sm:w-[390px] p-4 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img src={removeUploadsFromUrl(item?.image)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />
                <div className='flex flex-col items-start justify-start  h-full p-2'>
                    <p className='text-white ' style={{ fontSize: '12px' }}>{maxLength(item?.productName, 30)}</p>
                    <p className='text-[white]' style={{ fontSize: '12px' }}>
                        {maxLength(item?.description, 50)}
                    </p>
                    <p className='text-[white]' style={{ fontSize: '12px' }}>
                        {maxLength(item?.price, 50)}
                    </p>
                </div>
            </div>
            <More
                className='h-[25px] w-[25px] cursor-pointer ml-7 text-white'
                onClick={() => {
                    setItemForBackend(item)
                    setOverlayVisible(true)
                    setPreviousUrl(item?.links[0]?.url)
                }}
            />

        </div>
    )
}
