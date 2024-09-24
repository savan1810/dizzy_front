import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../layout";
import { DizeeInput2 } from "../../components/DixeeInput2";
import {
  checkEmail as Check,
  sendOtpToEmailThunk,
} from "../../store/auth/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearAlerts } from "../../store/alert/alertSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { checkemail } = useSelector((state) => state.auth);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    dispatch(clearAlerts());
    if (!isValidEmail(email)) return;
    if (email.length) dispatch(Check(email));
  }, [email, dispatch]);

  const resetEmail = () => {
    setEmail("");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!isValidEmail(email)) return;
    navigate(`/signup?email=${email}`);
    // dispatch(sendOtpToEmailThunk(email)).then((res) => {
    //   if (res.payload.status === 200) {
    //   }
    // })
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-between relative">
        <div className="flex-grow flex justify-center items-center">
          <div>
            <div className="font-default mb-9">
              Login or sign up to get started
            </div>
            <form onSubmit={handleCreateAccount}>
              <div className="mb-20">
                <DizeeInput2
                  placeholder={"Enter your email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={"dizee-input w-full"}
                />
              </div>
              {email.length > 0 && isValidEmail(email) && (
                <>
                  {!checkemail ? (
                    <button type="submit" className="font-default cursor-pointer">
                      Create a new account
                    </button>
                  ) : (
                    <div className="font-default flex">
                      <div
                        className="mr-[43px] cursor-pointer"
                        onClick={() => navigate("/login", { state: { email } })}
                      >
                        Login
                      </div>
                      <div className="cursor-pointer" onClick={resetEmail}>
                        Reset
                      </div>
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 space-y-[15px] mb-4">
          <div className="flex flex-row gap-x-[10px]">
            <p className="uppercase text-[13px] tracking-widest">DIZEE</p>
          </div>
          <div className="text-[12px] flex justify-start gap-x-[6px]">
            <p>Terms</p>
            <p>Privacy</p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
