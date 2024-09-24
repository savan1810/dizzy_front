import React, { useState } from 'react'
import DizeeInput from '../../../../../components/DizeeInput'
import LayoutHeader from '../../../../../layout/LayoutHeader'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setErrorAlert, setLoader, setSuccessAlert } from '../../../../../store/alert/alertSlice';
import { postDataAPI } from '../../../../../utils/fetchData';

export default function VerifyOldPhone() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken')
    const dispatch = useDispatch()
    const [code, setCode] = useState()
    const phone = useSelector(state => state.setting.oldPhone)

    const handleOldPhoneOtpVerify = async () => {
        dispatch(setLoader(true))
        try {
            await postDataAPI("setting/verify-old-otp", { phone: phone, code: code }, token).then((res) => {
                if (res.data.status === 200) {
                    dispatch(setLoader(false))
                    dispatch(setSuccessAlert(res.data.message))
                    navigate('/more/setting/new-phone')
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
                <div className='cursor-pointer' onClick={() => handleOldPhoneOtpVerify()}>
                    Confirm
                </div>
            </div>
        </LayoutHeader>
    )
}
