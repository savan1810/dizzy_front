import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function MusicOverlay(props) {
    const navigate = useNavigate();
    const { setOverlay, onMoveUp, onMoveDown, onEdit,EditSectionName ,type} = props
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            setOverlay(false);
        }
    };

    console.log('type',type)

    const [sectionTitle,setSectionTitle] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionTitle(
            value
        );
    };

    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>
                <div className="cursor-pointer pb-[10px] flex justify-between items-center" >
                    <span>Edit Section Title</span>
                    <input
                        type="text"
                        value={sectionTitle}
                        onChange={handleChange}
                        className="ml-2 bg-transparent border-none focus:ring-0 focus:outline-none"
                        placeholder=""
                    />
                </div>
                <p className="cursor-pointer pb-[10px]" onClick={onMoveUp}>Move up</p>
                <p className="cursor-pointer pb-[10px]" onClick={onMoveDown}>Move down</p>
                <p className="cursor-pointer pb-[10px]" onClick={() => navigate(onEdit)}>Edit</p>
                <p className="cursor-pointer pb-[10px]">Archive</p>
                {/* <p className="cursor-pointer pb-[10px]" onClick={() => setOverlay(false)}>Cancel</p> */}
                <p className="cursor-pointer pb-[10px]" onClick={() => EditSectionName(type,sectionTitle)}>Done</p>
            </div>
        </div>
    )
}
