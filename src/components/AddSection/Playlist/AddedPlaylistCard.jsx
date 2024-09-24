import React from 'react'
import more from '../../../assets/images/components/More.png';
import { maxLength, removeUploadsFromUrl } from '../../DixeeInput2';
import More from '../../../svg/More';


export default function AddedVideoCard({ item, setAvatarForBackend, setOverlayVisible }) {


    return (
        <div className='w-[350px] sm:w-[390px] p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img src={removeUploadsFromUrl(item?.avatar)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />
                <div className='flex flex-col items-start justify-start  h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(item?.title, 28)}</p>
                </div>
            </div>
            <More className='h-[20px] w-[20px] cursor-pointer ml-7 ' onClick={() => {
                setOverlayVisible(true)
                setAvatarForBackend(item?.avatar)
            }} />

        </div>
    )
}



// import React from 'react'
// import more from '../../../assets/images/components/More.png';
// import { maxLength, removeUploadsFromUrl } from '../../DixeeInput2';
// import { useDispatch } from 'react-redux';
// import { updateEventDate, updateLink, updateLocation, updateVenue } from '../../../store/eventData/eventdataSlice';


// export default function AddedPlaylistCard({ item, setOverlayVisible, setItemForBackend, setPreviousUrl }) {
//     const dispatch = useDispatch();

//     return (
//         <div className='w-[350px] sm:w-[390px] p-4 flex flex-row justify-between items-center'>
//             <div className='flex flex-row justify-start items-center gap-x-[11px]'>
//                 <img src={removeUploadsFromUrl(item?.image)} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />
//                 <div className='flex flex-col items-start justify-start  h-full p-2'>
//                     <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(item?.productName, 50)}</p>
//                     <p className='text-[white]' style={{ fontSize: '12px' }}>
//                         {maxLength(item?.description, 50)}
//                     </p>
//                 </div>
//             </div>
//             <img src={more} onClick={() => {
//                 setItemForBackend(item)
//                 setOverlayVisible(true)
//                 setPreviousUrl(item?.links[0]?.url)
//             }}
//                 alt='sp' className='h-[3px] w-[12px] ml-7 cursor-pointer'
//             />
//         </div>
//     )
// }
