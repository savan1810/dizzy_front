import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../../layout/LayoutHeader';
import RedirectCard from '../../../../components/Focuspage/RedirectCard';
import RedirectForProduct from '../../../../components/Focuspage/Type/Product/RedirectForProduct';
import { useDispatch } from 'react-redux';
import { clearFocusSection } from '../../../../store/focuspage/focuspageSlice';

export default function SelectProductType() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearFocusSection())
    }, [])
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select product page type</p>
                    <button onClick={() => navigate('/focus-page/focus-type')} className='text-white cursor-pointer'>Go back</button>
                </div>
                <RedirectForProduct txt="Single" link="/focus-page/product-type/step1" type="single" />

                <RedirectForProduct txt="Multiple" dotimgclss={false} link="/focus-page/product-type/step1" type="multiple" />
            </div>
        </LayoutHeader>
    );
}
