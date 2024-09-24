import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import LayoutHeader from '../../../../layout/LayoutHeader';
import CopyLink from '../../../../svg/CopyLink';
import { DizeeInput2 } from '../../../../components/DixeeInput2';
import { postDataAPI } from '../../../../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import { clearAlerts, setErrorAlert } from '../../../../store/alert/alertSlice';
import { getMusicThunk, getVideoThunk } from '../../../../store/addsection/addsectionThunk';
import { useDispatch, useSelector } from 'react-redux';
import AddedMusicCard from '../../../../components/AddSection/Music/AddedMusicCard';
import ManualAddMusic from '../../../../components/AddSection/Music/ManualAddMusic';
import MusicOverlay from '../../../../components/AddSection/Music/MusicOverlay';
import Youtube from '../../../../svg/SocialFeedPlatform/Youtube';
import Vimeo from '../../../../svg/SocialFeedPlatform/Vimeo';
import VideoOverlay from '../../../../components/AddSection/Video/VideoOverlay';
import AddedVideoCard from '../../../../components/AddSection/Video/AddedVideoCard';
import ImportAddVideo from '../../../../components/AddSection/Video/ImportAddVideo';

const componentMapping = {
    youtube: <Youtube />,
    vimeo: <Vimeo />
};

export default function AddLinkVideo() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { iconKey, name } = location.state;
    const IconComponent = componentMapping[iconKey];
    const [link, setLink] = useState('');
    const [debouncedLink, setDebouncedLink] = useState('');
    const [data, setData] = useState({});
    const token = localStorage.getItem('dizeeToken');
    const [loading, setLoading] = useState(false);
    const video = useSelector((state) => state.addsection.video);

    const [isExist, setIsExist] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [avtarForBackend, setAvatarForBackend] = useState('');

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getVideoThunk({ token }));
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
            setData({});
            setIsExist(false);
            return;
        }

        const fetchVideoData = async () => {
            setLoading(true);
            try {
                dispatch(clearAlerts());
                const response = await postDataAPI('user/getVideoUrlMetadata', { url: debouncedLink, type: name }, token);
                if (response.data.data.response.title === 'Page not available') {
                    setData({});
                    setIsExist(false);
                    dispatch(setErrorAlert("Please enter a valid link"));
                } else {
                    setData(response.data.data.response);
                    setIsExist(filterLink(response.data.data.response?.url));
                }
            } catch (err) {
                dispatch(setErrorAlert("Please enter a valid link"));
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [debouncedLink, dispatch, token]);

    const filterLink = (link) => {
        if (video?.length > 0) {
            for (let m of video) {
                for (let vlink of m.links) {
                    if (vlink.url === link) {
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
                    <Link to="/add-section/add-video">
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
                                Object.keys(data).length > 0 && <ImportAddVideo key={0} title={data.title} avatar={data?.image} artists={data?.description} data={data} isExist={isExist} setLink={setLink} name={data?.provider} setData={setData} />
                        }
                    </div>

                    {
                        video?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                            <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                                <div className='items-center flex flex-row text-white w-full'>
                                    <p>Added Video</p>
                                </div>
                            </div>
                            {
                                video?.length > 0 && video?.map((item, index) => <AddedVideoCard key={index} video={item} setAvatarForBackend={setAvatarForBackend} setOverlayVisible={setOverlayVisible} />)
                            }
                        </div>
                    }
                </div>
            </div>
            {isOverlayVisible && <VideoOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}
        </LayoutHeader>
    );
}
