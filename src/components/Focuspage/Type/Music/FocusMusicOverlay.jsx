import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts } from '../../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { setFocusMusic } from '../../../../store/focuspage/focuspageSlice';

export default function FocusMusicOverlay({ isOverlayVisible, setOverlayVisible, avtarForBackend }) {
    const token = localStorage.getItem('dizeeToken');
    const music = useSelector((state) => state.focuspage.music);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlayVisible(false);
        }
    };

    const handleDeleteClick = () => {
        dispatch(clearAlerts());

        if (music.type === 'single') {
            // If it's a single music item, clear the music state
            dispatch(setFocusMusic({ music: null }));
        } else {
            // If there are multiple music items, find and remove the one with the matching avatar
            const updatedMusic = music.music.filter(musicItem => musicItem.avatar !== avtarForBackend);
            dispatch(setFocusMusic({ music: updatedMusic }));
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
                <p className="cursor-pointer pb-[10px]" >Platform display</p>
                {/* <p className="cursor-pointer pb-[10px]" onClick={() => handleDeleteClick()}>Change music</p> */}
                <p className="cursor-pointer pb-[10px]" onClick={() => handleDeleteClick()}>delete</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => setOverlayVisible(false)}>Cancel</p>
            </div>
        </div>
    )
}
