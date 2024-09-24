import React, { useState, useEffect } from 'react';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import searchImg from '../../../../../assets/images/components/search.png';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import MusicCard from '../../../../../components/AddSection/Music/MusicCard';
import AddedMusicCard from '../../../../../components/AddSection/Music/AddedMusicCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMusicThunk, searchMusicForReleaseThunk } from '../../../../../store/addsection/addsectionThunk';
import { clearAlerts } from '../../../../../store/alert/alertSlice';
import { ClipLoader } from 'react-spinners';
import { clearSearchMusic } from '../../../../../store/addsection/addsectionSlice';
import MusicOverlay from '../../../../../components/AddSection/Music/MusicOverlay';

export default function SearchForRelease() {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const musicLoading = useSelector((state) => state.addsection.musicLoading);
    const searchMusic = useSelector((state) => state.addsection.searchMusic);
    const music = useSelector((state) => state.addsection.music);
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const [avtarForBackend, setAvatarForBackend] = useState('');

    useEffect(() => {
        dispatch(clearAlerts())
        dispatch(getMusicThunk({ token }))
    }, [dispatch, token])

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
        dispatch(searchMusicForReleaseThunk({ token: token, search: debouncedSearch }));
        // }
    }, [debouncedSearch, dispatch, token]);


    return (
        <LayoutHeader>
            <div className="w-[390px] h-[90vh] bg-black flex flex-col  items-center relative">
                {/* first div */}
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Search for a release</p>
                    <Link to="/add-section/add-music">
                        <p className='text-white cursor-pointer' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
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
                                const isExist = music.some(
                                    (song) => song.id === item.songstats_track_id
                                );
                                return (
                                    <MusicCard
                                        key={index}
                                        title={item.title}
                                        avatar={item?.avatar}
                                        artists={item?.artists[0]?.name}
                                        item={item}
                                        isExist={isExist}
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
                                <AddedMusicCard
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

            {isOverlayVisible && <MusicOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}
        </LayoutHeader>
    );
}
