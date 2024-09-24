import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { DizeeInput2, formatDate } from '../../../../../components/DixeeInput2';
import CopyLink from '../../../../../svg/CopyLink';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import FocusAddedEvent from '../../../../../components/Focuspage/Type/Event/FocusAddedEvent';
import { clearFocusSection, setFocusEvent } from '../../../../../store/focuspage/focuspageSlice';
import { clearEvent, updateContentLink, updateEventTime, updateLink, updateLocation, updateVenue } from '../../../../../store/focuseventdata/focuseventdataSlice';
import { addEventForFocusThunk } from '../../../../../store/focuspage/focuspageThunk';
import { uploadImage } from '../../../../../utils/upload';
import FocusEventOverlay from '../../../../../components/Focuspage/Type/Event/FocusEventOverlay';

export default function Step6() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();

    const event = useSelector((state) => state.focuspage.event);

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [linkForBackend, setLinkForBackend] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [itemForBackend, setItemForBackend] = useState({});

    const link = useSelector((state) => state.focuseventdata.link);
    const contentLink = useSelector((state) => state.focuseventdata.contentLink);
    const evntLocation = useSelector((state) => state.focuseventdata.location);
    const eventVenue = useSelector((state) => state.focuseventdata.venue);
    const eventDate = useSelector((state) => state.focuseventdata.date);
    const eventTime = useSelector((state) => state.focuseventdata.time);
    const previousUrl = useSelector((state) => state.focuseventdata.previousUrl);
    const previousSource = useSelector((state) => state.focuseventdata.previousSource);
    const type = useSelector((state) => state.focuseventdata.type);

    useEffect(() => {
        if (eventDate) {
            setFormattedDate(formatDate(eventDate));
        }
    }, [eventDate]);

    useEffect(() => {
        dispatch(clearAlerts());
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

    const handleAddCustomEvent = () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }

        let updatedData = event?.event || [];

        if (event.type !== 'single' && previousUrl) {
            updatedData = updatedData.filter(item => {
                return item?.link !== previousUrl;
            });
        }

        if (!link || !eventDate || !formattedDate || !eventVenue || !evntLocation || !eventTime) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        // dispatch(setLoader(true));
        let payload = {
            link: link,
            contentLink: contentLink,
            location: evntLocation,
            venue: eventVenue,
            date: formattedDate,
            time: eventTime,

        };


        if (event?.type === 'single') {
            dispatch(setFocusEvent({ event: [payload] }))
        }
        else {
            updatedData = [...updatedData, payload];
            dispatch(setFocusEvent({ event: updatedData }));
        }
        dispatch(clearAlerts());
        dispatch(clearEvent());
        setFormattedDate('');

    };

    const handleGoBack = () => {
        dispatch(clearEvent());
        navigate('/add-section/add-event');
    };
    const handleAddEventFocus = async () => {


        let url = '';
        dispatch(setLoader(true));

        try {
            if (event.avatar) {
                url = await uploadImage(event.avatar);
                if (!url) {
                    dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return

                }

            }

            // Clone the event to avoid mutating the original object
            const dataCopy = { ...event };

            delete dataCopy.avatar;
            delete dataCopy.avatarPreview;
            dataCopy.avatar = url;
            dataCopy.headeractive = true


            dispatch(addEventForFocusThunk({ token: token, payload: dataCopy })).then((res) => {
                if (res.payload.status === 200) {
                    dispatch(clearFocusSection())
                    navigate("/focus-page");
                }
            });

        } catch (error) {
            console.error('Error uploading image or adding music:', error);
            // Optionally handle the error (e.g., show a notification)
        } finally {
            dispatch(setLoader(false));
        }

    }

    return (
        <LayoutHeader>
            <div className="w-[390px]  flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Event details</p>
                    <div className='flex gap-[20px]'>
                        {event && event?.event?.length > 0 && <button onClick={() => handleAddEventFocus()} className='text-white cursor-pointer' >Done</button>}
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
                        <div className='p-4 flex w-full justify-between items-center ' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter content upload  link (optional)"
                                    className="dizee-input w-full"
                                    value={contentLink}
                                    onChange={(e) => dispatch(updateContentLink(e.target.value))}
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
                                        navigate('/focus-page/event-type/date-picker', { state: { route: '/focus-page/event-type/step6' } })
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
                                            navigate('/focus-page/event-type/date-picker', { state: { route: '/focus-page/event-type/step6' } })
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
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add set time"
                                    className="dizee-input w-full"
                                    value={eventTime}
                                    onChange={(e) => dispatch(updateEventTime(e.target.value))}

                                />
                            </div>
                        </div>
                    </div>

                    {event && event?.event?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added event</p>
                            </div>
                        </div>
                        {
                            event && event?.event?.length > 0 && event?.event?.map((item, index) => <FocusAddedEvent key={index} item={item} setLinkForBackend={setLinkForBackend} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <FocusEventOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} itemForBackend={itemForBackend} />}
            {/* {isOverlayVisible && <EventOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} linkForBackend={linkForBackend} itemForBackend={itemForBackend} />} */}
        </LayoutHeader>
    );
}
