import React from 'react'
import { useNavigate } from 'react-router';

export default function SectionOverlay({ setSectionOverlay }) {
    const navigate = useNavigate();
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setSectionOverlay(false);
        }
    };


    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>
                <p className="cursor-pointer pb-[10px]" onClick={() => navigate(`/add-section/create-section`)}>Create new section</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => navigate(`/add-section/select-section`)}>Select existing section</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => setSectionOverlay(false)}>Cancel</p>
            </div>
        </div>
    )
}
