import React, { useEffect, useState } from 'react'
import { loginWithOtp } from '../../store/auth/authThunk';
import { useLocation, useNavigate } from 'react-router';
import DizeeInput from '../../components/DizeeInput';
import { useDispatch } from 'react-redux';
import Layout from '../../layout';
import { clearAlerts } from '../../store/alert/alertSlice';

export default function Otp() {
    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const location = useLocation();
    const { email, phone } = location.state || {};
    const navigation = useNavigate();

    useEffect(() => {
        if (code.length === 6) {
            dispatch(clearAlerts())
            dispatch(loginWithOtp({ email, code, phone })).then((res) => {
                if (res.payload.status === 200) navigation("/");
            });
        }
    }, [code, dispatch, phone, email, navigation]);

    return (
        <Layout>
            <div>
                <div className="font-default mb-9">Verify your phone number</div>
                <div className="mb-20">
                    <DizeeInput
                        placeholder={"Enter the code"}
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    />
                </div>

                <div className="absolute bottom-[30px]">
                    <div className="font-[410] text-[10px] leading-[11.8px] tracking-[3px]">
                        DIZEE
                    </div>
                </div>
            </div>
        </Layout>

    );
}
