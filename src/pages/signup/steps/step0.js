import { useEffect, useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import { verifyPhone } from "../../../store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearAlerts } from "../../../store/alert/alertSlice";

const Step0 = ({ setStep, setUser, user }) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const { sentOTP } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    if (sentOTP) setStep(1);
  }, [sentOTP, setStep]);

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    setUser({ ...user, phone: e.target.value });
  };

  const sendVerifyCode = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(clearAlerts());
    dispatch(verifyPhone(phone));
  };

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div>
          <div className="font-default mb-8">Enter your phone number</div>
          <form onSubmit={sendVerifyCode}>
            <div className="mb-[72px]">
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

export default Step0;
