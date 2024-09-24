import React, { useRef, useState, useEffect } from 'react';
import CrossArrow from '../../svg/CrossArrow';
import more from '../../assets/images/components/More.png';
import PlayCircle from '../../svg/PlayCircle';
import Play from '../../svg/Play';
import Pause from '../../svg/Pause';
import More from '../../svg/More';
import { getContrastColor } from '../DixeeInput2';
import { postDataAPI } from '../../utils/fetchData';
import { useParams } from 'react-router';

export default function Video(props) {
    const { userArticle, video, setOverlay, title } = props;
    const scrollRef = useRef(null);
    const { domain: dynamicVar } = useParams();

    const videoRefs = useRef([]); // Refs for video elements
    const [arrowsVisible, setArrowsVisible] = useState({ left: false, right: true });
    const [playingIndex, setPlayingIndex] = useState(null); // Track which video is playing
    const scrollByAmount = () => {
        if (window.innerWidth < 640) { // md or larger
            // Scroll by two products (318px is assumed width of each product)
            return 320; // Scroll by one product for smaller screens

        }
        else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            return 607; // Scroll by one product for smaller screens

        }
        else {
            return 870; // Scroll by one product for smaller screens
        }
    };
    // Function to scroll left
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
        }
    };

    // Function to update the visibility of arrows
    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const scrollWidth = scrollRef.current.scrollWidth;
            const clientWidth = scrollRef.current.clientWidth;

            setArrowsVisible({
                left: scrollLeft > 0,
                right: scrollLeft + clientWidth < scrollWidth
            });
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        if (scrollContainer) {
            // Initial visibility check
            updateArrowVisibility();

            // Add event listener for scroll events
            scrollContainer.addEventListener('scroll', updateArrowVisibility);

            // Cleanup event listener on component unmount
            return () => {
                scrollContainer.removeEventListener('scroll', updateArrowVisibility);
            };
        }
    }, []);

    // Function to handle play/pause
    const handleVideoClick = (index) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
                setPlayingIndex(index);
            } else {
                videoElement.pause();
                setPlayingIndex(null);
            }
        }

        // Pause other videos
        videoRefs.current.forEach((video, i) => {
            if (i !== index) {
                video.pause();
            }
        });
    };

    const handleClickVideo = async (item) => {
        try {
            await postDataAPI('analytics/create-video-analytics', { link: item?.links[0]?.url, domain: dynamicVar, title: item?.title, source: item?.links[0]?.source }, null);
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className='w-[350px] sm:w-[639px] lg:w-[900px] px-4 mb-[60px] relative items-center justify-center'>
            <div className="text-[#FDFAFA] my-4 flex w-full flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>
                        {title || 'VIDEO'}
                    </p>
                </div>
                {/* <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setOverlay(true)} /> */}
            </div>

            <div className='w-full sm:mx-[12.5px] overflow-x-auto relative' ref={scrollRef}>
                <div className='flex'>
                    {video?.length > 0 && video?.map((item, index) => {
                        let videoId = null;
                        if (item?.type === 0 && item?.links?.[0]?.url) {
                            try {
                                const urlObj = new URL(item.links[0].url);
                                videoId = urlObj.searchParams.get("v");
                            } catch (error) {
                                console.error("Invalid URL:", item.links[0].url);
                            }
                        }
                        return (
                            <div key={index} className='flex-shrink-0 flex w-full gap-x-[25px]'>
                                <div className="relative">
                                    {item?.type === 0 && videoId ? (
                                        <>
                                            <div onClick={() => handleClickVideo(item)} className="absolute inset-0 z-10" style={{ pointerEvents: 'none' }}></div>

                                            <iframe
                                                className='object-cover h-[460px] sm:[500px] lg:h-[600px] w-[320px] sm:w-[600px] lg:w-[870px]'
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded YouTube Video"
                                            ></iframe>

                                            {/* Arrows and buttons */}
                                            {arrowsVisible.left && (
                                                <div
                                                    onClick={scrollLeft}
                                                    className='absolute bottom-0 left-0 p-2 cursor-pointer z-10'
                                                >
                                                    <Play className='rotate-180' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} />
                                                </div>
                                            )}
                                            {arrowsVisible.right && video.length - 1 !== index && (
                                                <div
                                                    onClick={scrollRight}
                                                    className='absolute bottom-0 right-0 p-2 cursor-pointer z-10'
                                                >
                                                    <Play color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} />
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <video
                                                ref={el => videoRefs.current[index] = el}
                                                src={item?.avatar}
                                                className="object-cover h-[460px] w-full"
                                                muted
                                                controls={false}
                                                onClick={() => handleVideoClick(index)}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleVideoClick(index);
                                                }}
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 "
                                            >
                                                {playingIndex === index ? <Pause className='h-[40px] w-[40px] text-white' color={'white'} /> : <PlayCircle className='h-[40px] w-[40px]' />}
                                            </button>
                                            {arrowsVisible.left && (
                                                <div
                                                    onClick={scrollLeft}
                                                    className='absolute bottom-0 left-0 p-2 cursor-pointer z-10'
                                                >
                                                    <Play className='rotate-180' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} />
                                                </div>
                                            )}
                                            {arrowsVisible.right && video.length - 1 !== index && (
                                                <div
                                                    onClick={scrollRight}
                                                    className='absolute bottom-0 right-0 p-2 cursor-pointer z-10'
                                                >
                                                    <Play className="" color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
