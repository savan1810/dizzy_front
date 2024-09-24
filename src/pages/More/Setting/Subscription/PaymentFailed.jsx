import React from 'react'
import { useNavigate } from 'react-router'

export default function PaymentFailed() {
    const navigate = useNavigate()

    return (
        <div className='h-[100vh] font-default flex flex-col gap-y-[10px] justify-center items-center'>
            <div className='text-white'>Payment Failed</div>
            <button className='text-white' onClick={() => navigate('/more/setting/subscription')}>Go back</button>
        </div>
    )
}
