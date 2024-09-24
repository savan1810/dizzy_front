import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import Spotify from '../../../../../svg/MusicPlatform/Spotify';
import AppleMusic from '../../../../../svg/MusicPlatform/AppleMusic';
import AmazonMusic from '../../../../../svg/MusicPlatform/AmazonMusic';
import SoundCloud from '../../../../../svg/MusicPlatform/SoundCloud';
import Tidal from '../../../../../svg/MusicPlatform/Tidal';
import CopyLink from '../../../../../svg/CopyLink';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import { postDataAPI } from '../../../../../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import { clearAlerts, setErrorAlert } from '../../../../../store/alert/alertSlice';
import { getMusicThunk } from '../../../../../store/addsection/addsectionThunk';
import { useDispatch, useSelector } from 'react-redux';
import AddedMusicCard from '../../../../../components/AddSection/Music/AddedMusicCard';
import ManualAddMusic from '../../../../../components/AddSection/Music/ManualAddMusic';
import MusicOverlay from '../../../../../components/AddSection/Music/MusicOverlay';
import Tiktok from '../../../../../svg/SocialFeedPlatform/Tiktok';
import Instagram from '../../../../../svg/SocialFeedPlatform/Instagram';
import Youtube from '../../../../../svg/SocialFeedPlatform/Youtube';

const componentMapping = {
    tt: <Tiktok />,
    igreel: <Instagram />,
    iggrid: <Instagram />,
    ytshorts: <Youtube />,
};

export default function AddLinkSocialFeed() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { iconKey, name } = location.state;
    const IconComponent = componentMapping[iconKey];
    const [link, setLink] = useState('');
    const [debouncedLink, setDebouncedLink] = useState('');
    const [musicData, setMusicData] = useState({});
    const token = localStorage.getItem('dizeeToken');
    const [loading, setLoading] = useState(false);
    const music = useSelector((state) => state.addsection.music);
    const [isExist, setIsExist] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [avtarForBackend, setAvatarForBackend] = useState('');

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getMusicThunk({ token }));
    }, [dispatch, token]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedLink(link);
        }, 500); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [link]);

    useEffect(() => {
        if (debouncedLink.length < 6) {
            setMusicData({});
            setIsExist(false);
            return;
        }

        const fetchMusicData = async () => {
            setLoading(true);
            try {
                dispatch(clearAlerts());
                const response = await postDataAPI('user/getUrlMetadata', { url: debouncedLink }, token);
                if (response.data.data.response.title === 'Page not available') {
                    setMusicData({});
                    setIsExist(false);
                    dispatch(setErrorAlert("Please enter a valid link"));
                } else {
                    setMusicData(response.data.data.response);
                    setIsExist(filterLink(debouncedLink));
                }
            } catch (err) {
                dispatch(setErrorAlert("Please enter a valid link"));
            } finally {
                setLoading(false);
            }
        };

        fetchMusicData();
    }, [debouncedLink, dispatch, token]);

    const filterLink = (link) => {
        if (music?.length > 0) {
            for (let m of music) {
                for (let musicLink of m.links) {
                    if (musicLink.url === link) {
                        setIsExist(true);
                        return true;
                    }
                }
            }
        }
        setIsExist(false);
        return false;
    };




    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] h-[80vh] bg-black flex flex-col items-center relative">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        {IconComponent}
                        <span className='text-white'>{name}</span>
                    </div>
                    <Link to="/add-section/music-manual-entry">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>
                <div className='flex w-full flex-col gap-y-[50px] '>

                    <div className="flex flex-col justify-center items-center w-full ">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center ' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter a link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>
                        {
                            loading ? <ClipLoader
                                color="white"
                                loading={true}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                                Object.keys(musicData).length > 0 && <ManualAddMusic key={0} title={musicData.title} avatar={musicData?.image} artists={musicData?.description} musicData={musicData} isExist={isExist} name={name} setLink={setLink} />
                        }
                    </div>

                    {music?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Music</p>
                            </div>
                        </div>
                        {
                            music?.length > 0 && music?.map((item, index) => <AddedMusicCard key={index} music={item} setAvatarForBackend={setAvatarForBackend} setOverlayVisible={setOverlayVisible} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <MusicOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}
        </LayoutHeader>
    );
}
