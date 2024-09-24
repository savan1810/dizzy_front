import React from 'react'
import more from '../../../assets/images/components/More.png';
import { maxLength, removeUploadsFromUrl } from '../../DixeeInput2';
import { useDispatch } from 'react-redux';
import { updateEventDate, updateLink, updateLocation, updateVenue } from '../../../store/eventData/eventdataSlice';
import More from '../../../svg/More';


export default function AddedProductCard({ item, setLinkForBackend, setOverlayVisible, setItemForBackend, setPreviousUrl, setTitle }) {
    const dispatch = useDispatch();

    return (
        <div className='w-[350px] sm:w-[390px] p-4 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img src={removeUploadsFromUrl(item?.image)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />
                <div className='flex flex-col items-start justify-start  h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(item?.productName, 30)}</p>
                    {/* <p className='text-[white]' style={{ fontSize: '12px' }}>
                        {maxLength(item?.description, 50)}
                    </p> */}
                </div>
            </div>
            <More className='h-[20px] w-[20px] cursor-pointer ml-7 ' onClick={() => {
                setItemForBackend(item)
                setOverlayVisible(true)
                setTitle(item?.productName)
                setPreviousUrl(item?.links[0]?.url)
            }} />

        </div>
    )
}
