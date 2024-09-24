import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { maxLength } from '../../../../components/DixeeInput2';

export default function MusicPlatformData() {
    const { title } = useParams(); // Track title from the URL
    const location = useLocation();
    const trackData = location.state?.trackData; // Receiving the track data
    const navigate = useNavigate();

    // Determine if showing overall data or specific track data
    const isOverallData = title === "all";
    const trackPlatforms = isOverallData ? trackData : trackData && trackData[title]; // Get platforms for "all" or specific track

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>{isOverallData ? "All Music Platforms" : title}</p>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <p className='text-[red] cursor-pointer'>Export data</p>
                        <p onClick={() => navigate('/more/analytics/music')} className='text-white cursor-pointer'>Go Back</p>
                    </div>
                </div>

                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Total clicks (all time)</p>
                    <p className='text-white cursor-pointer' onClick={() => navigate('/more/analytics/filter', { state: { path: '/more/analytics/playlist' } })}>Filter</p>
                </div>

                <div className='px-4 my-[50px] flex flex-col gap-y-[38px] w-full'>
                    {/* Display platform data for either "all" platforms or a specific track */}
                    {trackPlatforms ? (
                        Object.entries(trackPlatforms).map(([platformName, clicks], platformIndex) => (
                            <div className='flex justify-between items-center' key={platformIndex}>
                                <p className='text-white capitalize'>{platformName}</p> {/* Platform name like spotify, amazon */}
                                <p className='text-white'>{clicks}</p> {/* Number of clicks */}
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>No data available for this {isOverallData ? "platforms" : "track"}.</p>
                    )}
                </div>
            </div>
        </LayoutHeader>
    );
}
