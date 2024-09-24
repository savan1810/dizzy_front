import React, { useEffect, useRef, useState } from 'react'
import CusCard from '../../components/CusCard';
import { useDispatch, useSelector } from 'react-redux';
import { follow_unfollow_thunk, get_user_articles_thunk, update_user_article_thunk } from '../../store/user/userThunk';
import { clearAlerts } from '../../store/alert/alertSlice';
import { articlDataDefault, articlDataDefaultArray, getAccentStyle, SOCIAL_PLATFORMS_SVG } from '../../constants/constants';
import { useNavigate, useParams } from 'react-router';
import LayoutHeader from '../../layout/LayoutHeader'
import { getContrastColor, removeUploadsFromUrl } from '../../components/DixeeInput2'
import { getAllSectionsThunk } from '../../store/addsection/addsectionThunk'
import Music from '../../components/PublicArticle/Music';
import Event from '../../components/PublicArticle/Event'
import Product from '../../components/PublicArticle/Product'
import Video from '../../components/PublicArticle/Video'
import Playlist from '../../components/PublicArticle/Playlist'
import Form from '../../components/PublicArticle/Form'
import { Socialfeed } from '../../components/PublicArticle/Socialfeed'
import { get_domain_articles_thunk, getDomainAllSectionsThunk, getDomainDataForFocusThunk } from '../../store/domain/domainThunk';
import { postDataAPI } from '../../utils/fetchData';
import PlayCircle from '../../svg/PlayCircle';

export default function BrandPage() {
    const token = localStorage.getItem('dizeeToken');
    let user = JSON.parse(localStorage.getItem('dizeeUser'));

    const dispatch = useDispatch();

    const { domain: dynamicVar } = useParams();

    const focusData = useSelector((state) => state.domain.focusData);

    const userArticle = useSelector((state) => state.domain.userArticle);
    const currentUserArticle = useSelector((state) => state.user.userArticle);
    const videoMessage = useSelector((state) => state.domain.videoMessage);
    const music = useSelector((state) => state.domain.music);
    const event = useSelector((state) => state.domain.event);
    const product = useSelector((state) => state.domain.product);
    const video = useSelector((state) => state.domain.video);
    const playlist = useSelector((state) => state.domain.playlist);
    const form = useSelector((state) => state.domain.form);
    const socialfeed = useSelector((state) => state.domain.socialfeed);
    const [articlDataDefault, setArticlDataDefault] = useState(articlDataDefaultArray);
    const [videoPopupOpen, setVideoPopupOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null); // Reference to the video element
    let getPublishVideoMessage = videoMessage?.length > 0 && videoMessage?.filter((item) => item.saveType === 'post-on-page');
    const navigation = useNavigate()
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        // Initialize follower and following count
        setFollowersCount(userArticle?.followers?.length || 0);
        setFollowingCount(userArticle?.following?.length || 0);

        // Check if the logged-in user is already following the target profile
        const currentUserId = currentUserArticle?._id; // This ensures it's checking the actual logged-in user ID
        if (userArticle?.followers?.includes(currentUserId)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [userArticle, currentUserArticle]);
    useEffect(() => {
        if (dynamicVar) {
            dispatch(clearAlerts());
            dispatch(get_domain_articles_thunk({ domain: dynamicVar }));
            dispatch(getDomainAllSectionsThunk({ domain: dynamicVar }));
            dispatch(getDomainDataForFocusThunk({ domain: dynamicVar }));
        }
    }, [dispatch, dynamicVar]);


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

    const handleSocialClick = async (redirect, handle, key) => {
        const url = `${redirect}${handle}`;
        window.open(url, '_blank');

        try {
            await postDataAPI('analytics/create-socialfeed-analytics', { platform: key, value: handle, domain: dynamicVar }, null);
        }
        catch (err) {
            console.log(err)
        }
    };

    const handleClickVideoMessage = async (link, title) => {
        // window.open(link, '_blank')
        try {
            await postDataAPI('analytics/create-video-message-analytics', { link: link, domain: dynamicVar, title: title }, null);
        }
        catch (err) {
            console.log(err)
        }

    };
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

    const handleFollowUnfollow = async () => {
        dispatch(follow_unfollow_thunk({ domain: dynamicVar, token }))
            .then((res) => {
                if (res?.payload?.status === 200) {
                    if (isFollowing) {
                        // User is unfollowing
                        setFollowersCount((prevCount) => prevCount - 1);
                    } else {
                        // User is following
                        setFollowersCount((prevCount) => prevCount + 1);
                    }

                    // Toggle the follow/unfollow state
                    setIsFollowing(!isFollowing);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const sections = {
        music: music?.length > 0 && <Music userArticle={userArticle} music={music} title={articlDataDefault.find(item => item.type === 'music')?.title} />,
        event: event?.length > 0 && <Event userArticle={userArticle} event={event} title={articlDataDefault.filter(item => item.type === 'event')?.title} />,
        product: product?.length > 0 && <Product userArticle={userArticle} product={product} title={articlDataDefault.filter(item => item.type === 'product')?.title} />,
        video: video?.length > 0 && <Video userArticle={userArticle} video={video} title={articlDataDefault.filter(item => item.type === 'video')?.title} />,
        socialfeed: socialfeed?.length > 0 && <Socialfeed userArticle={userArticle} socialfeed={socialfeed} title={articlDataDefault.filter(item => item.type === 'socialfeed')?.title} />,
        playlist: playlist?.length > 0 && <Playlist userArticle={userArticle} playlist={playlist} title={articlDataDefault.filter(item => item.type === 'playlist')?.title} />,
        form: form?.length > 0 && <Form userArticle={userArticle} form={form} title={articlDataDefault.filter(item => item.type === 'form')?.title} />,
    }

    return (
        <div className="w-[350px] sm:w-[100vw] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]" style={userArticle?.background ? { backgroundColor: `#${userArticle?.background}` } : { backgroundColor: '#000000' }}>
            <div className="w-[350px] sm:w-[100vw] h-[490px] sm:h-[700px] flex relative">
                <img src={removeUploadsFromUrl(`${userArticle?.avatar}`)} alt="photoimage" className="w-full h-full object-cover rounded-[20px] " />

                <div
                    className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end pl-4"
                    style={{
                        backgroundImage: `linear-gradient(to top, black, transparent)`,
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
                                            onClick={() => handleSocialClick(platformData.redirect, userArticle.social[key], key)}
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
                                    // onClick={() => handleClickVideoMessage(getPublishVideoMessage[0]?.link, getPublishVideoMessage[0]?.title)}
                                    onClick={() => {
                                        handleClickVideoMessage(getPublishVideoMessage[0]?.link, getPublishVideoMessage[0]?.title)
                                        setVideoPopupOpen(true)
                                    }}
                                    src={getPublishVideoMessage[0]?.link} className="h-[60px] w-[60px] rounded-full object-cover cursor-pointer border-white border-[1px]" muted controls={false} />
                            )
                        }
                    </div>
                </div>
            </div>

            <div className='w-[350px] sm:w-[639px] lg:w-[900px] flex justify-between items-center gap-y-[16px] px-4 mt-[30px] mb-[10px]'>
                <div className='flex flex-row gap-x-2 justify-between'>
                    <p className='text-white text-[12px] cursor-pointer' style={getContrastColor(userArticle?.background) ? { color: `#${getContrastColor(userArticle?.background)}` } : { color: '#ffffff' }} onClick={() => window.open(`/follower/${userArticle?.domain}`, '_blank')}>
                        {followersCount} followers
                    </p>
                    <p className='text-white text-[12px] cursor-pointer' style={getContrastColor(userArticle?.background) ? { color: `#${getContrastColor(userArticle?.background)}` } : { color: '#ffffff' }} onClick={() => window.open(`/following/${userArticle?.domain}`, '_blank')}>
                        {followingCount} following
                    </p>
                </div>
                {currentUserArticle?._id !== userArticle?._id && (
                    <div>
                        <button className='text-white text-[12px] font-[500]' style={getContrastColor(userArticle?.background) ? { color: `#${getContrastColor(userArticle?.background)}` } : { color: '#ffffff' }} onClick={handleFollowUnfollow}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                )}
            </div>

            {articlDataDefault.map(({ type }) => (
                sections[type] || null
            ))}

            <div className='w-[350px] sm:w-[639px] lg:w-[900px]  flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[60px] text-[12px]' style={getAccentStyle(userArticle?.accent)}>
                <div className='space-y-[15px]'>
                    <div className='flex flex-row gap-x-[10px] items-center'>
                        <p className='uppercase text-[11px] tracking-[3px]'>DIZEE</p>
                        <p className='pb-[2px]'>x</p>
                        <p className='uppercase font-bold'>{userArticle?.username}</p>
                    </div>
                    <p>Privacy Policy</p>
                </div>
            </div>
            {videoPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative w-[300px] h-[300px] flex items-center justify-center  rounded-full">
                        <video
                            ref={videoRef} // Video reference for play/pause control
                            src={getPublishVideoMessage[0]?.link}
                            className="w-[280px] h-[280px] rounded-full object-cover"
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
            )}
        </div>
    )
}
