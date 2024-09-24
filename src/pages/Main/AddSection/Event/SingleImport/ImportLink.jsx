import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import CopyLink from '../../../../../svg/CopyLink';
import { DizeeInput2, formatDate } from '../../../../../components/DixeeInput2';
import { postDataAPI } from '../../../../../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import { clearAlerts, setErrorAlert } from '../../../../../store/alert/alertSlice';
import { addEventToSectionThunk, getEventThunk, getMusicThunk } from '../../../../../store/addsection/addsectionThunk';
import { useDispatch, useSelector } from 'react-redux';
import AddedMusicCard from '../../../../../components/AddSection/Music/AddedMusicCard';
import ManualAddMusic from '../../../../../components/AddSection/Music/ManualAddMusic';
import MusicOverlay from '../../../../../components/AddSection/Music/MusicOverlay';
import Bandsintown from '../../../../../svg/EventPlatform/Bandsintown';
import Ticketmaster from '../../../../../svg/EventPlatform/Ticketmaster';
import Songkick from '../../../../../svg/EventPlatform/Songkick';
import EventOverlay from '../../../../../components/AddSection/Event/EventOverlay';
import AddedEvent from '../../../../../components/AddSection/Event/AddedEvent';
import AddSinglEvent from '../../../../../components/AddSection/Event/AddSinglEvent';
import { clearEvent, updateLink, updateLocation, updateVenue } from '../../../../../store/eventData/eventdataSlice';
import { uploadImage } from '../../../../../utils/upload';
import ImageSelectionCard from '../../../../../components/ImageSelectionCard';

const componentMapping = {
    bandsintown: <Bandsintown />,
    seated: <Songkick />,
    songkick: <Songkick />,
};

export default function ImportLink() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { iconKey, name, selectedDate: initialDate } = location.state;
    const IconComponent = componentMapping[iconKey];
    // const [link, setLink] = useState('');
    // const [evntLocation, setEventLocation] = useState('');
    // const [eventVenue, setEventVenue] = useState('');
    // const [eventDate, setEventDate] = useState(initialDate || '');
    const [formattedDate, setFormattedDate] = useState('');
    const [data, setData] = useState({});
    const token = localStorage.getItem('dizeeToken');
    const event = useSelector((state) => state.addsection.event);
    const [isExist, setIsExist] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [linkForBackend, setLinkForBackend] = useState('');
    const [itemForBackend, setItemForBackend] = useState({});
    const link = useSelector((state) => state.eventdata.link);
    const evntLocation = useSelector((state) => state.eventdata.location);
    const eventVenue = useSelector((state) => state.eventdata.venue);
    const eventDate = useSelector((state) => state.eventdata.date);
    const previousUrl = useSelector((state) => state.eventdata.previousUrl);
    const previousSource = useSelector((state) => state.eventdata.previousSource);
    const type = useSelector((state) => state.eventdata.type);

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);



    useEffect(() => {
        if (eventDate) {
            setFormattedDate(formatDate(eventDate));
        }
    }, [eventDate]);

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getMusicThunk({ token }));
    }, [dispatch, token]);

    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         setDebouncedLink(link);
    //     }, 500); // Adjust the delay as needed

    //     return () => {
    //         clearTimeout(handler);
    //     };
    // }, [link]);

    // useEffect(() => {
    //     if (debouncedLink.length < 6) {
    //         setData({});
    //         setIsExist(false);
    //         return;
    //     }

    //     const fetchMusicData = async () => {
    //         setLoading(true);
    //         try {
    //             dispatch(clearAlerts());
    //             const response = await postDataAPI('user/getUrlMetadata', { url: debouncedLink }, token);
    //             console.log('response.data.data?.provider?.toLowerCase()', response.data.data?.response?.provider?.toLowerCase())
    //             console.log('iconKey', iconKey)
    //             if (response.data.data.response.title === 'Page not available' || response.data.data?.response?.provider?.toLowerCase() !== iconKey) {
    //                 setData({});
    //                 setIsExist(false);
    //                 dispatch(setErrorAlert("Please enter a valid link"));
    //             } else {
    //                 console.log('response.data.data.response', response.data.data.response)
    //                 setData(response.data.data.response);
    //                 setIsExist(filterLink(debouncedLink));
    //             }
    //         } catch (err) {
    //             dispatch(setErrorAlert("Please enter a valid link"));
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchMusicData();
    // }, [debouncedLink, dispatch, token]);

    const filterLink = (link) => {
        if (event?.length > 0) {
            for (let m of event) {
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


    const handleAddSingleEvent =async () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }
        if (!link || !eventDate || !formattedDate || !eventVenue ||(!selectedImage && !imagePreview) || !evntLocation) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        let url = '';
        if (selectedImage) {
            url = await uploadImage(selectedImage)
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
        }
        // dispatch(setLoader(true));
        let payload = {
            type: type ? type : 1,
            location: evntLocation,
            venue: eventVenue,
            date: formattedDate,
            image: url ? url : imagePreview,
            links: [
                {
                    source: previousSource ? previousSource : iconKey,
                    url: link
                }
            ]
        };
        dispatch(clearAlerts());
        dispatch(clearEvent());
        setFormattedDate('');
        dispatch(addEventToSectionThunk({ token: token, payload: payload, previousUrl: previousUrl })).then(() => {
            dispatch(getEventThunk({ token: token }));
            setSelectedImage(null)
            setImagePreview(null)
            // navigate('/add-section/import-single-event');
        });
    };

    const handleGoBack = () => {
        dispatch(clearEvent());
        navigate('/add-section/import-single-event');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] h-[80vh] bg-black flex flex-col items-center relative">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        {IconComponent}
                        <span className='text-white'>{name}</span>
                    </div>
                    <div className='flex gap-[30px]'>
                        <button onClick={handleAddSingleEvent} className='text-white cursor-pointer'>Confirm</button>
                        <button onClick={handleGoBack} className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</button>
                    </div>
                </div>
                <div className='flex w-full flex-col gap-y-[50px] '>

                    <div className="flex flex-col justify-center items-center w-full ">
                        <div className='p-4 flex w-full justify-between items-center ' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter a link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => dispatch(updateLink(e.target.value))}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add location"
                                    className="dizee-input w-full"
                                    value={evntLocation}
                                    onChange={(e) => dispatch(updateLocation(e.target.value))}

                                />
                            </div>
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Select a venue"
                                    className="dizee-input w-full"
                                    value={eventVenue}
                                    onChange={(e) => dispatch(updateVenue(e.target.value))}

                                />
                            </div>
                        </div>
                        {!formattedDate ?
                            <div className='p-4 flex w-full justify-between items-center' >
                                <div className='items-center flex flex-row text-white w-full'>
                                    <button className='text-white text-[12px]' style={{ fontSize: '12px' }} onClick={(e) => {
                                        e.preventDefault()
                                        navigate('/add-section/date-picker', { state: { route: '/add-section/single-import-link', iconKey: iconKey, name: name } })
                                    }
                                    }
                                    >Select a date</button>
                                </div>
                            </div>
                            :
                            <div className="flex flex-col justify-center items-center w-full ">
                                <div className='p-4 flex w-full justify-between items-center ' style={{ fontSize: '12px' }}>
                                    <div className='items-center flex flex-row text-white'>
                                        <button className='text-white text-[12px]' style={{ fontSize: '12px' }} onClick={(e) => {
                                            e.preventDefault()
                                            navigate('/add-section/date-picker', { state: { route: '/add-section/single-import-link', iconKey: iconKey, name: name } })
                                        }
                                        }
                                        >Change date</button>
                                    </div>
                                    <div className=''>
                                        <p className='text-white text-[12px]'>{formattedDate}</p>
                                    </div>
                                </div>
                            </div>

                        }
                        <ImageSelectionCard
                            txt="Add cover image"
                            dotimgclss={false}
                            onImageChange={handleImageChange}
                            imagePreview={imagePreview}
                            resetImage={resetImage}
                        />
                        {/* {
                            loading ? <ClipLoader
                                color="white"
                                loading={true}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> :
                                Object.keys(data).length > 0 && */}
                        {/* <AddSinglEvent key={0} title={data.title} avatar={data?.image} artists={data?.description} data={data} isExist={isExist} name={name} setLink={setLink} setData={setData} /> */}
                        {/* } */}
                    </div>

                    {event?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added event</p>
                            </div>
                        </div>
                        {
                            event?.length > 0 && event?.map((item, index) => <AddedEvent key={index} item={item} setLinkForBackend={setLinkForBackend} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <EventOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} linkForBackend={linkForBackend} itemForBackend={itemForBackend} setImagePreview={setImagePreview} setSelectedImage={setSelectedImage}/>}
        </LayoutHeader >
    );
}
