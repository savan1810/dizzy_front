import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { setFocusEvent, setFocusMusic, setFocusNewsletter, setFocusProduct } from '../../../../store/focuspage/focuspageSlice';
import { updateContentLink, updateEventDate, updateEventTime, updateLink, updateLocation, updateVenue } from '../../../../store/focuseventdata/focuseventdataSlice';

export default function FocusNewsOverlay({ isOverlayVisible, setOverlayVisible, setTitle, setLink, setNewsletterType, setContent, itemForBackend }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newsletter = useSelector((state) => state.focuspage.newsletter?.newsletter);
    const newsletterData = useSelector((state) => state.focuspage.newsletter);

    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleEditClick = () => {
        setTitle(newsletter[0]?.title)
        setNewsletterType(newsletter[0]?.newsletterType)
        setContent(newsletter[0]?.content)
        setOverlayVisible(false);
    }

    const handleDeleteClick = () => {
        dispatch(clearAlerts());
        if (newsletterData?.type === "single") {

            dispatch(setFocusNewsletter({ newsletter: null }));

        }
        else {
            const updatedData = newsletter.filter((item) => {
                return item.title !== itemForBackend?.title
            });
            dispatch(setFocusNewsletter({ newsletter: updatedData }));
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
