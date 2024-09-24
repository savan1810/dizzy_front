import React from 'react'
import LayoutHeader from '../../../layout/LayoutHeader'
import { useNavigate } from 'react-router';
import RedirectCard from '../../../components/More/RedirectCard';

export default function SettingOption() {
    const navigate = useNavigate();

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select an option</p>
                    <p onClick={() => navigate('/more')} className='text-white cursor-pointer'>Go back</p>
                </div>

                <RedirectCard txt="Profile" dotimgclss={false} link={"/more/setting/profile"} />
                <RedirectCard txt="Subscription" dotimgclss={false} link={"/more/setting/subscription"} />
                <RedirectCard txt="Security and privacy" dotimgclss={false} />

            </div>
        </LayoutHeader>
    )
}
