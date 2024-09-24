import React from 'react'
import CrossArrow from '../../svg/CrossArrow'
import { getContrastColor, maxLength } from '../DixeeInput2'
import { getAccentColor, getAccentStyle } from '../../constants/constants'
import More from '../../svg/More'
import { postDataAPI } from '../../utils/fetchData'
import { useParams } from 'react-router'

export default function Event(props) {
    let { userArticle, event, setOverlay, title } = props
    const { domain: dynamicVar } = useParams();

    const handleClickEvent = async (item) => {
        window.open(item?.links[0]?.url, '_blank')
        try {
            await postDataAPI('analytics/create-event-analytics', { link: item?.links[0]?.url, domain: dynamicVar, venue: item?.venue }, null);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-[350px] sm:w-[639px] lg:w-[900px] mb-[60px]'>
            <div className="text-[#FDFAFA] my-4 flex w-full px-4 flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>{title || 'TOUR'}</p>
                </div>
                {/* <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setOverlay(true)} /> */}
                {/* <img src={more} alt='sp' className='h-[3px] w-[12px] cursor-pointer' /> */}
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-y-[16px]'>
                {event?.length > 0 && event.map((item, index) => {
                    return (
                        <>
                            <div className='flex w-full item-center justify-between px-4'>
                                <p className='text-white' style={getAccentStyle(userArticle?.accent)}>{item?.date.split(',')[1]}</p>
                                <p className='text-white' style={getAccentStyle(userArticle?.accent)}>{item?.date.split(',')[0]}</p>
                                <p className='text-white' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.location, 10)}</p>
                                <p className='text-white' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.venue, 10)}</p>
                                <button onClick={() => handleClickEvent(item)}>
                                    <CrossArrow color={getAccentColor(getContrastColor(userArticle?.background))} />
                                </button>

                            </div>
                            <div className='w-full mx-4'>
                                <div className={`mx-4  `} style={{ borderBottom: '.3px solid ' + getAccentColor(getContrastColor(userArticle?.background)) }}></div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
