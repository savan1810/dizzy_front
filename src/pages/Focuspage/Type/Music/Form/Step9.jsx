import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setFocusMusic } from '../../../../../store/focuspage/focuspageSlice';
import { clearAlerts } from '../../../../../store/alert/alertSlice';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { MUSIC_PLATFORMS } from '../../../../../constants/constants';
import MusicPlatform from '../../../../../components/AddSection/Music/MusicPlatform';

export default function Step9() {
    const token = localStorage.getItem('dizeeToken');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { musicItem } = location.state;
    const music = useSelector((state) => state?.focuspage?.music?.music);

    const handleTogglePlatform = (platform) => {
        setSelectedPlatforms(prevSelected =>
            prevSelected.includes(platform)
                ? prevSelected?.filter(item => item !== platform)
                : [...prevSelected, platform]
        );
    };

    const handleAddMessage = () => {
        const selectedLinks = musicItem?.links?.filter(link => selectedPlatforms.includes(link.source)) || [];

        let newMusicItem = {
            id: musicItem?.songstats_track_id,
            avatar: musicItem?.avatar,
            title: musicItem?.title,
            artist: musicItem?.artists[0].name,
            links: selectedLinks
        };

        // Merge the new music item with the existing music array
        const updatedMusic = [...(music || []), newMusicItem];

        dispatch(clearAlerts());
        dispatch(setFocusMusic({ music: updatedMusic }));
        navigate("/focus-page/music-type/step6");
    }




    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a platform for display</p>
                    <button onClick={() => handleAddMessage()} className='text-white cursor-pointer'>Done</button>
                </div>
                {
                    MUSIC_PLATFORMS.map((music, musicIndex) => (
                        musicItem.links?.filter((i) => i.source === music.value).map((item, itemIndex) => {
                            return (
                                <MusicPlatform
                                    txt={music.label}
                                    key={`${musicIndex}-${musicIndex}`} // Ensure unique keys for each music
                                    selected={selectedPlatforms.includes(music.value)}
                                    onSelect={() => handleTogglePlatform(music.value)}
                                />
                            );
                        })
                    ))
                }


            </div>
        </LayoutHeader>
    );
}
