import React from 'react'
import plus from '../../../assets/images/components/plus.png';
import { DizeeInput2, maxLength } from '../../DixeeInput2';
import { clearAlerts } from '../../../store/alert/alertSlice';
import { addEventToSectionThunk, addVideoToSectionThunk, getEventThunk, getVideoThunk } from '../../../store/addsection/addsectionThunk';
import { useDispatch } from 'react-redux';
import { useNavigation } from 'react-router';
import Plus from '../../../svg/Plus';

export default function AddSinglEvent({ title, artists, avatar, data, isExist, name, setLink, setData }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const handleClick = () => {
        let links = []
        links.push({
            source: name,
            url: data.url
        })
        let payload = {
            type: 1,
            avatar: data?.image,
            title: data?.title,
            artist: data?.description,
            links: links
        }
        dispatch(clearAlerts());
        dispatch(addEventToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getEventThunk({ token: token }))
        })
        setLink('')
        setData({})
    }

    return (
        <div>
            <div className='w-[350px] sm:w-[390px]  p-4 flex flex-row justify-between items-center'>
                {/* <img src={avatar ? avatar : data?.icon} alt='alt' className='object-cover h-[50px]  w-[50px] rounded-[3px]  ' /> */}
                <div className='flex flex-col items-start justify-start  h-full py-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>{maxLength(title, 30)}</p>
                    <p className='text-[#696974]' style={{ fontSize: '12px' }}>{maxLength(artists, 30)}</p>
                </div>

                {!isExist && <button onClick={handleClick}>
                    <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                    {/* <img src={plus} alt='plus' className='h-[12px] w-[12px]  cursor-pointer' /> */}
                </button>}
            </div>
            <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                <div className='items-center flex flex-row text-white w-full'>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add location"
                        className="dizee-input w-full"
                    />
                </div>
            </div>
            <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                <div className='items-center flex flex-row text-white w-full'>
                    <DizeeInput2
                        label="Link"
                        placeholder="Select a venue"
                        className="dizee-input w-full"
                    />
                </div>
            </div>
            <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                <div className='items-center flex flex-row text-white w-full'>
                    <button className='text-white text-[12px]' style={{ fontSize: '12px' }} onClick={(e) => {
                        e.preventDefault()
                        navigate('/add-section/date-picker')
                    }
                    }
                    >Select a date</button>
                </div>
            </div>
        </div>

    )
}
