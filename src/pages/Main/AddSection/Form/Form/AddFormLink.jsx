import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import { addFormToSectionThunk, getFormThunk, } from '../../../../../store/addsection/addsectionThunk';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import plus from '../../../../../assets/images/components/plus.png';
import FormOverlay from '../../../../../components/AddSection/Form/FormOverlay';
import AddedForm from '../../../../../components/AddSection/Form/AddedForm';
import Close from '../../../../../svg/Close';
import Plus from '../../../../../svg/Plus';

export default function AddFormLink() {
    let type = 0;
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [title, setTitle] = useState('');
    const [inputFields, setInputFields] = useState(['']);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState('');

    const form = useSelector((state) => state.addsection.form);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getFormThunk({ token }));
    }, [dispatch, token]);

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index] = event.target.value;
        setInputFields(values);
    };

    const handleAddField = () => {
        setInputFields([...inputFields, '']);
    };

    const handleRemoveField = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const filterLink = (vara) => {
        if (form?.length > 0) {
            for (let m of form) {
                if (m.title === vara && m.type === type) {
                    return true;
                }
            }
        }
        return false;
    };

    const handleAddForm = async () => {
        dispatch(clearAlerts());
        const isExistLink = filterLink(title);
        if (isExistLink) {
            dispatch(setErrorAlert('Form already exists'));
            return;
        }

        if (!title || inputFields.length === 0 || inputFields.some(field => field.trim() === '')) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        const payload = {
            type: type,
            title: title,
            inputFields: inputFields,
        };

        dispatch(addFormToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getFormThunk({ token: token }));
            setTitle('');
            setInputFields(['']);
        });
    };

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        <span className='text-white'>Add a form</span>
                    </div>
                    <div className='flex gap-[30px]'>
                        <button onClick={handleAddForm} className='text-white cursor-pointer'>Confirm</button>
                        <p onClick={() => navigate('/add-section/add-form')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add a title"
                                    className="dizee-input w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        {inputFields.map((inputField, index) => (
                            <div key={index} className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                                <DizeeInput2
                                    label={`Field ${index + 1}`}
                                    placeholder={`Field input ${index + 1}`}
                                    className="dizee-input w-full text-white"
                                    value={inputField}
                                    onChange={event => handleInputChange(index, event)}
                                />
                                {index !== 0 && <Close className='cursor-pointer h-[14px] w-[14px] text-white' onClick={() => handleRemoveField(index)} />}
                            </div>
                        ))}
                        <div className='p-4 py-6 flex w-full justify-between items-center'>
                            <div className='flex items-center'>
                                <span className='text-white'>Add a field</span>
                            </div>
                            <button onClick={handleAddField}>
                                <Plus className='h-[12px] w-[12px]  cursor-pointer' />
                                {/* <img src={plus} alt='plus' className='h-[12px] w-[12px] cursor-pointer' /> */}
                            </button>
                        </div>
                    </div>
                    {form?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added forms</p>
                            </div>
                        </div>
                        {
                            form?.length > 0 && form?.map((item, index) => {
                                if (item.type === type) {
                                    return <AddedForm key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} />
                                }

                            })
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <FormOverlay setOverlayVisible={setOverlayVisible} itemForBackend={itemForBackend} />}
        </LayoutHeader>
    );
}
