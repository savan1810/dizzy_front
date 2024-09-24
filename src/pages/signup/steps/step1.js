import { useEffect, useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import { sendOtpToEmailThunk, verifyOTP } from "../../../store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { setErrorAlert } from "../../../store/alert/alertSlice";

const Step1 = ({ setStep, setUser, user }) => {
  const dispatch = useDispatch();
  const { phone } = useSelector((state) => state.user);
  const { otpVerified } = useSelector((state) => state.auth);
  const [code, setCode] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault(); // Prevent default form behavior (page refresh)
    if (code.length === 6) {
      dispatch(verifyOTP({ code, phone }));
    } else {
      dispatch(setErrorAlert("Text verification code is not correct"));
    }
  };

  const handleSendToEmail = () => {
    dispatch(sendOtpToEmailThunk(user?.email))
      .then((res) => {
        if (res.payload.status === 200) {
          setStep(-1);
        }
      })
      .catch((err) => {
        dispatch(
          setErrorAlert(
            err?.response?.data?.message || "Text verification code is not sent"
          )
        );
      });
  };

  useEffect(() => {
    if (otpVerified) setStep(2);
  }, [otpVerified, setStep]);

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div>
          <div className="font-default mb-9">
            Code has been sent to (***) *** {phone.slice(-4)}
          </div>
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
              <button type="button" onClick={handleSendToEmail}>
                Send to email
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 space-y-[15px] mb-4">
        <div className="flex flex-row gap-x-[10px]">
          <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">
            DIZEE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step1;
