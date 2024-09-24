import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { DizeeInput2 } from '../../../../components/DixeeInput2';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, setErrorAlert } from '../../../../store/alert/alertSlice';
import { addCustomLinkSectionToSectionThunk, getCustomLinkSectionThunk } from '../../../../store/addsection/addsectionThunk';
import Plus from '../../../../svg/Plus';
import CustomSectionOverlay from '../../../../components/AddSection/Customlink/CustomSectionOverlay';
import AddedCustomSection from '../../../../components/AddSection/Customlink/AddedCustomSection';
import { updateSection } from '../../../../store/customlinkData/customlinkDataSlice';

export default function CreateNewSection() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [title, setTitle] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState('');
    // const [selectedSection, setSelectedSection] = useState(null); // State to manage the selected section

    const customlinksection = useSelector((state) => state.addsection.customlinksection);
    const section = useSelector((state) => state.customlinkdata.section);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getCustomLinkSectionThunk({ token }));
    }, [dispatch, token]);

    const filterLink = (title) => {
        return customlinksection?.some(m => m.title === title);
    };

    const handleAddCustomLinkSection = async () => {
        const isExistLink = filterLink(title);
        dispatch(clearAlerts());

        if (!previousUrl && isExistLink) {
            dispatch(setErrorAlert('Title already exists'));
            return;
        }

        if (!title) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        let payload = { type: 0, title: title };
        dispatch(addCustomLinkSectionToSectionThunk({ token, payload, previousUrl }))
            .then(() => {
                dispatch(getCustomLinkSectionThunk({ token }));
                setTitle('');
                setPreviousUrl('');
            });
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
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <span className='text-white'>Create new section</span>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => hadnleConfirmSelection()} className='text-white cursor-pointer'>Confirm</button>
                        <p onClick={() => navigate('/add-section/add-custom-link')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]">
                    <div className='w-full'>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <DizeeInput2
                                label="Link"
                                placeholder="Add section title"
                                className="dizee-input w-full text-white"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Plus onClick={handleAddCustomLinkSection} className='h-[12px] w-[12px] mx-1 cursor-pointer' />
                        </div>
                    </div>
                    {customlinksection?.length > 0 && (
                        <div className="flex flex-col justify-center items-center w-full">
                            <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                                <p className='text-white'>Custom sections</p>
                            </div>
                            {customlinksection?.map((item, index) => (
                                <AddedCustomSection
                                    key={index}
                                    item={item}
                                    isSelected={section === item.title} // Pass selected state
                                    onSelect={() => dispatch(updateSection(item.title))} // Update selected section
                                    setOverlayVisible={setOverlayVisible}
                                    setItemForBackend={setItemForBackend}
                                    setPreviousUrl={setPreviousUrl}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isOverlayVisible && (
                <CustomSectionOverlay
                    setOverlayVisible={setOverlayVisible}
                    previousUrl={previousUrl}
                    itemForBackend={itemForBackend}
                    setTitle={setTitle}
                    setPreviousUrl={setPreviousUrl}
                />
            )}
        </LayoutHeader>
    );
}
