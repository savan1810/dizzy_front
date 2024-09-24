import React from 'react';
import { useNavigate } from 'react-router';
import SelectSection from '../../../../components/AddSection/Customlink/SelectSection';
import { SELECT_SECTION } from '../../../../constants/constants';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { useDispatch, useSelector } from 'react-redux';
import { updateSection } from '../../../../store/customlinkData/customlinkDataSlice';
import { setErrorAlert } from '../../../../store/alert/alertSlice';

export default function ExistingSection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const section = useSelector((state) => state.customlinkdata.section);
    const handleSelect = (value) => {
        dispatch(updateSection(value));
    };

    const hadnleConfirmSelection = () => {
        if (section === null) {
            dispatch(setErrorAlert('Please select a section'));
            return;
        }
        navigate('/add-section/add-custom-link');
    }

    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a platform for preview</p>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => hadnleConfirmSelection()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section/add-custom-link')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                {
                    SELECT_SECTION.map((item, index) => (
                        <SelectSection
                            key={index}
                            txt={item.label}
                            value={item.value}
                            selected={section === item.value} // Pass selected state
                            onSelect={() => handleSelect(item.value)} // Handle selection
                        />
                    ))
                }
            </div>
        </LayoutHeader>
    )
}
