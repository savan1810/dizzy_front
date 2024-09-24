import React, { useState } from 'react'
import DizeeInput from '../../../../../components/DizeeInput'
import LayoutHeader from '../../../../../layout/LayoutHeader'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAlert, setLoader, setSuccessAlert } from '../../../../../store/alert/alertSlice';
import { postDataAPI } from '../../../../../utils/fetchData';

export default function VerifyNewPhone() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken')
    const dispatch = useDispatch()
    const [code, setCode] = useState()
    const phone = useSelector(state => state.setting.newPhone)

    const handleNewPhoneOtpVerify = async () => {
        dispatch(setLoader(true))
        try {
            await postDataAPI("setting/verify-new-otp", { phone: phone, code: code }, token).then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoader(false))
                    dispatch(setSuccessAlert(res.data.message))
                    navigate('/more/setting/profile-edit')
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
                <div className="font-default mb-9">Verify your phone number</div>
                <div className="mb-20">
                    <DizeeInput
                        placeholder={"Enter the code"}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className='cursor-pointer' onClick={() => handleNewPhoneOtpVerify()}>
                    Confirm
                </div>
            </div>
        </LayoutHeader>

    )
}
