import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_user_articles_thunk, update_user_article_thunk } from '../../store/user/userThunk';
import { clearAlerts } from '../../store/alert/alertSlice';
import { articlDataDefaultArray, getAccentStyle, SOCIAL_PLATFORMS_SVG } from '../../constants/constants';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../layout/LayoutHeader'
import { getContrastColor, removeUploadsFromUrl } from '../../components/DixeeInput2'
import { getAllSectionsThunk } from '../../store/addsection/addsectionThunk'
import Event from '../../components/Main/Event'
import Product from '../../components/Main/Product'
import Video from '../../components/Main/Video'
import Playlist from '../../components/Main/Playlist'
import Form from '../../components/Main/Form'
import Plus from '../../svg/Plus'
import More from '../../svg/More'
import PhotoOverlay from '../../components/Main/ArticleEdit/PhotoOverlay'
import { setUserArticle, updatePhotoOverlay, updateSocialApiCall } from '../../store/user/userSlice'
import { Socialfeed } from '../../components/Main/Socialfeed'
import Music from '../../components/Main/Music';
import MusicOverlay from '../../components/Main/ArticleEdit/MusicOverlay';
import PlayCircle from '../../svg/PlayCircle';
import CrossArrow from '../../svg/CrossArrow';

const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
};
export default function Main() {
    const dispatch = useDispatch();
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    let token = localStorage.getItem('dizeeToken');
    const userArticle = useSelector((state) => state.user.userArticle);
    const videoMessage = useSelector((state) => state.user.videoMessage);
    const music = useSelector((state) => state.addsection.music);
    const event = useSelector((state) => state.addsection.event);
    const product = useSelector((state) => state.addsection.product);
    const video = useSelector((state) => state.addsection.video);
    const playlist = useSelector((state) => state.addsection.playlist);
    const form = useSelector((state) => state.addsection.form);
    const socialfeed = useSelector((state) => state.addsection.socialfeed);

    const [color, setColor] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(false);
    const [backgroundShade, setBackgroundShade] = useState(false);
    const [accentColor, setAccentColor] = useState(false);
    const [accentShade, setAccentShade] = useState(false);
    const [hue, setHue] = useState(0); // Hue state for color sliders
    const [brightness, setBrightness] = useState(50); // Brightness state for shade sliders

    // Handle hue change
    const handleHueChangeBackground = (e) => {
        setHue(e.target.value);
        const hexColor = hslToHex(e.target.value, 100, brightness);
        const colorValue = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
        dispatch(setUserArticle({ ...userArticle, background: colorValue }));
    };

    // Handle brightness change
    const handleBrightnessChangeBackground = (e) => {
        setBrightness(e.target.value);

        const hexColor = hslToHex(hue, 100, e.target.value);
        const colorValue = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
        dispatch(setUserArticle({ ...userArticle, background: colorValue }));
    };
    const handleHueChangeAccent = (e) => {
        setHue(e.target.value);
        const hexColor = hslToHex(e.target.value, 100, brightness);
        const colorValue = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
        dispatch(setUserArticle({ ...userArticle, accent: colorValue }));
    };

    // Handle brightness change
    const handleBrightnessChangeAccent = (e) => {
        setBrightness(e.target.value);
        console.log('e.target.value', e.target.value)
        const hexColor = hslToHex(hue, 100, e.target.value);
        const colorValue = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
        dispatch(setUserArticle({ ...userArticle, accent: colorValue }));
    };


    const updateUserArticle = async () => {

        let body = userArticle

        dispatch(update_user_article_thunk({ token, body }));
        setColor(false);
        setBackgroundColor(false);
        setBackgroundShade(false);
        setAccentColor(false);
        setAccentShade(false);
    }
    // Handle hue change


    const photoOverlay = useSelector((state) => state.user.isPhotoOverlay);
    const [musicOverlay, setMusicOverlay] = useState(false);
    const [videoOverlay, setVideoOverlay] = useState(false);
    const [productOverlay, setProductOverlay] = useState(false);
    const [eventOverlay, setEventOverlay] = useState(false);
    const [socialfeedOverlay, setSocialfeedOverlay] = useState(false);
    const [playlistOverlay, setPlaylistOverlay] = useState(false);
    const [formOverlay, setFormOverlay] = useState(false);
    const [articlDataDefault, setArticlDataDefault] = useState(articlDataDefaultArray);
    const [videoPopupOpen, setVideoPopupOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null); // Reference to the video element
    let getPublishVideoMessage = videoMessage?.length > 0 && videoMessage?.filter((item) => item.saveType === 'post-on-page');
    const navigation = useNavigate()

    let socialApiCall = useSelector((state) => state.user.socialApiCall);

    useEffect(() => {
        if (token && !socialApiCall) {
            dispatch(clearAlerts());
            dispatch(get_user_articles_thunk({ token }));
            dispatch(getAllSectionsThunk({ token }));
        }
        else {
            dispatch(updateSocialApiCall(false));
        }
    }, [dispatch, token, socialApiCall]);

    useEffect(() => {
        // Add or remove the 'no-scroll' class based on overlay visibility
        document.body.classList.toggle('no-scroll', isOverlayVisible);
    }, [isOverlayVisible]);

    useEffect(() => {
        if (userArticle?.articlDataDefault) {
            setArticlDataDefault(userArticle?.articlDataDefault)
        }
    }, [getPublishVideoMessage]);

    const getPlatformSrc = (value) => {
        const platform = SOCIAL_PLATFORMS_SVG.find(p => p.value === value);
        if (!platform) return null;

        return {
            Component: platform.Component,
            redirect: platform.redirect,
        };
    };

    const handleSocialClick = (redirect, handle) => {
        const url = `${redirect}${handle}`;
        window.open(url, '_blank');
    };


    const moveSection = (sectionType, direction) => {
        const sectionIndex = articlDataDefault.findIndex(item => item.type === sectionType);

        if (
            (direction === 'up' && sectionIndex > 0) ||
            (direction === 'down' && sectionIndex < articlDataDefault.length - 1)
        ) {
            const updatedArray = [...articlDataDefault];
            const swapIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
            [updatedArray[sectionIndex], updatedArray[swapIndex]] = [updatedArray[swapIndex], updatedArray[sectionIndex]];

            setArticlDataDefault(updatedArray);
            dispatch(update_user_article_thunk({ token, body: { ...userArticle, articlDataDefault: updatedArray } }));
            setMusicOverlay(false);
            setVideoOverlay(false);
            setProductOverlay(false);
            setEventOverlay(false);
            setSocialfeedOverlay(false);
            setPlaylistOverlay(false);
            setFormOverlay(false);
        }
    };
    // Function to move 'music' down in the array
    // Example usage for music
    const moveMusicUp = () => moveSection('music', 'up');
    const moveMusicDown = () => moveSection('music', 'down');

    // Example usage for video
    const moveVideoUp = () => moveSection('video', 'up');
    const moveVideoDown = () => moveSection('video', 'down');

    // Example usage for product
    const moveProductUp = () => moveSection('product', 'up');
    const moveProductDown = () => moveSection('product', 'down');

    const moveEventUp = () => moveSection('event', 'up');
    const moveEventDown = () => moveSection('event', 'down');

    const moveSocialfeedUp = () => moveSection('socialfeed', 'up');
    const moveSocialfeedDown = () => moveSection('socialfeed', 'down');

    const movePlaylistUp = () => moveSection('playlist', 'up');
    const movePlaylistDown = () => moveSection('playlist', 'down');

    const moveFormUp = () => moveSection('form', 'up');
    const moveFormDown = () => moveSection('form', 'down');

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying); // Toggle play/pause state
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false); // Set back to not playing after video ends
    };


    const sections = {
        music: music?.length > 0 && <Music userArticle={userArticle} music={music} setMusicOverlay={setMusicOverlay} title={articlDataDefault.find(item => item.type === 'music')?.title} />,
        event: event?.length > 0 && <Event userArticle={userArticle} event={event} setOverlay={setEventOverlay} title={articlDataDefault.filter(item => item.type === 'event')?.title} />,
        product: product?.length > 0 && <Product userArticle={userArticle} product={product} setOverlay={setProductOverlay} title={articlDataDefault.filter(item => item.type === 'product')?.title} />,
        video: video?.length > 0 && <Video userArticle={userArticle} video={video} setOverlay={setVideoOverlay} title={articlDataDefault.filter(item => item.type === 'video')?.title} />,
        socialfeed: socialfeed?.length > 0 && <Socialfeed userArticle={userArticle} socialfeed={socialfeed} setOverlay={setSocialfeedOverlay} title={articlDataDefault.filter(item => item.type === 'socialfeed')?.title} />,
        playlist: playlist?.length > 0 && <Playlist userArticle={userArticle} playlist={playlist} setOverlay={setPlaylistOverlay} title={articlDataDefault.filter(item => item.type === 'playlist')?.title} />,
        form: form?.length > 0 && <Form userArticle={userArticle} form={form} setOverlay={setFormOverlay} title={articlDataDefault.filter(item => item.type === 'form')?.title} />,
    }

    return (
        <LayoutHeader>

            <div className="w-[350px] sm:max-w-[390px] pb-[100px] h-full flex flex-col justify-start items-center relative rounded-[20px] bg-black" >
                <div className='flex py-4 z-1 ml-4 w-full justify-center items-center text-white'>
                    <div className="cursor-pointer mx-auto flex justify-center items-center gap-x-[4px]" onClick={() => window.open(`https://diz.ee/${userArticle?.domain}`, '_blank')}>
                        diz.ee/{userArticle?.domain}
                        <CrossArrow className='h-[14px] w-[14px]  cursor-pointer' />
                    </div>
                    <div className="mr-4 ">
                        <More className='h-[20px] w-[20px] absolute top-4 right-4 cursor-pointer ' onClick={() => dispatch(updatePhotoOverlay(true))} />
                    </div>
                </div>
                <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]" style={userArticle?.background ? { backgroundColor: `#${userArticle?.background}` } : { backgroundColor: '#000000' }}>
                    <div className="max-w-[350px] sm:max-w-[390px] h-[490px] flex relative">
                        <img src={removeUploadsFromUrl(`${userArticle?.avatar}`)} alt="photoimage" className="w-full h-full object-cover rounded-[20px] " />
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end pl-4"
                            style={{
                                backgroundImage: `linear-gradient(to top, #000000, transparent)`,
                            }}
                        >
                            <div className='flex flex-col justify-center pb-2'>
                                <p className='text-xl text-white font-bold' style={{ color: '#FBFBFD' }}>{userArticle?.username}</p>
                                <div className='flex flex-row mt-2  space-x-2 '>
                                    {userArticle?.social && Object.keys(userArticle.social).map(key => {
                                        const platformData = getPlatformSrc(key);

                                        if (platformData && platformData.Component) {
                                            const SocialIcon = platformData.Component;
                                            return (
                                                <div
                                                    key={key}
                                                    className='h-[15px] w-[15px]cursor-pointer'
                                                    onClick={() => handleSocialClick(platformData.redirect, userArticle.social[key])}
                                                >
                                                    <SocialIcon className="w-[15px] h-[15px] cursor-pointer" color={"#FBFBFD"} />
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>

                            </div>
                            <div>

                                {
                                    getPublishVideoMessage?.length > 0 && (
                                        <video
                                            // onClick={() => window.open(getPublishVideoMessage[0]?.link, '_blank')}
                                            onClick={() => setVideoPopupOpen(true)}
                                            style={{ filter: getPublishVideoMessage[0]?.filter }}
                                            src={getPublishVideoMessage[0]?.link} className="h-[60px] w-[60px] rounded-full object-cover cursor-pointer border-white border-[1px]" muted controls={false} />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* 
                    <div className="text-[#FDFAFA] cursor-pointer my-4 flex flex-row justify-between items-center" onClick={() => navigation('/add-section')} style={{ color: `#${getContrastColor(userArticle?.background)}` }}>
                        <Plus className='h-[12px] w-[12px] cursor-pointer mx-2' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} />
                        <p style={getContrastColor(userArticle?.background) ? { color: `#${getContrastColor(userArticle?.background)}` } : { color: '#ffffff' }}>Add a section</p>
                    </div> */}
                    {articlDataDefault.map(({ type }) => (
                        sections[type] || null
                    ))}

                    <div className='w-full  flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[60px] text-[12px]' style={getAccentStyle(userArticle?.accent)}>
                        <div className='space-y-[15px]'>
                            <div className='flex flex-row gap-x-[10px] items-center'>
                                <p className='uppercase text-[11px] tracking-[3px]'>DIZEE</p>
                                <p className='pb-[2px]'>x</p>
                                <p className='uppercase font-bold'>{userArticle?.username}</p>
                            </div>
                            <p>Privacy Policy</p>
                        </div>


                    </div>
                </div>
            </div>
            {!color && <div className="fixed max-w-[350px] bottom-0 w-full">
                <div className="flex justify-around items-center bg-black py-4">
                    <button
                        className="font-default text-center py-2 px-4 rounded-lg "
                        onClick={() => console.log('sss')}                  >
                        GET DIZEE
                    </button>
                    <button
                        className="text-white text-center py-2 px-4 rounded-lg "
                        onClick={() => navigation('/add-section')}
                    >
                        <Plus className='h-[15px] w-[15px]' />
                    </button>
                    <button
                        className="font-default  text-center py-2 px-4 rounded-lg "
                        onClick={() => setColor(true)}
                    >
                        Color
                    </button>
                </div>
            </div >}
            {color && (
                <div className="fixed max-w-[350px] bottom-0 w-full">
                    <div className="flex justify-around items-center bg-black py-4">
                        <button
                            className="font-default text-center py-2 px-4 rounded-lg"
                            onClick={() => setBackgroundColor(true)}
                        >
                            Background
                        </button>
                        <button
                            className="font-default text-center py-2 px-4 rounded-lg"
                            onClick={() => setAccentColor(true)}
                        >
                            Accent
                        </button>
                        <button
                            className="font-default text-center py-2 px-4 rounded-lg"
                            onClick={() => {
                                setColor(false);
                                setBackgroundColor(false)
                                setBackgroundShade(false)
                                setAccentColor(false)
                                setAccentShade(false)
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {backgroundColor && (
                <div className="fixed max-w-[350px] bottom-0 w-full">
                    <div className="flex items-center justify-between bg-black py-4">
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => setBackgroundShade(true)}
                        >
                            Shade
                        </button>

                        <div className="flex items-center space-x-4">
                            {/* Display hex color */}
                            {/* <span className="text-white">{hexColor}</span> */}

                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={handleHueChangeBackground}
                                className="hue-slider"
                                style={{ width: "180px" }}
                            />
                        </div>

                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => updateUserArticle()}
                        >
                            Confirm
                        </button>
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {

                                setBackgroundColor(false)
                                setBackgroundShade(false)
                                setAccentColor(false)
                                setAccentShade(false)
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* Background Shade Selection */}
            {backgroundShade && (
                <div className="fixed max-w-[350px] bottom-0 w-full">
                    <div className="flex justify-around items-center bg-black py-4">
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {
                                setBackgroundShade(false);
                                setBackgroundColor(true);
                            }}
                        >
                            Color
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={handleBrightnessChangeBackground}
                            className="brightness-slider"
                            style={{
                                background: `linear-gradient(to left, white, hsl(${hue}, 100%, 50%))`,
                                margin: 0,
                                width: "180px"
                            }}
                        />
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => updateUserArticle()}
                        >
                            Confirm
                        </button>
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {
                                setBackgroundColor(false)
                                setBackgroundShade(false)
                                setAccentColor(false)
                                setAccentShade(false)
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}
            {accentColor && (
                <div className="fixed max-w-[350px] bottom-0 w-full">
                    <div className="flex items-center justify-between bg-black py-4">
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => setAccentShade(true)}
                        >
                            Shade
                        </button>

                        <div className="flex items-center space-x-4">
                            {/* Display hex color */}
                            {/* <span className="text-white">{hexColor}</span> */}

                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={handleHueChangeAccent}
                                className="hue-slider"
                                style={{ width: "180px" }}
                            />
                        </div>

                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => updateUserArticle()}
                        >
                            Confirm
                        </button>
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {

                                setBackgroundColor(false)
                                setBackgroundShade(false)
                                setAccentColor(false)
                                setAccentShade(false)
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {/* Background Shade Selection */}
            {accentShade && (
                <div className="fixed max-w-[350px] bottom-0 w-full">
                    <div className="flex justify-around items-center bg-black py-4">
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {
                                setAccentShade(false);
                                setAccentColor(true);
                            }}
                        >
                            Color
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={brightness}
                            onChange={handleBrightnessChangeAccent}
                            className="brightness-slider"
                            style={{
                                background: `linear-gradient(to left, white, hsl(${hue}, 100%, 50%))`,
                                margin: 0,
                                width: "180px"
                            }}
                        />
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => updateUserArticle()}
                        >
                            Confirm
                        </button>
                        <button
                            className="font-default text-center py-2  rounded-lg"
                            onClick={() => {
                                setBackgroundColor(false)
                                setBackgroundShade(false)
                                setAccentColor(false)
                                setAccentShade(false)
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            )}

            {
                photoOverlay && <PhotoOverlay userArticle={userArticle} />
            }
            {musicOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setMusicOverlay} onMoveUp={moveMusicUp} onMoveDown={moveMusicDown} onEdit={'add-section/add-music'} />}

            {videoOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setVideoOverlay} onMoveUp={moveVideoUp} onMoveDown={moveVideoDown} onEdit={'add-section/add-video'} />}

            {productOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setProductOverlay} onMoveUp={moveProductUp} onMoveDown={moveProductDown} onEdit={'add-section/add-product'} />}

            {eventOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setEventOverlay} onMoveUp={moveEventUp} onMoveDown={moveEventDown} onEdit={'add-section/add-event'} />}

            {socialfeedOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setSocialfeedOverlay} onMoveUp={moveSocialfeedUp} onMoveDown={moveSocialfeedDown} onEdit={'add-section/add-socialfeed'} />}

            {playlistOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setPlaylistOverlay} onMoveUp={movePlaylistUp} onMoveDown={movePlaylistDown} onEdit={'add-section/add-playlist'} />}

            {formOverlay && <MusicOverlay userArticle={userArticle} setOverlay={setFormOverlay} onMoveUp={moveFormUp} onMoveDown={moveFormDown} onEdit={'add-section/add-form'} />}

            {
                videoPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                        <div className="relative w-[300px] h-[300px] flex items-center justify-center  rounded-full">
                            <video
                                ref={videoRef} // Video reference for play/pause control
                                src={getPublishVideoMessage[0]?.link}
                                className="w-[280px] h-[280px] rounded-full object-cover"
                                style={{ filter: getPublishVideoMessage[0]?.filter }}
                                onEnded={handleVideoEnded}
                            />

                            {/* Custom Play/Pause button in the modal */}
                            <button
                                className="absolute   text-black rounded-full px-4 py-2"
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? '' : <PlayCircle className="h-[40px] w-[40px]" />}
                            </button>

                            <button
                                className="absolute bottom-2 right-2 text-white  rounded-full cursor-pointer"
                                onClick={() => setVideoPopupOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }
        </LayoutHeader >
    );
}