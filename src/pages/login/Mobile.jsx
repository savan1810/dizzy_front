import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginPhoneNumberVerify } from '../../store/auth/authThunk';
import { useLocation, useNavigate } from 'react-router';
import DizeeInput from '../../components/DizeeInput';
import Layout from '../../layout';
import { clearAlerts } from '../../store/alert/alertSlice';

export default function Mobile() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { email } = location.state || {};
    const [phone, setPhone] = useState("");
    const navigation = useNavigate();

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const sendVerifyCode = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        dispatch(clearAlerts());
        dispatch(loginPhoneNumberVerify({ phone, email })).then((res) => {
            if (res?.payload?.status === 200) {
                navigation("/login-otp", { state: { email, phone } });
            }
        });
    };

    return (
        <Layout>
            <div>
                <div className="font-default mb-9">Enter your phone number</div>
                <form onSubmit={sendVerifyCode}>
                    <div className="mb-20">
                        <DizeeInput
                            placeholder={"Mobile phone #"}
                            value={phone}
                            onChange={onChangePhone}
                        />
                    </div>
                    <button type="submit" className="font-default cursor-pointer">
                        Send verification code
                    </button>
                </form>
                <div className="absolute bottom-[30px]">
                    <div className="font-[410] text-[10px] leading-[11.8px] tracking-[3px]">
                        DIZEE
                    </div>
                </div>
            </div>
        </Layout>
    );
}
