import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../../layout/LayoutHeader';
import RedirectCard from '../../../../components/Focuspage/RedirectCard';
import RedirectForEvent from '../../../../components/Focuspage/Type/Event/RedirectForEvent';
import { useDispatch } from 'react-redux';
import { clearFocusSection } from '../../../../store/focuspage/focuspageSlice';

export default function SelectEventType() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearFocusSection())
    }, [])
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select event page type</p>
                    <button onClick={() => navigate('/focus-page/focus-type')} className='text-white cursor-pointer'>Go back</button>
                </div>
                <RedirectForEvent txt="Single" link="/focus-page/event-type/step1" type="single" />

                <RedirectForEvent txt="Multiple" dotimgclss={false} link="/focus-page/event-type/step1" type="multiple" />
            </div>
        </LayoutHeader>
    );
}
