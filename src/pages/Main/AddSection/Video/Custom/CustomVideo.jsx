import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import CopyLink from '../../../../../svg/CopyLink';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import { addVideoToSectionThunk, getVideoThunk } from '../../../../../store/addsection/addsectionThunk';
import AddedVideoCard from '../../../../../components/AddSection/Video/AddedVideoCard';
import { postDataAPI } from '../../../../../utils/fetchData';
import VideoSelectionCard from '../../../../../components/AddSection/Video/VideoSelectionCard';
import VideoOverlay from '../../../../../components/AddSection/Video/VideoOverlay';

export default function CustomVideo() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const video = useSelector((state) => state.addsection.video);
    const dispatch = useDispatch();

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [avtarForBackend, setAvatarForBackend] = useState('');


    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getVideoThunk({ token }));
    }, [dispatch, token]);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setSelectedVideo(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    const resetVideo = () => {
        setSelectedVideo(null);
        setVideoPreview(null);
    };

    const uploadVideo = async () => {
        if (!selectedVideo) return;

        const formData = new FormData();
        formData.append('video', selectedVideo);

        try {
            const videoResponse = await postDataAPI('aws/videoUpload', formData);
            const videoUrl = videoResponse?.data?.data?.videoUrl;
            return videoUrl

            // Handle the response data as needed
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const handleAddVideo = async () => {
        dispatch(clearAlerts());
        if (!title || !link || !selectedVideo) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        dispatch(setLoader(true));
        const videoUrl = await uploadVideo();
        if (!videoUrl) {
            dispatch(setErrorAlert('something went wrong'));
            return;
        }
        let links = [];
        links.push({
            url: link,
        });

        let payload = {
            type: 1,
            title: title,
            avatar: videoUrl,
            links: links,
        };

        dispatch(clearAlerts());
        dispatch(addVideoToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getVideoThunk({ token: token }));
            setTitle('');
            setLink('');
            setSelectedVideo(null);
            setVideoPreview(null);
        });
    };

    return (
        <LayoutHeader>
            <div className="w-[390px]  flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Custom link</p>
                    <div className='flex gap-[30px]'>
                        <button onClick={handleAddVideo} className='text-white cursor-pointer'>Confirm</button>
                        <p onClick={() => navigate('/add-section/add-video')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className='flex w-full flex-col gap-y-[50px] '>

                    <div className="flex flex-col items-center justify-center w-full" >
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add a title"
                                    className="dizee-input w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <VideoSelectionCard
                            txt="Add video"
                            dotimgclss={false}
                            onVideoChange={handleVideoChange}
                            videoPreview={videoPreview}
                            resetVideo={resetVideo}
                        />
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
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
                    </div>
                    {video?.length > 0 && (
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                                <div className='items-center flex flex-row text-white w-full'>
                                    <p>Added Video</p>
                                </div>
                            </div>
                            {video.map((item, index) => (
                                <AddedVideoCard key={index} video={item} setAvatarForBackend={setAvatarForBackend} setOverlayVisible={setOverlayVisible} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isOverlayVisible && <VideoOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}
        </LayoutHeader>
    );
}
