import React, { useEffect } from 'react'
import { postDataAPI } from '../../../../utils/fetchData'
import { setErrorAlert } from '../../../../store/alert/alertSlice'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

export default function PaymentSuccess() {
    let token = localStorage.getItem('dizeeToken')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            try {
                await postDataAPI('stripe/approve_subscription_auth', {}, token).then((res) => {
                    // if (res.data.data.response) {
                    //   // setStep(4)
                    // }
                })
            } catch (error) {
                dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'))
                console.log('error', error)
            }

        }
        fetchApi()
    }, [])
    return (
        <div className='h-[100vh] font-default flex flex-col gap-y-[10px] justify-center items-center'>
            <div className='text-white'>Payment Success</div>
            <button className='text-white' onClick={() => navigate('/more/setting/subscription')}>Go back</button>
        </div>
    )
}
