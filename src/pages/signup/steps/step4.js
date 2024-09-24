import { useEffect, useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import DizeeCloseIcon from "../../../components/DizeeCloseIcon";
import axios from "../../../utils/axios";
import { checkDomain } from "../../../store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import Check from "../../../svg/Check";
import { setErrorAlert } from "../../../store/alert/alertSlice";
import { postDataAPI } from "../../../utils/fetchData";
import FooterComment from "../footerComment";

const Step4 = ({ setStep, setUser, user }) => {
  const dispatch = useDispatch();
  const [available, setAvailable] = useState(false);
  const { checkdomain } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await postDataAPI('stripe/approve_subscription', { email: user?.email }).then((res) => {
          // Handle response if needed
        });
      } catch (error) {
        dispatch(setErrorAlert(error?.response?.data?.message || 'An error occurred'));
        console.log('error', error);
      }
    };
    fetchApi();
  }, [dispatch, user?.email]);

  const onChangeDomain = async (e) => {
    try {
      setUser({ ...user, domain: e.target.value });
      if (e.target.value.length > 0) {
        const res = await axios.post("/auth/checkdomain", {
          domain: e.target.value,
        });
        if (res.data.data.success && !res.data.data.exist) {
          dispatch(checkDomain(true));
          setAvailable(true);
        } else {
          dispatch(checkDomain(false));
          setAvailable(false);
        }
      } else {
        dispatch(checkDomain(false));
        setAvailable(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e) => {
    // Check if the pressed key is Enter
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      if (user.domain !== undefined && user.domain !== "" && (available || checkdomain)) {
        setStep(5); // Move to the next step
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-[250px]">
          <div className="font-default mb-9">Claim your domain</div>
          <form onKeyDown={handleKeyDown}>
            <div className="mb-20 flex items-center font-default">
              diz.ee/
              <DizeeInput
                placeholder={"yourdomain"}
                onChange={onChangeDomain}
                value={user.domain}
              />
              <div className="ml-2 mt-1 h-[12px] w-[18px] flex items-center justify-between">
                {user.domain !== undefined && user.domain !== "" && (available || checkdomain) ? (
                  <Check className="h-full w-full" />
                ) : (
                  <DizeeCloseIcon className="h-full w-full" />
                )}
              </div>
            </div>
            <div className="font-default flex">
              <div
                className={`cursor-pointer mr-[43px] ${user.domain !== undefined && user.domain !== "" && (available || checkdomain)
                  ? "font-default"
                  : "font-gray"
                  }`}
                onClick={() => user.domain !== undefined && user.domain !== "" && (available || checkdomain) && setStep(5)}
              >
                Next
              </div>
              <div className="cursor-pointer" onClick={() => setStep(3)}>
                Go back
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterComment comment={'Secure your personalized Dizee link to make it easier for your audience to find and engage with you. Choose your custom domain now and start building your presence at diz.ee/yourdomain.'} />
    </div>
  );
};

export default Step4;
