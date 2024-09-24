import React from 'react'
import RedirectCard from '../../components/More/RedirectCard'
import LayoutHeader from '../../layout/LayoutHeader'
import { useNavigate } from 'react-router';

export default function SelectOption() {
    const navigate = useNavigate();
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select an option</p>
                    <p onClick={() => navigate('/')} className='text-white cursor-pointer'>Learn more</p>
                </div>
                <RedirectCard txt="Settings" dotimgclss={false} link={"/more/setting"} />
                <RedirectCard txt="Analytics" dotimgclss={false} link={"/more/analytics"} />
            </div>
        </LayoutHeader>
    )
}
