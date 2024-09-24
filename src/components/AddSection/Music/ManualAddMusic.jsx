import React from 'react'
import plus from '../../../assets/images/components/plus.png';
import { maxLength } from '../../DixeeInput2';
import { clearAlerts } from '../../../store/alert/alertSlice';
import { addMusicToSectionThunk, getMusicThunk } from '../../../store/addsection/addsectionThunk';
import { useDispatch } from 'react-redux';
import Plus from '../../../svg/Plus';

export default function ManualAddMusic({ title, artists, avatar, musicData, isExist, name, setLink }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const handleClick = () => {
        let links = []
        links.push({
            source: name,
            url: musicData.url
        })
        let payload = {
            type: 1,
            avatar: musicData?.image,
            title: musicData?.title,
            artist: musicData?.description,
            links: links
        }

        dispatch(clearAlerts());
        dispatch(addMusicToSectionThunk({ token: token, payload: payload })).then((res) => {
            if (res.payload.status === 200) {
                dispatch(getMusicThunk({ token: token }))
            }
        })
        setLink('')
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
