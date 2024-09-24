import React from 'react'
import { getContrastColor, maxLength } from '../DixeeInput2'
import { getAccentLightStyle, getAccentStyle, haxToRgbLight } from '../../constants/constants'
import { postDataAPI } from '../../utils/fetchData'
import { useParams } from 'react-router'
import Spotify from '../../svg/Social/Spotify'
import AppleMusic from '../../svg/Social/AppleMusic'
import AmazonMusic from '../../svg/MusicPlatform/AmazonMusic'
import SoundCloud from '../../svg/MusicPlatform/SoundCloud'
import Tidal from '../../svg/MusicPlatform/Tidal'
import MusicDataPage from '../../pages/Main/Pages/Music/MusicDataPage'

const componentMapping = {
    spotify: (props) => <Spotify {...props} />,
    apple_music: (props) => <AppleMusic {...props} />,
    amazon: (props) => <AmazonMusic {...props} />,
    soundcloud: (props) => <SoundCloud {...props} />,
    tidal: (props) => <Tidal {...props} />
};
export default function Music(props) {
    let { userArticle, music, setMusicOverlay, title } = props
    const { domain: dynamicVar } = useParams();
    const [showModal, setShowModal] = React.useState(false);
    const [id, setId] = React.useState(null);

    const contrastColor = userArticle?.accent;
    const accentStyle = getAccentStyle(contrastColor);
    const accentLightStyle = getAccentLightStyle(haxToRgbLight(contrastColor));
    const handleClickMusic = async (link, item) => {
        window.open(link?.url, '_blank')
        try {
            await postDataAPI('analytics/create-music-analytics', { link: link?.url, domain: dynamicVar, title: item?.title, source: link?.source }, null);
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            {music?.length > 0 &&

                <div className="text-[#FDFAFA] my-4 lg:w-[900px] sm:w-[639px] w-[350px] flex px-4 flex-row justify-between items-start">
                    <div className='w-full'>
                        <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>{title || `MUSIC`}</p>
                    </div>
                    {/* <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setMusicOverlay(true)} /> */}
                    {/* <img src={more} alt='sp' className='h-[3px] w-[12px] cursor-pointer' onClick={() => setOverlayVisible(true)} /> */}
                </div>
            }
            {music?.length > 0 && (
                <div className="lg:w-[900px] sm:w-[639px] w-[350px] mb-[50px] overflow-x-auto px-4 flex flex-row gap-x-4">
                    {music.slice(0, 6).map((item, index) => (
                        <div className="w-[130px] flex-shrink-0 flex flex-col h-auto">


                            <img
                                onClick={() => {

                                    setShowModal(true)
                                    setId(item?.id)
                                }
                                    // window.open(`/music-data/${dynamicVar}/${item?.id}`, '_blank')
                                }
                                src={item?.avatar} alt="imageurl" className="h-[130px] object-cover w-[130px] cursor-pointer rounded-[3px]" />
                            {/* Text part, not affected by hover */}
                            <div className="w-full pt-3 flex flex-col items-center gap-y-1">
                                <p
                                    className="text-white w-full text-[12px] text-start"
                                    style={accentStyle}
                                >
                                    {maxLength(item?.title, 15)}
                                </p>
                                <p
                                    className="text-gray-300 w-full text-[12px] text-start"
                                    style={accentLightStyle}
                                >
                                    {maxLength(item?.artist, 15)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">

                    <MusicDataPage domain={dynamicVar} id={id} setShowModal={setShowModal} />
                </div>
            }
        </>
    )
}

// <CusCard
//                             key={index}
//                             imgurl={item?.avatar}
//                             txt={item?.title}
//                             item={item}
//                             artist={item?.artist}
//                             userArticle={userArticle}
//                         />