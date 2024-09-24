import React, { useEffect, useState, useRef } from 'react';
import { getDataAPI, postDataAPI } from '../../../../utils/fetchData';
import { removeUploadsFromUrl } from '../../../../components/DixeeInput2';
import Spotify from '../../../../svg/Social/Spotify';
import AppleMusic from '../../../../svg/Social/AppleMusic';
import AmazonMusic from '../../../../svg/MusicPlatform/AmazonMusic';
import SoundCloud from '../../../../svg/MusicPlatform/SoundCloud';
import Tidal from '../../../../svg/MusicPlatform/Tidal';
import axios from 'axios';
import Pause from '../../../../svg/Pause';
import PlayCircle from '../../../../svg/PlayCircle';

const componentMapping = {
    spotify: (props) => <Spotify {...props} />,
    apple_music: (props) => <AppleMusic {...props} />,
    amazon: (props) => <AmazonMusic {...props} />,
    soundcloud: (props) => <SoundCloud {...props} />,
    tidal: (props) => <Tidal {...props} />
};


export default function MusicDataPage({ domain, id, setShowModal }) {
    const [musicData, setMusicData] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        console.log('musicData', musicData)

        // Find the relevant item directly

        if (musicData?.links?.length > 0) {
            const spotifyLink = musicData.links.find(link => link?.source === 'spotify');
            if (spotifyLink) {
                const trackID = spotifyLink.url.split('/track/')[1];
                console.log('trackID', trackID)
                if (trackID) {
                    getDataAPI('auth/spotify/get-token', null)
                        .then(res => {
                            console.log('res?.data?.data.response', res?.data?.data.response)
                            if (res?.data?.status === 200) {
                                return axios.get(`https://api.spotify.com/v1/tracks/${trackID}`, {
                                    headers: {
                                        'Authorization': `Bearer ${res.data.data.response}`
                                    }
                                });
                            }
                            throw new Error('Failed to get Spotify token');
                        })
                        .then(response => {
                            console.log('response.data', response.data)
                            console.log('response.data?.preview_url', response.data?.preview_url)
                            setPreviewUrl(response.data?.preview_url);
                        })
                        .catch(error => {
                            console.error('Error fetching track data:', error);
                        });
                }
            }
        }

    }, [musicData, id]);


    // Function to toggle play/pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const getMusic = async () => {
        try {
            const res = await postDataAPI(`auth/get-music-data`, { id, domain }, null);
            if (res?.data?.status === 200) {
                setMusicData(res?.data?.data?.response);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getMusic();
    }, []);

    const handleClickMusic = async (link, item) => {
        // if (link.source === 'spotify') {
        //     const embedUrl = embedMapping.spotify(link.url);
        //     setSpotifyEmbedUrl(embedUrl);
        // } else {
        window.open(link?.url, '_blank');
        // }
        try {
            await postDataAPI('analytics/create-music-analytics', { link: link?.url, domain, title: item?.title, source: link?.source }, null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseOverlay = () => {
        setShowModal(false); // Close the overlay
    };

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-center items-center relative rounded-[20px]">
                <div className="max-w-[350px] sm:max-w-[390px] max-h-[350px] sm:max-h-[390px] flex relative">
                    <img src={removeUploadsFromUrl(`${musicData?.avatar}`)} alt="photoimage" className="w-full h-full object-cover rounded-[20px]" />
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end px-4 from-black">
                        <div className='flex flex-col justify-center gap-y-2 w-full pb-2'>
                            <p className='text-[12px] text-[#FBFBFD]'>{musicData?.artist}</p>
                            <p className='text-[15px] text-[#FBFBFD] font-bold'>{musicData?.title}</p>
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center gap-x-[10px]">
                                    {musicData?.links?.length > 0 && musicData?.links.map(link => (
                                        <span key={link.source} className="cursor-pointer"
                                            onClick={() => handleClickMusic(link, musicData)}>
                                            {componentMapping[link.source] && componentMapping[link.source]({ className: 'w-4 h-4 mx-0' })}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Play/Pause Button Centered */}
                    {previewUrl && (
                        <div className="absolute inset-0 flex justify-center items-center">
                            {isPlaying ? (
                                <Pause className="cursor-pointer h-[40px] w-[40px] text-white" onClick={togglePlay} color="white" />
                            ) : (
                                <PlayCircle className="cursor-pointer h-[40px] w-[40px] text-white" onClick={togglePlay} />
                            )}
                        </div>
                    )}

                    <button
                        className="absolute bottom-[-20px] right-2 text-white rounded-full cursor-pointer"
                        onClick={() => handleCloseOverlay(false)}
                    >
                        Close
                    </button>
                </div>
                {previewUrl && (
                    <audio ref={audioRef} src={previewUrl} style={{ display: 'none' }}>
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>

    );
}
