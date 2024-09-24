import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import Card from '../../../../components/AddSection/VideoMessage/Card';
import { useNavigate } from 'react-router';
import DotSvg from '../../../../svg/DotSvg';
import LayoutHeader from '../../../../layout/LayoutHeader';
import PlayCircle from '../../../../svg/PlayCircle';
import DizeeInput from '../../../../components/DizeeInput';
import { videoMessageOpts } from '../../../../constants/constants';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../store/alert/alertSlice';
import { postDataAPI } from '../../../../utils/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import ModalSaveVideo from '../../../../components/AddSection/VideoMessage/ModalSaveVideo';
import { add_video_message_thunk, delete_video_message_thunk, get_video_message_thunk, update_save_type_thunk } from '../../../../store/user/userThunk';

const MAX_RECORDING_TIME = 15;

const CommonComponents = ({ text, action }) => {
    return (
        <div className='w-full flex items-baseline justify-center flex-row'>
            <DotSvg width={6} height={6} color={'red'} className='mr-2' />
            <button className='text-white cursor-pointer' onClick={action} style={{ fontSize: '12px' }}>{text}</button>
        </div>
    );
};

export default function VideoMessage() {
    const token = localStorage.getItem('dizeeToken');
    const navigate = useNavigate();
    const [showWebcam, setShowWebcam] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoURL, setVideoURL] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activedTab, setActivedTab] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const intervalRef = useRef(null);
    let videoRef = useRef(null);
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const dispatch = useDispatch();
    const [filter, setFilter] = useState("brightness(1) contrast(1)");
    const [title, setTitle] = useState('')
    const [saveType, setSaveType] = useState('save-as-draft')
    const [link, setLink] = useState('')
    const [titleState, setTitleState] = useState(false)
    const [timerBackend, setTimerBackend] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [previosUrl, setPreviosUrl] = useState(null)
    const [webcamReady, setWebcamReady] = useState(false);

    const videoMessage = useSelector(state => state.user.videoMessage);

    useEffect(() => {
        if (token) {
            dispatch(clearAlerts());
            dispatch(get_video_message_thunk({ token }));
        }
    }, [token, dispatch]);




    useEffect(() => {
        return () => {
            if (videoURL) {
                URL.revokeObjectURL(videoURL);
            }
        };
    }, [videoURL]);

    const onCloseModal = () => {
        setActivedTab(false);
    }


    const handleStopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setShowWebcam(false); // Hide webcam after stopping recording
            clearInterval(intervalRef.current); // Stop the timer
        }
    }, []);

    const handleDataAvailable = useCallback(({ data }) => {
        if (data.size > 0) {
            setRecordedChunks(prevChunks => [...prevChunks, data]);
        }
    }, []);

    useEffect(() => {
        if (recordedChunks.length > 0 && !isRecording) {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoURL(url);
        }
    }, [recordedChunks, isRecording]);

    const handleStartRecording = useCallback(() => {
        dispatch(clearAlerts())
        setShowWebcam(true);
        setIsRecording(true);
        setTimer(0); // Reset timer
        intervalRef.current = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime >= MAX_RECORDING_TIME) { // Check if the timer has reached 15 seconds
                    handleStopRecording(); // Stop recording
                }
                return prevTime + 1;
            });
        }, 1000); // Update timer every second
        const options = { mimeType: 'video/webm; codecs=vp9' };
        const mediaRecorder = new MediaRecorder(webcamRef.current.stream, options);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(10); // Collect 10ms of data before generating a chunk
    }, [handleDataAvailable, handleStopRecording, dispatch]);


    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false); // Update isPlaying state when video playback ends
    };

    useEffect(() => {
        if (!isRecording) {
            clearInterval(intervalRef.current); // Clean up interval if the component is unmounted
        }
    }, [isRecording]);


    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };
    const onSaveClick = () => {
        setActivedTab(true);
    };
    const handleRemoveVideo = () => {
        setRecordedChunks([]);
        setVideoURL(null)
        setShowWebcam(false)
        setIsRecording(false)
        setIsPlaying(false)
        setTimer(0)
        videoRef.current = null;
        if (isEdit) {
            setPreviosUrl(videoURL)
            setIsEdit(false)
        }
    };

    const handleUpload = useCallback(async () => {
        dispatch(setLoader(true));
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', blob, 'recording.webm');

        try {
            const videoResponse = await postDataAPI('aws/videoUpload', formData);
            const videoUrl = videoResponse.data.data.videoUrl;
            return videoUrl
        } catch (error) {
            dispatch(setLoader(false));
            console.error('Error uploading video and thumbnail:', error);
        } finally {
            dispatch(setLoader(false));
        }
    }, [recordedChunks, dispatch]);

    const onAdd = async (saveType) => {
        dispatch(clearAlerts())
        if (!title) {
            dispatch(setErrorAlert("title is required"))
            return
        }

        let videoUrl = videoURL
        if (!isEdit) {
            videoUrl = await handleUpload()
        }

        if (!videoUrl) {
            return
        }
        const payload = { link: videoUrl };
        payload.saveType = saveType
        payload.title = title
        payload.time = timer
        payload.filter = filter
        let previosUrlVar = previosUrl
        dispatch(add_video_message_thunk({ videoMessage: payload, previosUrl: previosUrlVar, token }));
        // const response = await postDataAPI(`user/addVideoMessage`, { videoMessage: payload }, token)
        // updateAddedData(response.data);
        setVideoURL(null)
        videoRef.current = null;
        setTitle("")
        setRecordedChunks([]);
        setShowWebcam(false)
        setIsRecording(false)
        setIsPlaying(false)
        setTimer(0)
        setIsEdit(false)
        // dispatch(clearAlerts())
        // dispatch(setSuccessAlert(response.data.message))

        // onClear();

    };

    const onEdit = () => {
        setOverlayVisible(false);
        setIsEdit(true)
        setVideoURL(link)
        setTitle(titleState)
        setTimer(timerBackend)
    }

    const onDelete = async () => {
        dispatch(delete_video_message_thunk({ link, token }));
        setOverlayVisible(false);
    }

    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlayVideoMessage') {
            setOverlayVisible(false);
        }
    };

    const handlePublishClick = () => {
        dispatch(clearAlerts())
        dispatch(update_save_type_thunk({ link, saveType, token }));

        setOverlayVisible(false);
    }

    const handleFilterChange = (e) => {
        if (e.target.checked) {
            setFilter(e.target.value); // set the selected filter
        }
    };

    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px]   flex flex-col justify-start items-center relative z-[0]">
                {isOverlayVisible && (
                    <div
                        id="overlayVideoMessage"
                        className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
                        onClick={handleOverlayClick}
                    >
                        <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]">
                            <p className="cursor-pointer " onClick={() => onEdit()}>Edit</p>
                            <p className="cursor-pointer " onClick={() => onDelete()}>Delete</p>
                            <p className="cursor-pointer " onClick={() => handlePublishClick()}>{saveType === 'save-as-draft' ? 'publish' : 'unpublish'}</p>
                            <p className="cursor-pointer " onClick={() => setOverlayVisible(false)}>Cancel</p>
                        </div>
                    </div>
                )}
                <div className='mt-[50px] w-full px-4 space-y-[24px]'>

                    <div className='  flex w-full justify-between text-white'>
                        <p onClick={() => navigate(-1)} className='text-white cursor-pointer' style={{ fontSize: '12px' }}>Video message</p>

                        {/* <input className='text-[#696974]' style={{ fontSize: '12px' }} placeholder='Add a title' /> */}
                        <p onClick={() => navigate(-1)} className='text-white cursor-pointer' style={{ fontSize: '12px' }}>Go Back</p>
                    </div>
                    <div>

                        <DizeeInput
                            placeholder={"Add a title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                {
                    !videoURL && (
                        <div className='w-full h-full my-[50px] justify-center items-center flex'>
                            {showWebcam ? (
                                <>
                                    <div className="w-[350px] h-[350px]   rounded-full cursor-pointer flex justify-center items-center relative overflow-hidden">

                                        <Webcam audio={true} ref={webcamRef} style={{ filter: filter }} onUserMedia={() => {
                                            dispatch(setLoader(false))
                                            setWebcamReady(true)
                                        }

                                        } className="absolute w-full h-full object-cover rounded-full" />
                                    </div>
                                </>
                            ) : (
                                <div className="w-[350px] h-[350px] border border-white rounded-full cursor-pointer flex justify-center items-center relative overflow-hidden" onClick={() => {
                                    setShowWebcam(true)
                                    dispatch(setLoader(true))
                                }}>

                                    <button className='text-white' >Use Recording</button>
                                </div>
                            )}
                        </div>
                    )
                }

                {
                    !showWebcam && !videoURL && (
                        // <div className='w-full flex items-center mb-[60px] justify-center flex-row'>
                        //     <DotSvg width={6} height={6} color={'red'} className='mr-2' />
                        //     <button className='text-white cursor-pointer' onClick={handleStopRecording} style={{ fontSize: '12px' }}>record</button>
                        // </div>
                        <div className='mb-[60px]'>

                            <CommonComponents text={'record'} action={() => {
                                setShowWebcam(true)
                                dispatch(setLoader(true))
                            }} />
                        </div>
                    )
                }
                {showWebcam && webcamReady && !isRecording && (
                    <div className='mb-[30px]'>
                        <div className='w-full flex items-center mb-[30px] justify-center flex-row'>
                            <button className='text-white cursor-pointer' style={{ fontSize: '12px' }} onClick={handleStartRecording}>Click here to start recording</button>
                        </div>
                        <div className='text-white flex flex-col gap-y-[10px]'>
                            <h3>Select a filter for your video:</h3>
                            <div className='flex justify-between gap-x-[10px]'>
                                <label className='flex justify-center items-center gap-x-[5px]'>
                                    <input
                                        type="checkbox"
                                        value="brightness(1) contrast(1)"
                                        checked={filter === "brightness(1) contrast(1)"}
                                        onChange={handleFilterChange}
                                    />
                                    Default
                                </label>
                                <label className='flex justify-center items-center gap-x-[5px]'>
                                    <input
                                        type="checkbox"
                                        value="contrast(1.2) brightness(1.3)"
                                        checked={filter === "contrast(1.2) brightness(1.3)"}
                                        onChange={handleFilterChange}
                                    />
                                    High Contrast & Brightness
                                </label>
                                <label className='flex justify-center items-center gap-x-[5px]'>
                                    <input
                                        type="checkbox"
                                        value="sepia(0.5) contrast(1.2)"
                                        checked={filter === "sepia(0.5) contrast(1.2)"}
                                        onChange={handleFilterChange}
                                    />
                                    Sepia & Contrast
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {showWebcam && isRecording && (
                    <div className='mb-[60px] flex flex-col items-center justify-center gap-y-[15px]'>
                        <div className='mt-2 text-[12px] bg-[red] text-white px-4 py-1 rounded-md shadow-lg'>
                            <span className='font-bold'>{formatTime(timer)}</span>
                        </div>
                        <div className='w-full flex items-baseline  justify-center flex-row gap-[36px]'>

                            <button className='text-white cursor-pointer' onClick={handleStopRecording} style={{ fontSize: '12px' }}>stop</button>
                            {/* <div className='w-full flex items-center  justify-center flex-row'>
                                <DotSvg width={6} height={6} color={'red'} className='mr-2' />
                                <button className='text-white cursor-pointer' onClick={handleStopRecording} style={{ fontSize: '12px' }}>recording</button>
                            </div> */}
                            <CommonComponents text={'recording'} action={null} />

                        </div>

                    </div>
                )}

                {videoURL && (
                    <div className='w-full h-full my-[50px] justify-center items-center flex'>
                        <div className="w-[350px] h-[350px]  rounded-full cursor-pointer flex justify-center items-center relative overflow-hidden">
                            <video ref={videoRef} src={videoURL} style={{ filter: filter }} className="object-cover w-full h-full" onEnded={handleVideoEnded} />
                            <button
                                onClick={handlePlayPause}
                                className="absolute inset-0 flex justify-center items-center text-white text-lg"
                            >
                                {isPlaying ? '' : <PlayCircle className="h-[40px] w-[40px]" />}
                            </button>
                        </div>

                    </div>

                )}
                {videoURL && (
                    <div className='flex gap-x-4 mb-[60px]'>
                        <button className='text-white' onClick={async () => {
                            onSaveClick();
                            // await handleUpload()
                        }}
                        >Save</button>
                        <CommonComponents text={'re record'} action={handleRemoveVideo} />
                        {/* <div className='w-full flex items-center justify-center flex-row'>
                            <DotSvg width={6} height={6} color={'red'} className='mr-2' />
                            <button className='text-white cursor-pointer' onClick={handleRemoveVideo} style={{ fontSize: '12px' }}>Re-record</button>
                        </div> */}
                    </div>
                )}

                {videoMessage?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                    <div className='p-4 pb-[20px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                        <div className='items-center flex flex-row text-white w-full'>
                            <p>Added video messages</p>
                        </div>
                    </div>
                    {
                        videoMessage?.length > 0 && videoMessage?.map((item, index) => (
                            <div key={index} className='w-full  '>
                                <Card photo={item.link} title={item.title} saveType={item.saveType} setOverlayVisible={setOverlayVisible} setSaveType={setSaveType} setLink={setLink} setTitleState={setTitleState} timeBackend={item.time} setTimerBackend={setTimerBackend} item={item} />
                            </div>
                        ))
                    }
                </div>}

            </div>
            <ModalSaveVideo
                title="Save video"
                isOpen={activedTab}
                onClose={onCloseModal}
                options={videoMessageOpts}
                onAdd={onAdd}
            />

        </LayoutHeader>
    );
}

