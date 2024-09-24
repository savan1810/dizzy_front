import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import CopyLink from '../../../../../svg/CopyLink';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import { postDataAPI } from '../../../../../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import { clearAlerts, setErrorAlert } from '../../../../../store/alert/alertSlice';
import { getVideoThunk } from '../../../../../store/addsection/addsectionThunk';
import { useDispatch, useSelector } from 'react-redux';
import ImportAddVideo from '../../../../../components/AddSection/Video/ImportAddVideo';
import AddedVideoCard from '../../../../../components/AddSection/Video/AddedVideoCard';
import VideoOverlay from '../../../../../components/AddSection/Video/VideoOverlay';

export default function ImportVideo() {
    const dispatch = useDispatch();
    const [link, setLink] = useState('');
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

    // Debounced function to handle API call
    const debouncedApiCall = useCallback(
        _.debounce(async (value) => {
            setLoading(true);
            try {
                dispatch(clearAlerts());
                const response = await postDataAPI(`user/getYoutubeUrlMetadata`, { url: value }, token);
                if (response.data.data.response.title === 'Page not available') {
                    setData({});
                    setLoading(false);
                    return;
                }
                setData(response.data.data.response);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                dispatch(setErrorAlert("Please enter a valid link"));
            }
        }, 500),
        [dispatch, token]
    );

    // Define filterLink inside the useCallback to ensure proper memoization
    const filterLink = useCallback((link) => {
        if (video?.length > 0) {
            for (let v of video) {
                for (let linkVideo of v.links) {
                    if (linkVideo.url === link) {
                        setIsExist(true);
                        return true;
                    }
                }
            }
        }
        setIsExist(false);
        return false;
    }, [video]);

    useEffect(() => {
        if (link) {
            debouncedApiCall(link);
            filterLink(link);
        }
    }, [link, debouncedApiCall, filterLink]);
    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] h-[80vh] bg-black flex flex-col  items-center relative">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        {/* {IconComponent} */}
                        <span className='text-white'>Import video link</span>
                    </div>
                    <Link to="/add-section/add-video">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>
                <div className='flex w-full flex-col gap-y-[50px] '>

                    <div className="flex flex-col justify-center items-center w-full ">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center '>
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
        </LayoutHeader >
    );
}
