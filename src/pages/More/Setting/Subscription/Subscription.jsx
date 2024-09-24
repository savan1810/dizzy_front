import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Check from '../../../../svg/Check'
import LayoutHeader from '../../../../layout/LayoutHeader'
import { useNavigate } from 'react-router'
import { postDataAPI } from '../../../../utils/fetchData'
import { clearAlerts, setErrorAlert } from '../../../../store/alert/alertSlice'
import DotSvg from '../../../../svg/DotSvg'
import { changePlanStripePaymentThunk } from '../../../../store/auth/authThunk'

export default function Subscription() {
    const token = localStorage.getItem('dizeeToken')
    const user = useSelector(state => state?.user?.userArticle)
    const [planActive, setPlanActive] = useState(null)
    const [plan, setPlan] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchApi = async () => {
            try {
                await postDataAPI('stripe/get_payment_history_auth', {}, token).then((res) => {
                    if (res.data.data.response) {
                        setPlanActive(res.data.data.response.plan)
                    }
                })
            } catch (error) {
                console.log('error', error)
                dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'))
            }

        }
        fetchApi()
    }, [])

    const handleStripePayment = async (plan) => {
        dispatch(clearAlerts());
        if (plan === planActive) {
            dispatch(setErrorAlert('You are already using this plan'))
            return
        }
        dispatch(changePlanStripePaymentThunk({ plan, token }));
    };

    return (
        <LayoutHeader>
            <div className="font-default mt-[50px] justify-center  space-y-[80px]">
                <div className="flex justify-between space-x-[100px]  sm:space-x-[150px]">
                    <p>Change subscription</p>
                    <div className='flex gap-[20px]'>
                        <button className='text-white cursor-pointer' onClick={() => handleStripePayment(plan)}>Confirm</button>
                        <p onClick={() => navigate('/more/setting')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-[33px]">
                    <div className="flex justify-between space-x-[150px] items-center">
                        <button
                            onClick={() => setPlan(0)}
                            className="flex items-center">
                            Basic plan
                            {planActive === 0 && <DotSvg width={6} height={6} color={'red'} className='ml-2' />}
                            <div className="ml-2 h-[12px] w-[18px]">
                                {plan === 0 && <Check className="h-full w-full mt-[2px]" />}
                            </div>

                        </button>
                        <p>$5</p>
                    </div>

                    <div className="flex justify-between space-x-[150px] items-center">
                        <button
                            onClick={() => setPlan(1)}
                            className="flex items-center">
                            Pro plan
                            {planActive === 1 && <DotSvg width={6} height={6} color={'red'} className='ml-2' />}

                            <div className="ml-2 h-[12px] w-[18px]">
                                {plan === 1 && <Check className="h-full w-full mt-[2px]" />}
                            </div>
                        </button>
                        <p>$20</p>
                    </div>

                    <div className="flex justify-between space-x-[150px]">
                        <button>Learn more</button>
                    </div>
                </div>
            </div>
        </LayoutHeader>

    )
}
