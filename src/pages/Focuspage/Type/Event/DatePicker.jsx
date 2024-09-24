import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default stylesheet
import "../../../../css/datePickerStyle.css"
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { useDispatch, useSelector } from 'react-redux';
import { updateEventDate } from '../../../../store/focuseventdata/focuseventdataSlice';

export default function DatePickerFocus() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { route } = location.state;
    const eventDate = useSelector((state) => state.focuseventdata.date);

    const navigation = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        navigation(`${route}`);
    };
    const onBack = (e) => {
        e.preventDefault()
        navigation(route);
    };
    return (
        <LayoutHeader>
            <div className="h-[75vh] flex items-center justify-center">
                <div className="flex items-center justify-center gap-4 sm:gap-16">
                    {/* <BackIcon onClick={onBack} className={"mb-[250px]"} /> */}
                    <div className="datepicker-container flex flex-col justify-center items-start h-[80vh]">
                        <DatePicker
                            selected={eventDate}
                            onChange={date => dispatch(updateEventDate(date))}
                            inline
                        />
                        <div>

                            <button className="text-white text-[12px] px-4 py-2 rounded-md mt-4" onClick={handleSubmit}>Submit</button>
                            <button className="text-white text-[12px] px-4 py-2 rounded-md mt-4" onClick={onBack}>Go back</button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutHeader>
    );
}
