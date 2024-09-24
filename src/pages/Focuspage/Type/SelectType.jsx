import React from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../layout/LayoutHeader';
import RedirectCard from '../../../components/Focuspage/RedirectCard';

export default function SelectType() {
    const navigate = useNavigate();

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select focus page type</p>
                    <button onClick={() => navigate('/focus-page')} className='text-white cursor-pointer'>Go back</button>
                </div>
                <RedirectCard txt="Music" link="/focus-page/music-type" />

                <RedirectCard txt="Product" dotimgclss={false} link="/focus-page/product-type" />
                <RedirectCard txt="Event" dotimgclss={false} link={"/focus-page/event-type"} />
                <RedirectCard txt="Newsletter" dotimgclss={false} link={"/focus-page/newsletter-type"} />
            </div>
        </LayoutHeader>
    );
}
