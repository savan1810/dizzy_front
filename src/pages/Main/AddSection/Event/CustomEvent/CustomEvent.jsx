import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { DizeeInput2, formatDate } from '../../../../../components/DixeeInput2';
import CopyLink from '../../../../../svg/CopyLink';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import { addEventToSectionThunk, addVideoToSectionThunk, getEventThunk, getVideoThunk } from '../../../../../store/addsection/addsectionThunk';
import { clearEvent, updateLink, updateLocation, updateVenue,updateImage } from '../../../../../store/eventData/eventdataSlice';
import AddedEvent from '../../../../../components/AddSection/Event/AddedEvent';
import EventOverlay from '../../../../../components/AddSection/Event/EventOverlay';
import ImageSelectionCard from '../../../../../components/ImageSelectionCard';
import { uploadImage } from '../../../../../utils/upload';

export default function CustomEvent() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();

    const event = useSelector((state) => state.addsection.event);


    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [linkForBackend, setLinkForBackend] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
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
        dispatch(getEventThunk({ token }));
    }, [dispatch, token]);


    const filterLink = (link) => {
        if (event?.length > 0) {
            for (let m of event) {
                for (let musicLink of m.links) {
                    if (musicLink.url === link) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    const handleAddCustomEvent =async () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }
        if (!link || !eventDate || !formattedDate || (!selectedImage && !imagePreview) || !eventVenue || !evntLocation) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        // dispatch(setLoader(true));
        let url = '';
        if (selectedImage) {
            url = await uploadImage(selectedImage)
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
        }
        let payload = {
            type: type ? type : 2,
            location: evntLocation,
            venue: eventVenue,
            date: formattedDate,
            image: url ? url : imagePreview,
            links: [
                {
                    source: previousSource ? previousSource : 'custom',
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
        navigate('/add-section/add-event');
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
            <div className="w-[390px]  flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Custom event link</p>
                    <div className='flex gap-[30px]'>
                        <button onClick={handleAddCustomEvent} className='text-white cursor-pointer'>Confirm</button>
                        <button onClick={() => handleGoBack()} className='text-white cursor-pointer'>Go back</button>
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
                                        navigate('/add-section/date-picker', { state: { route: '/add-section/custom-event-link' } })
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
                                            navigate('/add-section/date-picker', { state: { route: '/add-section/custom-event-link' } })
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
        </LayoutHeader>
    );
}
