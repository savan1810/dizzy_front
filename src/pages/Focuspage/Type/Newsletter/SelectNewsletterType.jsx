import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../../layout/LayoutHeader';
import RedirectCard from '../../../../components/Focuspage/RedirectCard';
import RedirectForNews from '../../../../components/Focuspage/Type/Newsletter/RedirectForNews';
import { useDispatch } from 'react-redux';
import { clearFocusSection } from '../../../../store/focuspage/focuspageSlice';

export default function SelectNewsletterType() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearFocusSection())
    }, [])
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select newsletter page type</p>
                    <button onClick={() => navigate('/focus-page/focus-type')} className='text-white cursor-pointer'>Go back</button>
                </div>
                <RedirectForNews txt="Single" link="/focus-page/newsletter-type/step1" type="single" />

                <RedirectForNews txt="Multiple" dotimgclss={false} link="/focus-page/newsletter-type/step1" type="multiple" />
            </div>
        </LayoutHeader>
    );
}
