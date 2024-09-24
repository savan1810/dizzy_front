import React from 'react'
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import RedirectCard from '../../../../components/More/RedirectCard';

export default function VideoAnalytics() {
    const navigate = useNavigate();
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px]  flex w-full justify-between'>
                    <p className='text-white'>Video analytics</p>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <p className='text-[red] cursor-pointer'>Export data</p>
                        <p onClick={() => navigate('/more/analytics')} className='text-white cursor-pointer'>Go Back</p>
                    </div>
                </div>
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Total clicks (all time)</p>
                    <p className='text-white'>Filter</p>
                </div>
                <div className='px-4 my-[50px] flex flex-col gap-y-[38px] w-full '>
                    <div className='flex justify-between items-center'>
                        <p className='text-white'>All video</p>
                        <p className='text-white'>90,000</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-white'>Video 1</p>
                        <p className='text-white'>40,000</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-white'>Video 2</p>
                        <p className='text-white'>30,000</p>
                    </div>
                </div>
            </div>
        </LayoutHeader>
    )
}
