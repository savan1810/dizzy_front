import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCustomLinkSectionThunk } from '../../../store/addsection/addsectionThunk';
import { clearAlerts } from '../../../store/alert/alertSlice';

export default function CustomSectionOverlay({ setOverlayVisible, previousUrl, itemForBackend, setTitle, setPreviousUrl }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleEditClick = () => {
        setTitle(itemForBackend.title);
        setPreviousUrl(itemForBackend.title);
        setOverlayVisible(false);
        // dispatch(deleteEventThunk({ token: token, link: linkForBackend }));
        // setOverlayVisible(false);
    };
    const handleDeleteClick = () => {
        dispatch(clearAlerts());
        dispatch(deleteCustomLinkSectionThunk({ token: token, title: previousUrl }));
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
