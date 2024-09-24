import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlerts } from "../../../store/alert/alertSlice";
import { stripePaymentThunk } from "../../../store/auth/authThunk";
import Check from "../../../svg/Check";
import { postDataAPI } from "../../../utils/fetchData";
import FooterComment from "../footerComment";

const comment = {
  0: "Get started with essential tools through the Basic plan. Ideal for those new to Dizee, this plan provides all the foundational features you need to begin engaging your audience.",
  1: "Unlock advanced features with the Pro plan. Enjoy enhanced customization, detailed analytics, and premium tools to boost your visibility and engagement. Perfect for creators, brands, and businesses looking to grow. "
}

const Step3 = ({ setStep, setUser, user }) => {
  const [planType, setPlanType] = useState(0);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        await postDataAPI('stripe/get_payment_history', { phone: userData?.phone, email: userData?.email }).then((res) => {
          if (res.data.data.response) {
            setStep(4)
          }
        })
      } catch (error) {
        console.log('error', error)
      }

    }
    fetchApi()
  }, [planType])

  useEffect(() => {
    if (user && typeof user.plan === 'number') {
      if (user.plan <= 1) setPlanType(0); // Monthly plans: 0 (Basic), 1 (Professional)
      else setPlanType(1); // Yearly plans: 2 (Basic), 3 (Professional)
    }
  }, [user]);


  const handleStripePayment = async (plan) => {
    const persistedData = localStorage.getItem('persist:root');
    const parsedData = JSON.parse(persistedData);
    let userData = JSON.parse(parsedData.user);
    let phone = userData.phone;
    const url = new URL(window.location.href);
    const emailParam = url.searchParams.get('email');
    let email = emailParam;
    let userDataState = JSON.stringify(user);
    dispatch(clearAlerts());
    console.log('plan', plan)
    dispatch(stripePaymentThunk({ plan, user: userDataState, email, phone }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && user?.plan !== undefined) {
      handleStripePayment(user?.plan)
    }
  };


  useEffect(() => {
    // Attach event listener to detect 'Enter' key press
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [user.professionRole]);



  return (

    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div className="font-default space-y-[96px]">
          <div className="flex justify-between space-x-[100px] sm:space-x-[150px]">
            <p>Select a plan</p>
            {/* <button
          onClick={() => {
            // setStep(4);

            if (user?.plan !== undefined) {
              handleStripePayment(user.plan);
            }
          }}
        >
          Confirm
        </button> */}
          </div>

          <div className="flex flex-col justify-between space-y-[33px]">
            <div className="flex justify-between space-x-[150px] items-center">
              <button onClick={() => setUser({ ...user, plan: 0 })} className="flex items-center">
                Basic plan
                <div className="ml-2 h-[12px] w-[18px]">
                  {user?.plan === 0 && <Check className="h-full w-full mt-[1px]" />}
                </div>
              </button>
              <p>$5</p>
            </div>

            <div className="flex justify-between space-x-[150px] items-center">
              <button onClick={() => setUser({ ...user, plan: 1 })} className="flex items-center">
                Pro plan
                <div className="ml-2 h-[12px] w-[18px]">
                  {user?.plan === 1 && <Check className="h-full w-full mt-[1px]" />}
                </div>
              </button>
              <p>$20</p>
            </div>

            <div className="flex justify-between space-x-[150px]">
              <button
                onClick={() => {
                  // setStep(4);

                  if (user?.plan !== undefined) {
                    handleStripePayment(user.plan);
                  }
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setStep(1);
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterComment comment={comment[user?.plan]} />
    </div>
  );

};

export default Step3;
