import React from 'react'
import { useDispatch } from 'react-redux';
import { maxLength } from '../../../DixeeInput2';
import More from '../../../../svg/More';
import { updatePreviousUrl } from '../../../../store/focuseventdata/focuseventdataSlice';


export default function FocusAddedEvent({ item, setLinkForBackend, setOverlayVisible, setItemForBackend }) {
    const dispatch = useDispatch();

    return (
        <div className='w-[350px] sm:w-[390px] p-4 flex flex-row justify-between items-center'>
            {/* <div className='flex flex-row justify-start items-center gap-x-[11px]'> */}


            {/* <img src={removeUploadsFromUrl(item?.avatar)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' /> */}



            <div className='flex flex-col items-start justify-start  h-full py-2'>
                <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(item?.venue, 50)}</p>
                <p className='text-[white]' style={{ fontSize: '12px' }}>
                    {maxLength(item?.date, 50)}
                </p>
            </div>
            {/* </div> */}
            <More
                className='h-[25px] w-[25px] cursor-pointer ml-7 text-white'
                onClick={() => {
                    setItemForBackend(item)
                    setOverlayVisible(true)
                    dispatch(updatePreviousUrl(item?.link))
                    // setLinkForBackend(item?.links[0]?.url)
                }}
            />

        </div>
    )
}
