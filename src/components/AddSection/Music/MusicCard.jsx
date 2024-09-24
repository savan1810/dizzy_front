import React from 'react'
import { useNavigate } from 'react-router-dom'
import plus from '../../../assets/images/components/plus.png';
import { maxLength } from '../../DixeeInput2';
import Plus from '../../../svg/Plus';

export default function MusicCard({ title, artists, index, avatar, item, isExist }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-section/music-platform', { state: { musicItem: item } });
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
