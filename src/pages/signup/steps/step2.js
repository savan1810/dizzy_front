import { useEffect } from "react";
import Check from "../../../svg/Check";
import FooterComment from "../footerComment";

const comment = {
  personal: "A Personal account on Dizee gives you the tools to showcase your work, engage with your audience, and grow your brand. Perfect for creators, businesses, and brands looking to make an impact.",
  professional: "A Professional account on Dizee gives you the tools to showcase your work, engage with your audience, and grow your brand. Perfect for creators, businesses, and brands looking to make an impact."
};

const Step2 = ({ setStep, setUser, user }) => {
  // Handle 'Enter' key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && user.professionRole) {
      setStep(user.professionRole === "personal" ? 31 : 3);
    }
  };

  useEffect(() => {
    // Attach event listener to detect 'Enter' key press
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [user.professionRole]); // Ensure it listens for changes in user.professionRole

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div>
          <div className="font-default mb-9">What describes you best?</div>
          <div className="mb-20 flex gap-[30px] font-default">

            {/* Personal Role */}
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setUser({ ...user, professionRole: 'personal' })}
            >
              <div>Personal</div>
              <div className="w-[18px] h-[12px] ml-2">
                {user.professionRole === 'personal' && <Check className="h-[12px] w-[18px]" />}
              </div>
            </div>

            {/* Professional Role */}
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setUser({ ...user, professionRole: 'professional' })}
            >
              <div>Professional</div>
              <div className="w-[18px] h-[12px] ml-2">
                {user.professionRole === 'professional' && <Check className="h-[12px] w-[18px]" />}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex ">
            <div
              className={`cursor-pointer mr-[43px] ${user.professionRole ? 'font-default' : 'font-gray'}`}
              onClick={() => {
                if (user.professionRole) {
                  setStep(user.professionRole === 'personal' ? 31 : 3);
                }
              }}
            >
              Next
            </div>
          </div>
        </div>
      </div>

      {/* Footer Comment */}
      <FooterComment comment={comment[user?.professionRole]} />
    </div>
  );
};

export default Step2;
