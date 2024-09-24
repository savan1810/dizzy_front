import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { setFocusEvent, setFocusMusic } from '../../../../store/focuspage/focuspageSlice';
import { updateContentLink, updateEventDate, updateEventTime, updateLink, updateLocation, updateVenue } from '../../../../store/focuseventdata/focuseventdataSlice';

export default function FocusEventOverlay({ isOverlayVisible, setOverlayVisible, avtarForBackend, itemForBackend }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector((state) => state.focuspage.event?.event);
    const eventData = useSelector((state) => state.focuspage.event);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleEditClick = () => {
        dispatch(updateLink(event[0]?.link))
        dispatch(updateLocation(event[0]?.location))
        dispatch(updateVenue(event[0]?.venue))
        dispatch(updateEventDate(event[0]?.date))
        dispatch(updateContentLink(event[0]?.contentLink))
        dispatch(updateEventTime(event[0]?.time))
        setOverlayVisible(false);
    }

    const handleDeleteClick = () => {
        dispatch(clearAlerts());

        if (eventData?.type === "single") {

            dispatch(setFocusEvent({ event: null }));
        }
        else {
            const updatedData = event.filter((item) => {
                return item.link !== itemForBackend?.link
            });
            dispatch(setFocusEvent({ event: updatedData }));
        }
        // dispatch(deleteMusicThunk({ token: token, avatar: avtarForBackend }));
        setOverlayVisible(false);
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>
                <p className="cursor-pointer pb-[10px]" onClick={() => handleEditClick()}>edit</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => handleDeleteClick()}>delete</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => setOverlayVisible(false)}>Cancel</p>
            </div>
        </div>
    )
}
