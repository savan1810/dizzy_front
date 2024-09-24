import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import search from '../../../../assets/images/components/search.png';
import SelectionCard from '../../../../components/SelectionCard';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { useDispatch } from 'react-redux';
import { getMusicThunk } from '../../../../store/addsection/addsectionThunk';
import { clearAlerts } from '../../../../store/alert/alertSlice';

export default function AddProduct() {
    const token = localStorage.getItem('dizeeToken')

    return (
        <LayoutHeader>

            <div className="w-[390px] h-auto bg-black flex flex-col justify-start items-center relative">

                <div className='px-4 my-[50px] flex  w-full justify-between'>
                    <p className='text-white' style={{ fontSize: '12px' }}>Add products</p>
                    <Link to="/add-section">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>
                <SelectionCard txt="Import products" dotimgclss={false} link={'/add-section/connect-with-shopify'} />
                <SelectionCard txt="Manually add products" dotimgclss={false} link={'/add-section/manually-add-product'} />
            </div>
        </LayoutHeader>

    )
}
