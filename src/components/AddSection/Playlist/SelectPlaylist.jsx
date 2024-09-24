import React from 'react';
import { useNavigate } from 'react-router-dom';
import CrossArrow from '../../../svg/CrossArrow';
import Spotify from '../../../svg/MusicPlatform/Spotify';
import AppleMusic from '../../../svg/MusicPlatform/AppleMusic';

const componentMapping = {
    spotify: <Spotify />,
    apple_music: <AppleMusic />,
};

export default function SelectPlaylist({ txt, value, selected, onSelect }) {
    const navigate = useNavigate();
    const DynamicComponent = componentMapping[value];
    const handleClick = () => {
        navigate('/add-section/add-playlist-link', { state: { iconKey: value, name: txt } });
    };
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center ' >
            <div className='flex items-center gap-x-[16px]'>
                {DynamicComponent}
                <span className='text-white'>{txt}</span>
            </div>
            <div onClick={handleClick}>
                <CrossArrow className='cursor-pointer text-white' />
            </div>
        </div>
    );
}
