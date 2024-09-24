import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getContrastColor, maxLength } from '../../../components/DixeeInput2';
import CrossArrow from '../../../svg/CrossArrow';
import { getAccentColor, getAccentStyle } from '../../../constants/constants';

export default function SingleEvent({ page, extension }) {
    const eventArticleData = useSelector((state) => state.domain?.focusData?.event);

    const [eventArticle, seteventArticle] = useState(null);

    useEffect(() => {
        eventArticleData?.length > 0 && eventArticleData?.map((item) => {
            if (item?.page === page && item?.extension === extension) {
                seteventArticle(item)
                return
            }
        })
    }, [eventArticleData, page, extension])
    const userData = useSelector((state) => state.domain.userArticle);

    return (

        <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] " >

            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]" style={eventArticle?.background ? { backgroundColor: `#${eventArticle?.background}` } : { backgroundColor: '#000000' }}>
                <div className="max-w-[350px] sm:max-w-[390px] h-[490px] flex relative">
                    <img src={eventArticle?.avatar} alt="photoimage" className="w-full h-full object-cover rounded-[20px]" />
                    {/* <More className='h-[20px] w-[20px] absolute top-2 right-4 cursor-pointer' color={getContrastColor(eventArticle?.background) ? `#${getContrastColor(eventArticle?.background)}` : '#ffffff'}
                    // onClick={() => dispatch(updatePhotoOverlay(true))} 
                    /> */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end p-4"
                        style={{
                            backgroundImage: `linear-gradient(to top, ${eventArticle?.background ? `#${eventArticle.background}` : 'black'}, transparent)`,
                        }}
                    >
                        {eventArticle?.headeractive && <div>
                            <p className='text-[16px] text-white' style={getContrastColor(eventArticle?.background) ? { color: `#${getContrastColor(eventArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(eventArticle?.event[0]?.location
                                , 30)}</p>

                            <p className='text-[20px] text-white font-bold' style={getContrastColor(eventArticle?.background) ? { color: `#${getContrastColor(eventArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(eventArticle?.event[0]?.venue, 25)}</p>
                            <p className='text-[12px] text-white ' style={getContrastColor(eventArticle?.background) ? { color: `#${getContrastColor(eventArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(eventArticle?.event[0]?.time, 25)}</p>

                        </div>}


                    </div>
                </div>


                {/* <div className="text-[#FDFAFA] cursor-pointer my-4 flex flex-row justify-between items-center" onClick={() => navigation('/add-section')}>
                    <Plus className='h-[12px] w-[12px] cursor-pointer mx-2' />
                    <p style={{ fontSize: '12px' }}>Add a section</p>
                </div> */}

                <div className='w-full text-white flex flex-col justify-center items-start gap-y-[16px] mt-[25px] text-[12px]'>
                    <div className="text-[#FDFAFA] my-4 flex w-full px-4 flex-row justify-between items-center">
                        <div>
                            <p className="mr-2" style={getContrastColor(eventArticle?.background) ? { color: `#${getContrastColor(eventArticle?.background)}` } : { color: '#ffffff' }}>BUY TICKETS</p>
                        </div>

                        <div className='flex gap-x-1 items-center justify-center'>
                            <p className="text-[10px] " style={getContrastColor(eventArticle?.background) ? { color: `#${getContrastColor(eventArticle?.background)}` } : { color: '#ffffff' }}>UPLOAD SHOW CONTENT</p>
                            <CrossArrow color={getAccentColor(getContrastColor(eventArticle?.background))} />

                        </div>
                        {/* <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(eventArticle?.background) ? `#${getContrastColor(eventArticle?.background)}` : '#ffffff'} /> */}
                        {/* <img src={more} alt='sp' className='h-[3px] w-[12px] cursor-pointer' /> */}
                    </div>
                    <div className='w-full flex flex-col justify-center items-center gap-y-[16px]'>
                        <div className='w-full mx-4'>
                            <div className={`mx-4 border-[1px] `} style={{ borderColor: getAccentColor(getContrastColor(eventArticle?.background)) }}></div>
                        </div>
                        {eventArticle?.event?.length > 0 && eventArticle?.event.map((item, index) => {
                            return (
                                <>
                                    <div className='flex w-full item-center justify-between px-4'>
                                        <p className='text-white' style={getAccentStyle(getContrastColor(eventArticle?.background))}>{item?.date.split(',')[1]}</p>
                                        <p className='text-white' style={getAccentStyle(getContrastColor(eventArticle?.background))}>{item?.date.split(',')[0]}</p>
                                        <p className='text-white' style={getAccentStyle(getContrastColor(eventArticle?.background))}>{maxLength(item?.location, 10)}</p>
                                        <button onClick={() => window.open(`${item.link}`, '_blank')} className='flex gap-x-1 items-center'>
                                            <p className='text-white' style={getAccentStyle(getContrastColor(eventArticle?.background))}>{maxLength(item?.venue, 10)}</p>
                                            <CrossArrow color={getAccentColor(getContrastColor(eventArticle?.background))} />
                                        </button>

                                    </div>
                                    <div className='w-full mx-4'>
                                        <div className={`mx-4 border-[1px] `} style={{ borderColor: getAccentColor(getContrastColor(eventArticle?.background)) }}></div>
                                    </div>
                                </>

                            )
                        })}
                    </div>


                </div>
                <div className='w-full text-white flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[50px] text-[12px]' style={getAccentStyle(eventArticle?.accent)}>
                    <div className='space-y-[15px]'>
                        <div className='flex flex-row gap-x-[10px]'>
                            <p className='uppercase font-bold'>{userData?.username}</p>
                            <p className=''>x</p>
                            <p className='uppercase text-[11px]'>DIZEE</p>
                        </div>
                        <p>Privacy Policy</p>
                    </div>


                </div>

            </div>
        </div>


    );
}
