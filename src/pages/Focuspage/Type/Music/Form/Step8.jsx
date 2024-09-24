import React, { useState, useEffect } from 'react';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import searchImg from '../../../../../assets/images/components/search.png';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMusicForReleaseThunk } from '../../../../../store/addsection/addsectionThunk';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import { ClipLoader } from 'react-spinners';
import FocusAddedMusicCard from '../../../../../components/Focuspage/Type/Music/FocusAddedMusicCard';
import FocusMusicCard from '../../../../../components/Focuspage/Type/Music/FocusMusicCard';
import FocusMusicOverlay from '../../../../../components/Focuspage/Type/Music/FocusMusicOverlay';
import { clearFocusSection, clearSearchMusic } from '../../../../../store/focuspage/focuspageSlice';
import { addMusicForFocusThunk, searchMusicForReleaseFocusThunk } from '../../../../../store/focuspage/focuspageThunk';
import { uploadImage } from '../../../../../utils/upload';

export default function Step8() {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const musicLoading = useSelector((state) => state.focuspage.musicLoading);
    const searchMusic = useSelector((state) => state.focuspage.searchMusic);


    const music = useSelector((state) => state.focuspage.music?.music);
    const musicData = useSelector((state) => state.focuspage.music);
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const [avtarForBackend, setAvatarForBackend] = useState('');



    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // Adjust the delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {

        if (debouncedSearch.length < 6) {
            dispatch(clearSearchMusic());
            return;
        };
        dispatch(clearAlerts());
        dispatch(searchMusicForReleaseFocusThunk({ token: token, search: debouncedSearch }));
        // }
    }, [debouncedSearch, dispatch, token]);

    const handleAddMusicForFocus = async () => {

        if (music?.length === 0) {
            dispatch(setErrorAlert("Please add data to the section"));
            return
        }
        let url = '';
        dispatch(setLoader(true));
        try {
            if (musicData.avatar) {
                url = await uploadImage(musicData.avatar);
                if (!url) {
                    dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return

                }
            }

            // Clone the musicData to avoid mutating the original object
            const musicDataCopy = { ...musicData };

            delete musicDataCopy.avatar;
            delete musicDataCopy.avatarPreview;
            musicDataCopy.avatar = url;
            musicDataCopy.headeractive = true

            const res = dispatch(addMusicForFocusThunk({ token, payload: musicDataCopy })).then((res) => {
                if (res.payload.status === 200) {
                    dispatch(clearFocusSection());
                    navigate("/focus-page");
                }
            });

        } catch (error) {
            console.error('Error uploading image or adding music:', error);
            // Optionally handle the error (e.g., show a notification)
        } finally {
            dispatch(setLoader(false));
        }
    }


    return (
        <LayoutHeader>
            <div className="w-[390px] h-[90vh] bg-black flex flex-col  items-center relative">
                {/* first div */}
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Search for a release</p>
                    <div className='flex justify-center items-center gap-4'>
                        <p className='text-white cursor-pointer' onClick={handleAddMusicForFocus} style={{ fontSize: '12px' }}>Done</p>
                        <Link to="/focus-page/music-type/step5">
                            <p className='text-white cursor-pointer' style={{ fontSize: '12px' }}>Go Back</p>
                        </Link>
                    </div>
                </div>
                {/* second div */}
                <div className='flex w-full flex-col gap-y-[50px] '>
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    placeholder="Search by song, album, URL, UPC or ISRC"
                                    className="dizee-input w-full"
                                    search={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <img src={searchImg} alt='sp' className='h-[12px] w-[12px] mx-1' />
                        </div>
                        {musicLoading ? (
                            <ClipLoader
                                color="white"
                                loading={true}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        ) : (
                            searchMusic?.length > 0 &&
                            searchMusic?.map((item, index) => {
                                // const isExist = music.some(
                                //     (song) => song.id === item.songstats_track_id
                                // );
                                return (
                                    <FocusMusicCard
                                        key={index}
                                        item={item}
                                    />
                                );
                            })
                        )}
                    </div>
                    {music?.length > 0 && (
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                                <div className='items-center flex flex-row text-white w-full'>
                                    <p>Added Music</p>
                                </div>
                            </div>
                            {music?.length > 0 && music?.map((item, index) => (
                                <FocusAddedMusicCard
                                    key={index}
                                    music={item}
                                    setAvatarForBackend={setAvatarForBackend}
                                    setOverlayVisible={setOverlayVisible}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isOverlayVisible && <FocusMusicOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}
        </LayoutHeader>
    );
}
