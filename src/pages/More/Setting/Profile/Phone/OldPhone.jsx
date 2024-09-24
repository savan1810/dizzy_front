import React, { useEffect, useState } from 'react'
import DizeeInput from '../../../../../components/DizeeInput'
import LayoutHeader from '../../../../../layout/LayoutHeader'
import { useNavigate } from 'react-router';
import { postDataAPI } from '../../../../../utils/fetchData';
import { useDispatch } from 'react-redux';
import { setErrorAlert, setLoader, setSuccessAlert } from '../../../../../store/alert/alertSlice';
import { setOldPhone } from '../../../../../store/setting/settingSlice';

export default function OldPhone() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken')
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('')




    const handleOldPhoneVerify = async () => {
        dispatch(setLoader(true))
        try {
            await postDataAPI("setting/old-phone-verify", { phone: phone }, token).then((res) => {
                if (res.data.status === 200) {
                    dispatch(setOldPhone(phone))
                    dispatch(setLoader(false))
                    dispatch(setSuccessAlert(res.data.message))
                    navigate('/more/setting/verify-old-phone')
                } else {
                    dispatch(setLoader(false))
                    dispatch(setErrorAlert(res.data.message))
                }
            })
        } catch (error) {
            console.log('error', error)
            dispatch(setLoader(false))
            dispatch(setErrorAlert(error?.response?.data?.message || "An error occured"))
        }
    }

    return (
        <LayoutHeader>

            <div className='h-[85vh] flex flex-col justify-center text-white'>
                <div className="font-default mb-9">Enter your phone number</div>
                <div className="mb-20">
                    <DizeeInput
                        placeholder={"Mobile phone #"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='flex space-x-2'>

                    <div className="font-default cursor-pointer" onClick={() => handleOldPhoneVerify()}>
                        Send verification code
                    </div>
                    <div className='font-default cursor-pointer' onClick={() => navigate("/more/setting/profile-edit")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    )
}
