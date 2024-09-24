import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCustomLinkThunk, } from '../../../store/addsection/addsectionThunk';
import { clearAlerts } from '../../../store/alert/alertSlice';
import { updateImage, updateLink, updatePreviousUrl, updateSection, updateTitle } from '../../../store/customlinkData/customlinkDataSlice';

export default function CustomLinkOverlay({ setOverlayVisible, previousUrl, itemForBackend }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleEditClick = () => {
        dispatch(updateTitle(itemForBackend.title));
        dispatch(updateImage(itemForBackend.image));
        dispatch(updateLink(itemForBackend.links[0].url));
        dispatch(updateSection(itemForBackend.section));
        dispatch(updatePreviousUrl(itemForBackend.links[0].url));
        setOverlayVisible(false);
    };
    const handleDeleteClick = () => {
        dispatch(clearAlerts());
        dispatch(deleteCustomLinkThunk({ token: token, link: previousUrl }));
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
