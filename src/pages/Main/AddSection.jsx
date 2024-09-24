import React from 'react'
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../../components/SelectionCard';
import LayoutHeader from '../../layout/LayoutHeader';

export default function AddSection() {
    const navigate = useNavigate();

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Add Selections</p>
                    <p onClick={() => navigate('/')} className='text-white cursor-pointer'>Go Back</p>
                </div>
                <SelectionCard txt="Video Message" link="/add-section/video-message" dotimgclss={true} />
                <SelectionCard txt="Music" link="/add-section/add-music" dotimgclss={false} />
                <SelectionCard txt="Video" dotimgclss={false} link="/add-section/add-video" />
                <SelectionCard txt="Event" dotimgclss={false} link={"/add-section/add-event"} />
                <SelectionCard txt="Product" dotimgclss={false} link={"/add-section/add-product"} />
                <SelectionCard txt="Playlist" dotimgclss={false} link={"/add-section/add-playlist"} />
                <SelectionCard txt="Form" dotimgclss={false} link={"/add-section/add-form"} />
                <SelectionCard txt="Social feed" dotimgclss={false} link={"/add-section/add-social-feed"} />
                <SelectionCard txt="Custom link" dotimgclss={false} link={"/add-section/add-custom-link"} />
            </div>
        </LayoutHeader>
    );
}
