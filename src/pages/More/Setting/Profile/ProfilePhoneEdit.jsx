import React from 'react'
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';

export default function ProfilePhoneEdit() {
    const navigate = useNavigate();

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col gap-y-[125px] justify-start items-center relative z-[0] text-white">
                <div className='px-4 mt-[50px] flex w-full justify-between'>
                    <p className='text-white'>Profile</p>
                    <div className='flex gap-[20px]'>
                        <button className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/more/setting/profile')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>

                <div className='flex flex-col items-start w-full px-4 gap-y-[52px]'>
                    <button onClick={() => navigate('/more/setting/old-phone')}>Change phone number</button>
                    <button onClick={() => navigate('/more/setting/delegate-access')}>Manage delegate access</button>
                    <button>Redirect link</button>
                </div>
            </div>
        </LayoutHeader>
    )
}
