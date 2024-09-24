import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../../../utils/fetchData';
import { setErrorAlert } from '../../../../store/alert/alertSlice';
import { maxLength } from '../../../../components/DixeeInput2';
import CrossArrow from '../../../../svg/CrossArrow';

export default function MusicAnalytics() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [totalClicks, setTotalClicks] = useState(null);
    const [allMusicData, setAllMusicData] = useState(null); // For overall "all" music data
    const [trackData, setTrackData] = useState(null); // For track-specific data
    const filter = useSelector((state) => state.setting.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataAPI(`analytics/get-music-analytics?filter=${filter}`, token);
                if (res?.data?.status === 200) {
                    const { all, tracks } = res?.data?.data; // Extract 'all' and 'tracks' from the response
                    setTotalClicks(res?.data?.data?.totalClicks); // Total clicks
                    setAllMusicData(all); // Overall clicks by platform
                    setTrackData(tracks); // Track-specific data
                }
            } catch (err) {
                dispatch(setErrorAlert(err.response?.data?.message || 'Error fetching data'));
            }
        };

        fetchData();
    }, [filter, dispatch, token]);

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Music Analytics</p>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <p className='text-[red] cursor-pointer'>Export data</p>
                        <p onClick={() => navigate('/more/analytics')} className='text-white cursor-pointer'>Go Back</p>
                    </div>
                </div>

                {/* Overall music analytics card */}
                <div className='p-4 py-6 flex w-full justify-between items-center'>
                    <div className='flex items-center'>
                        <span className='text-white'>All Music Platforms</span>
                    </div>
                    <button
                        onClick={() => {
                            navigate(`/more/analytics/music/all`, { state: { trackData: allMusicData } });
                        }}
                    >
                        <CrossArrow className='h-[14px] w-[14px] cursor-pointer' />
                    </button>
                </div>

                {/* Track-specific analytics */}
                {trackData && Object.keys(trackData).map((trackTitle, index) => (
                    <div className='p-4 py-6 flex w-full justify-between items-center' key={index}>
                        <div className='flex items-center'>
                            <span className='text-white'>{maxLength(trackTitle, 30)}</span>
                        </div>
                        <button
                            onClick={() => {
                                navigate(`/more/analytics/music/${trackTitle}`, { state: { trackData: trackData } });
                            }}
                        >
                            <CrossArrow className='h-[14px] w-[14px] cursor-pointer' />
                        </button>
                    </div>
                ))}
            </div>
        </LayoutHeader>
    );
}
