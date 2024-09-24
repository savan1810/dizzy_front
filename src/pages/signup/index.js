import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { setEmail, setPhone } from "../../store/user/userSlice";
import Layout from "../../layout";
import Step0 from "./steps/step0";
import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";
import Step5 from "./steps/step5";
import Step6 from "./steps/step6";
import Step7 from "./steps/step7";
import Step8 from "./steps/step8";
import Step9 from "./steps/step9";
import Step10 from "./steps/step10";
import Step11 from "./steps/step11";
import Step12 from "./steps/step12";
import Step13 from "./steps/step13";
import { useDispatch } from "react-redux";
import { optClear } from "../../store/auth/authSlice";
import StepEmailVerify from "./steps/StepEmailVerify";
import ColorTemplate from "./steps/New/ColorTemplate";
import Template from "./steps/New/Template";
import MainColorPicker from "./steps/New/MainColorPicker";
import SecondaryColorPicker from "./steps/New/SecondaryColorPicker";
import Presentation from "./steps/New/Presentation";
import Interest from "./steps/Personal/Interest";
import Finalpage from "./steps/Personal/Finalpage";

const Signup = () => {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (query.get("email") && query.get("email").length > 0) {
      setUser({ email: query.get("email") });
      dispatch(setEmail(query.get("email")));
    } else if (searchParams.get('curStep')) {
      if (searchParams.get('curStep')) {
        setStep(parseInt(searchParams.get('curStep'), 10));
        setUser(JSON.parse(searchParams.get('user')));
      }
    }
    else {
      navigate("/");
    }
  }, [query, navigate, dispatch, location.search]);
  return (
    <Layout>
      {step === -1 && <StepEmailVerify setStep={setStep} setUser={setUser} user={user} />}
      {step === 0 && <Step0 setStep={setStep} setUser={setUser} user={user} />}
      {step === 1 && <Step1 setStep={setStep} setUser={setUser} user={user} />}
      {step === 2 && <Step2 setStep={setStep} setUser={setUser} user={user} />}

      {/* professional  */}
      {step === 3 && <Step3 setStep={setStep} setUser={setUser} user={user} />}
      {step === 4 && <Step4 setStep={setStep} setUser={setUser} user={user} />}
      {step === 5 && <Step5 setStep={setStep} setUser={setUser} user={user} />}
      {step === 6 && <ColorTemplate setStep={setStep} setUser={setUser} user={user} />}
      {step === 7 && <Template setStep={setStep} setUser={setUser} user={user} />}
      {step === 8 && <Step6 setStep={setStep} setUser={setUser} user={user} />}
      {step === 9 && <Step9 setStep={setStep} setUser={setUser} user={user} />}
      {step === 12 && <Step12 setStep={setStep} setUser={setUser} user={user} />}
      {step === 13 && <Presentation setStep={setStep} setUser={setUser} user={user} />}

      {/* personal  */}
      {step === 31 && <Interest setStep={setStep} setUser={setUser} user={user} />}
      {step === 32 && <Finalpage setStep={setStep} setUser={setUser} user={user} />}

      {/* for main and secondary color  */}
      {step === 20 && <MainColorPicker setStep={setStep} setUser={setUser} user={user} />}
      {step === 21 && <SecondaryColorPicker setStep={setStep} setUser={setUser} user={user} />}

      {step === 22 && <Step7 setStep={setStep} setUser={setUser} user={user} />}

    </Layout>
  );
};

export default Signup;
