import React, { useEffect, useState } from 'react'
import DizeeInput from '../../../../../components/DizeeInput'
import LayoutHeader from '../../../../../layout/LayoutHeader'
import { useNavigate } from 'react-router';
import { postDataAPI } from '../../../../../utils/fetchData';
import { useDispatch } from 'react-redux';
import { setErrorAlert, setLoader, setSuccessAlert } from '../../../../../store/alert/alertSlice';
import { setNewPhone } from '../../../../../store/setting/settingSlice';


export default function NewPhone() {
    // const [phone,]
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken')
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('')

    const handleNewPhoneVerify = async () => {
        dispatch(setLoader(true))
        try {
            await postDataAPI("setting/update-new-phone", { phone: phone }, token).then((res) => {
                if (res.data.status === 200) {
                    dispatch(setNewPhone(phone))
                    dispatch(setLoader(false))
                    dispatch(setSuccessAlert(res.data.message))
                    navigate('/more/setting/verify-new-phone')
                } else {
                    dispatch(setLoader(false))
                    dispatch(setErrorAlert(res.data.message))
                }
            })
        } catch (error) {
            dispatch(setLoader(false))
            dispatch(setErrorAlert(error?.response?.data?.message || "An error occured"))
        }
    }
    return (
        <LayoutHeader>
            <div className='h-[85vh] flex flex-col justify-center text-white'>
                <div className="font-default mb-9">Enter your new phone number</div>
                <div className="mb-20">
                    <DizeeInput
                        placeholder={"Mobile phone #"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="font-default cursor-pointer" onClick={() => handleNewPhoneVerify()}>
                    Send verification code
                </div>
            </div>
        </LayoutHeader>
    )
}
