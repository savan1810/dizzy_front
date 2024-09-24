import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import search from '../../../../assets/images/components/search.png';
import SelectionCard from '../../../../components/SelectionCard';
import LayoutHeader from '../../../../layout/LayoutHeader';

export default function AddVideo() {
    const token = localStorage.getItem('dizeeToken')

    return (
        <LayoutHeader>

            <div className="w-[390px] h-auto bg-black flex flex-col justify-start items-center relative">

                <div className='px-4 my-[50px] flex  w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Add Video</p>
                    <Link to="/add-section">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>
                <SelectionCard txt="Import video link" dotimgclss={false} link={'/add-section/import-video'} />
                <SelectionCard txt="Add custom video link" dotimgclss={false} link={'/add-section/custom-video-link'} />
            </div>
        </LayoutHeader>

    )
}
