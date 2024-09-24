import React from 'react'
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import RedirectCard from '../../../../components/More/RedirectCard';

export default function FormAnalytics() {
    const navigate = useNavigate();
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px]  flex w-full justify-between'>
                    <p className='text-white'>Form analytics</p>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <p className='text-[red] cursor-pointer'>Export data</p>
                        <p onClick={() => navigate('/more/analytics')} className='text-white cursor-pointer'>Go Back</p>
                    </div>
                </div>
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a form</p>
                </div>
                <RedirectCard txt="Forms" link="/more/analytics/forms" dotimgclss={false} />
                <RedirectCard txt="Polls" link="/more/analytics/polls" dotimgclss={false} />
            </div>
        </LayoutHeader>
    )
}
