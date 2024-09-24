import React from 'react'
import plus from '../../../assets/images/components/plus.png';
import { maxLength } from '../../DixeeInput2';
import { clearAlerts } from '../../../store/alert/alertSlice';
import { addVideoToSectionThunk, getVideoThunk } from '../../../store/addsection/addsectionThunk';
import { useDispatch } from 'react-redux';
import Plus from '../../../svg/Plus';

export default function ImportAddVideo({ title, artists, avatar, data, isExist, name, setLink, setData }) {

    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const handleClick = () => {
        let links = []
        links.push({
            source: name,
            url: data.url
        })
        let payload = {
            type: 0,
            avatar: data?.image,
            title: data?.title,
            artist: data?.description,
            links: links
        }
        dispatch(clearAlerts());
        dispatch(addVideoToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getVideoThunk({ token: token }))
        })
        setLink('')
        setData({})
    }

    return (
        <div className='w-[350px] sm:w-[390px]  p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img src={avatar} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' />
                <div className='flex flex-col items-start justify-start  h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(title, 30)}</p>
                    <p className='text-[#696974]' style={{ fontSize: '12px' }}>{maxLength(artists, 30)}</p>
                </div>
            </div>
            {!isExist && <button onClick={handleClick}>
                <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                {/* <img src={plus} alt='plus' className='h-[12px] w-[12px]  cursor-pointer' /> */}
            </button>}
        </div>
    )
}
