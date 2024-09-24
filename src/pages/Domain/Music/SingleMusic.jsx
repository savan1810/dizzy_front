import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getContrastColor, maxLength } from '../../../components/DixeeInput2';
import CrossArrow from '../../../svg/CrossArrow';
import { getAccentColor, getAccentStyle, MUSIC_PLATFORMS } from '../../../constants/constants';
import MusicEdit from '../../../components/Focuspage/MainEdit/MusicEdit';
import { updateMusicOverlay } from '../../../store/focuspage/focuspageSlice';
import Spotify from '../../../svg/MusicPlatform/Spotify';
import AppleMusic from '../../../svg/MusicPlatform/AppleMusic';
import AmazonMusic from '../../../svg/MusicPlatform/AmazonMusic';
import SoundCloud from '../../../svg/MusicPlatform/SoundCloud';
import Tidal from '../../../svg/MusicPlatform/Tidal';
const componentMapping = {
    spotify: (props) => <Spotify {...props} />,
    apple_music: (props) => <AppleMusic {...props} />,
    amazon: (props) => <AmazonMusic {...props} />,
    soundcloud: (props) => <SoundCloud {...props} />,
    tidal: (props) => <Tidal {...props} />
};
export default function SingleMusic({ page, extension }) {
    const dispatch = useDispatch();

    const musicArticleData = useSelector((state) => state.domain?.focusData?.music);

    const [musicArticle, setmusicArticle] = useState(null);

    useEffect(() => {
        musicArticleData?.length > 0 && musicArticleData?.map((item) => {
            if (item?.page === page && item?.extension === extension) {
                setmusicArticle(item)
                return

            }
        })
    }, [])
    // const musicPageOverlay = useSelector((state) => state.focuspage.isMusicOverlay);
    const userData = useSelector((state) => state.domain.userArticle);



    return (

        <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative  " >


            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]    " style={musicArticle?.background ? { backgroundColor: `#${musicArticle?.background}` } : { backgroundColor: '#000000' }}>
                <div className="max-w-[350px] sm:max-w-[390px] h-[490px] flex relative">
                    <img src={musicArticle?.music[0]?.avatar} alt="photoimage" className="w-full h-full object-cover rounded-[20px]" />
                    {/* <More className='h-[20px] w-[20px] absolute top-2 right-4 cursor-pointer' color={getContrastColor(musicArticle?.background) ? `#${getContrastColor(musicArticle?.background)}` : '#ffffff'}
                    /> */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end p-4"
                        style={{
                            backgroundImage: `linear-gradient(to top, ${musicArticle?.background ? `#${musicArticle.background}` : 'black'}, transparent)`,
                        }}
                    >
                        {musicArticle?.headeractive &&
                            <div>
                                <p className='text-[16px] text-white ' style={getContrastColor(musicArticle?.background) ? { color: `#${getContrastColor(musicArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(musicArticle?.music[0]?.artist, 25)}</p>
                                <p className='text-[20px] text-white font-bold' style={getContrastColor(musicArticle?.background) ? { color: `#${getContrastColor(musicArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(musicArticle?.music[0]?.title, 40)}</p>
                            </div>}


                    </div>
                </div>


                <div className='w-full flex flex-col justify-center items-center gap-y-[16px] mt-[25px]'>

                    {
                        musicArticle?.music && musicArticle?.music[0]?.links?.length > 0 && musicArticle?.music[0]?.links?.map((item, index) => {
                            return (
                                <>
                                    <div className='flex w-full item-center justify-between px-4'>
                                        <div className='flex gap-x-1 justify-center items-center'>

                                            <p className='text-white' style={getAccentStyle(getContrastColor(musicArticle?.background))}>

                                                {componentMapping[item.source]({ color: "red" })}

                                            </p>
                                            <p className='text-white' style={getAccentStyle(getContrastColor(musicArticle?.background))}>{MUSIC_PLATFORMS?.map((platform) => platform?.value === item.source ? platform?.label : null)}</p>

                                        </div>
                                        <div className='flex gap-x-1' onClick={() => window.open(`${item.links[0]?.url}`, '_blank')}>
                                            <p className='text-white cursor-pointer' style={getAccentStyle(getContrastColor(musicArticle?.background))}>LISTEN NOW</p>
                                            <button >
                                                {/* <CrossArrow color={"white"} /> */}
                                                <CrossArrow color={getAccentColor(getContrastColor(musicArticle?.background))} />
                                            </button>
                                        </div>

                                    </div>
                                    <div className='w-full '>
                                        <div className={`mx-4 `} style={{ borderColor: getAccentColor(getContrastColor(musicArticle?.background)), borderWidth: '0.2px', opacity: '0.5' }}></div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className='w-full  flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[50px] text-[12px]' style={getAccentStyle(musicArticle?.accent)}>
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
