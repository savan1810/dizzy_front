import React from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../layout/LayoutHeader';
import SelectionCard from '../../../components/SelectionCard';
import { useSelector } from 'react-redux';
import RedirectCard from '../../../components/More/RedirectCard';


export default function Analytics() {
    const navigate = useNavigate();
    const userArticle = useSelector((state) => state.user.userArticle);

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 mt-[50px] mb-[15px] flex w-full justify-between'>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <img src={userArticle?.avatar} alt='avatar' className='h-[30px] w-[30px] rounded-[50%]' />
                        <p className='text-white'>diz.ee/{userArticle?.domain}</p>
                    </div>
                    <p className='text-[red] cursor-pointer'>Export data</p>
                </div>
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a module</p>
                    <p onClick={() => navigate('/')} className='text-white cursor-pointer'>Go Back</p>
                </div>
                <RedirectCard txt="Video Message" link="/more/analytics/video-message" dotimgclss={false} />
                <RedirectCard txt="Music" link="/more/analytics/music" dotimgclss={false} />
                <RedirectCard txt="Video" dotimgclss={false} link="/more/analytics/video" />
                <RedirectCard txt="Event" dotimgclss={false} link={"/more/analytics/event"} />
                <RedirectCard txt="Product" dotimgclss={false} link={"/more/analytics/product"} />
                <RedirectCard txt="Playlist" dotimgclss={false} link={"/more/analytics/playlist"} />
                <RedirectCard txt="Form" dotimgclss={false} link={"/more/analytics/form"} />
                <RedirectCard txt="Social feed" dotimgclss={false} link={"/more/analytics/socialfeed"} />
                {/* <RedirectCard txt="Custom link" dotimgclss={false} link={"/add-section/add-custom-link"} /> */}
            </div>
        </LayoutHeader>
    );
}
