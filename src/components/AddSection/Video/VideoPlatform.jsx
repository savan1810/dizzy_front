import React from 'react';
import { useNavigate } from 'react-router-dom';
import CrossArrow from '../../../svg/CrossArrow';
import Spotify from '../../../svg/MusicPlatform/Spotify';
import AppleMusic from '../../../svg/MusicPlatform/AppleMusic';
import AmazonMusic from '../../../svg/MusicPlatform/AmazonMusic';
import SoundCloud from '../../../svg/MusicPlatform/SoundCloud';
import Tidal from '../../../svg/MusicPlatform/Tidal';
import Tiktok from '../../../svg/SocialFeedPlatform/Tiktok';
import Instagram from '../../../svg/SocialFeedPlatform/Instagram';
import Youtube from '../../../svg/SocialFeedPlatform/Youtube';
import Vimeo from '../../../svg/SocialFeedPlatform/Vimeo';

const componentMapping = {
    youtube: <Youtube />,
    vimeo: <Vimeo />
};

export default function VideoPlatform({ txt, value, selected, onSelect }) {
    const navigate = useNavigate();
    const DynamicComponent = componentMapping[value];
    const handleClick = () => {
        navigate('/add-section/add-video-link', { state: { iconKey: value, name: txt } });
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
