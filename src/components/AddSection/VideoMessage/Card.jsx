import React from 'react'
import more from '../../../assets/images/components/More.png';
import More from '../../../svg/More';


const Card = ({ title, desc, photo, saveType, setOverlayVisible, setSaveType, setLink, setTitleState, timeBackend, setTimerBackend, item }) => {
    return (
        <div className='w-full  p-5 flex flex-row justify-between'>
            <div className='flex flex-row justify-start items-center'>
                {/* <img src={photo} alt='alt' className='object-contain h-[40px]  w-[40px] rounded-full mr-7 ' /> */}
                <video src={photo} style={item.filter ? { filter: item.filter } : null} className="object-cover h-[40px] w-[40px] rounded-full mr-5 " muted controls={false} />
                <div className='flex flex-col items-start justify-start  p-2'>
                    <p className='text-white' style={{ fontSize: '12px' }}>{title}</p>
                    {saveType === 'save-as-draft' && <p className='text-[#696974]' style={{ fontSize: '12px' }}>draft</p>}
                </div>
            </div>
            <div className='flex flex-row w-auto items-center'>
                <p className='text-[#FF2300]' style={{ fontWeight: '500' }}>
                    {
                        saveType === 'save-as-draft' ? 'publish' : 'unpublish'
                    }
                </p>
                <More className='h-[20px] w-[20px] cursor-pointer ml-7 ' onClick={() => {
                    setOverlayVisible(true)
                    setSaveType(saveType)
                    setLink(photo)
                    setTitleState(title)
                    setTimerBackend(timeBackend)
                }} />
                {/* <img src={more} alt='sp' className='h-[3px] w-[12px] ml-7 cursor-pointer'
                   
                /> */}

            </div>
        </div>
    )
}

export default Card
