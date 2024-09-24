import React, { useEffect, useState } from 'react';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import DizeeInput from '../../../../../components/DizeeInput';
import { useNavigate } from 'react-router';
import Close from '../../../../../svg/Close';
import { useDispatch, useSelector } from 'react-redux';
import { delegate_access, delete_delegate_access, get_delegate_access } from '../../../../../store/setting/settingThunk';
import { setErrorAlert } from '../../../../../store/alert/alertSlice';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';

export default function DelegateAccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('dizeeToken');
    const delegateaccess = useSelector(state => state?.setting?.delegateaccess);
    const [confirmDeleteEmail, setConfirmDeleteEmail] = useState(null); // State to track the email for deletion confirmation

    useEffect(() => {
        dispatch(get_delegate_access({ token }));
    }, [dispatch, token]);

    const handleInvite = () => {
        if (!email) {
            dispatch(setErrorAlert("Email cannot be empty"));
            return;
        }
        let body = { email };
        dispatch(delegate_access({ body, token }));
        setEmail('');
    };

    const handleDelete = (email) => {
        dispatch(delete_delegate_access({ email, token }));
        setConfirmDeleteEmail(null); // Reset the confirmation state after deletion
    };

    return (
        <LayoutHeader>
            <div className='w-[350px] flex flex-col gap-y-[100px] sm:w-[390px] text-white'>
                <div className='px-4 mt-[50px] flex w-full justify-between'>
                    <p className='text-white'>Delegate access</p>
                    <p onClick={() => navigate('/more/setting/profile-edit')} className='text-white cursor-pointer'>Go back</p>
                </div>
                <div className='px-4 flex w-full justify-between'>
                    <DizeeInput2
                        placeholder={"Enter an email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="dizee-input w-full"
                    />
                    <button className='text-white' onClick={handleInvite}>Invite</button>
                </div>
                {
                    delegateaccess?.length > 0 &&
                    <div className='px-4 flex flex-col gap-y-[50px]'>
                        <p className='text-white'>Your team</p>
                        {
                            delegateaccess?.map((item, index) => (
                                <div key={index} className='flex justify-between'>
                                    <p className='text-white'>{item?.email}</p>
                                    {
                                        item?.status === 'pending' ?
                                            <p className='text-white'>{item?.status}</p>
                                            :
                                            confirmDeleteEmail === item.email ?
                                                <button onClick={() => handleDelete(item?.email)} className='text-white'>Confirm deletion</button>
                                                : <Close onClick={() => setConfirmDeleteEmail(item.email)} className="w-[18px] h-[18px] cursor-pointer" />
                                    }
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </LayoutHeader>
    );
}
