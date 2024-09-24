import axios from "../../../utils/axios";
import DizeeInput from "../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { checkUserName } from "../../../store/auth/authThunk";
import Check from "../../../svg/Check";

const Step7 = ({ setStep, setUser, user }) => {
  const dispatch = useDispatch();
  const [available, setAvailable] = useState(false);
  const { checkusername } = useSelector((state) => state.auth);

  const onChangeUserName = async (e) => {
    try {
      const username = e.target.value;
      setUser({ ...user, username });

      if (username.length > 0) {
        const res = await axios.post("/auth/checkUserName", { username });

        if (!res.data.data.exist) {
          dispatch(checkUserName(true));
          setAvailable(true);
        } else {
          dispatch(checkUserName(false));
          setAvailable(false);
        }
      } else {
        dispatch(checkUserName(false));
        setAvailable(false);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (user.username !== undefined && (available || checkusername)) {
      setStep(12); // Move to the next step if username is valid
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div>
          <div className="font-default mb-9">What should we call you?</div>

          {/* Form to capture Enter key press */}
          <form onSubmit={handleSubmit}>
            <div className="mb-20 flex font-default">
              <DizeeInput
                placeholder={"Add a username"}
                value={user?.username}
                onChange={onChangeUserName}
              />
              <div className="ml-2 mt-1 h-[12px] w-[18px] flex items-center justify-center">
                {user.username !== undefined && user.username !== "" && (available || checkusername) && (
                  <Check className="h-full w-full" />
                )}
              </div>
            </div>
            <div className="font-default flex">
              <button
                type="submit"
                className={`mr-[43px] ${user.username !== undefined && (available || checkusername)
                  ? "font-default"
                  : "font-gray"
                  }`}
              >
                Next
              </button>
              <div className="cursor-pointer" onClick={() => {
                if (user.professionRole !== undefined) {
                  setStep(user.professionRole === 'personal' ? 31 : 6);
                }
              }}>
                Go back
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 space-y-[15px] mb-4">
        <div className="flex flex-row gap-x-[10px]">
          <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
        </div>
      </div>
    </div>
  );
};

export default Step7;
