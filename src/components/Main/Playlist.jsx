import React from 'react'
import CrossArrow from '../../svg/CrossArrow'
import more from '../../assets/images/components/More.png'
import { getContrastColor, maxLength } from '../DixeeInput2'
import { getAccentColor, getAccentStyle } from '../../constants/constants'
import More from '../../svg/More'

export default function Playlist(props) {
    let { userArticle, playlist, setOverlay, title } = props
    return (
        <div className='w-full mb-[60px]'>
            <div className="text-[#FDFAFA] my-4 flex w-full px-4 flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>{title || 'PLAYLIST'}</p>
                </div>
                <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setOverlay(true)} />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-y-[16px]'>
                {playlist.map((item, index) => {
                    return (
                        <>
                            <div className='flex w-full item-center justify-between px-4'>
                                <p className='text-white' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.title, 30)}</p>

                                <div className='flex gap-x-1'
                                    onClick={() =>
                                        window.open(`/playlist-data/${userArticle?.domain}`, '_blank')
                                    }
                                // onClick={() => window.open(`${item.links[0]?.url}`, '_blank')}
                                >
                                    <p className='text-white cursor-pointer' style={getAccentStyle(userArticle?.accent)}>LISTEN NOW</p>
                                    <button >
                                        <CrossArrow color={getAccentColor(getContrastColor(userArticle?.background))} />
                                    </button>
                                </div>

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