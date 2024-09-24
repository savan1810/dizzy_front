import { useEffect, useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import { verifyEmailOTP, verifyPhone } from "../../../store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { setErrorAlert } from "../../../store/alert/alertSlice";

const StepEmailVerify = ({ setStep, setUser, user }) => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.user);
    const [code, setCode] = useState("");

    const handleConfirm = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        if (code.length === 6) {
            dispatch(verifyEmailOTP({ code, email })).then((res) => {
                if (res.payload.status === 200) {
                    setStep(2);
                }
            });
        } else {
            dispatch(setErrorAlert("Text verification code is not correct"));
        }
    };

    const handleSendToPhone = () => {
        dispatch(verifyPhone(user?.phone))
            .then((res) => {
                if (res.payload.status === 200) {
                    setStep(1);
                }
            })
            .catch((err) => {
                console.log("err", err);
                dispatch(
                    setErrorAlert(
                        err?.response?.data?.message || "Text verification code is not sent"
                    )
                );
            });
    };

    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div className="flex-grow flex justify-center items-center">
                <div>
                    <div className="font-default mb-9">Verify with your email address</div>

                    {/* Form to handle Enter key press */}
                    <form onSubmit={handleConfirm}>
                        <div className="mb-20">
                            <DizeeInput
                                placeholder={"Enter the code"}
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                            />
                        </div>
                        <div className="font-default flex justify-between">
                            <button type="submit">Confirm</button>
                            <button type="button" onClick={handleSendToPhone}>
                                Send to phone
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 space-y-[15px] mb-4">
                <div className="flex flex-row gap-x-[10px]">
                    <p className="uppercase text-[13px] tracking-widest">DIZEE</p>
                </div>
            </div>
        </div>
    );
};

export default StepEmailVerify;
