import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import search from '../../../../assets/images/components/search.png';
import SelectionCard from '../../../../components/SelectionCard';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { useDispatch } from 'react-redux';
import { getMusicThunk } from '../../../../store/addsection/addsectionThunk';
import { clearAlerts } from '../../../../store/alert/alertSlice';

export default function AddMusic() {
    const token = localStorage.getItem('dizeeToken')

    return (
        <LayoutHeader>

            <div className="w-[390px] h-auto bg-black flex flex-col justify-start items-center relative">

                <div className='px-4 my-[50px] flex  w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Add Music</p>
                    <Link to="/add-section">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>


                <div className='px-4 py-6 flex  w-full justify-between items-center ' style={{ fontSize: '12px' }}  >
                    <div className='w-auto items-center flex flex-row'>
                        <p className='text-white '>Search for a release</p>
                    </div>

                    <Link to="/add-section/search-for-release" className='cursor-pointer'>
                        <img src={search} alt='sp' className='h-[12px] w-[12px] mx-1' />
                    </Link>

                </div>

                <SelectionCard txt="Manual Entry " dotimgclss={false} link={'/add-section/music-manual-entry'} />
                {/* <SelectionCard txt="Custom link " dotimgclss={false} link={'/add-section/custom-music-link'} /> */}



            </div>
        </LayoutHeader>

    )
}
