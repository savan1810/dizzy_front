import React, { useState } from 'react';
import { DizeeInput2 } from '../../components/DixeeInput2';
import { postDataAPI } from '../../utils/fetchData';
import { useNavigate } from 'react-router';
import { clearAlerts, setErrorAlert } from '../../store/alert/alertSlice';
import { useDispatch } from 'react-redux';
import { protect } from '../../store/auth/authSlice';

export default function Protect() {
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = async () => {
        dispatch(clearAlerts())
        await postDataAPI('auth/protect', { password }).then((res) => {
            if (res.data.status === 200) {
                dispatch(protect())
                navigate('/')
            }
            else {
                dispatch(setErrorAlert(res.data.message))
            }

        }).catch((err) => {
            dispatch(setErrorAlert(err.response.data.message))
        })
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <DizeeInput2
                    label="Link"
                    placeholder="password"
                    className="dizee-input  text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="px-2 py-1 text-[12px] bg-[red] text-white rounded" onClick={() => handleClick()}>Submit</button>
            </div>
        </>
    );
}
