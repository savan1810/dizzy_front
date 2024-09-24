import { useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import Check from "../../../svg/Check";
const Step10 = ({ setStep, setUser, user }) => {
  const [isValidHex, setIsValidHex] = useState(false);

  const validateHex = (hex) => {
    const hexPattern = /^([0-9A-Fa-f]{3}){1,2}$/;
    return hexPattern.test(hex);
  };

  const handleBackgroundChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, background: value });
    setIsValidHex(validateHex(value));
  };

  return (
    <div>
      <div className="font-default mb-9">Add a background color</div>
      <div className="mb-20 flex items-center font-default">
        #{" "}
        <DizeeInput
          placeholder={"FFFFFF"}
          value={user?.background || ""}
          onChange={handleBackgroundChange}
          className={`ml-2 ${user?.background && !isValidHex ? "border-red-500" : ""}`}
        />
        <div className="ml-2 mt-1 h-[12px] w-[18px]">
          {isValidHex && user?.background && <Check className="h-full w-full" />}
        </div>
      </div>
      <div className="font-default flex">
        <div
          className={`mr-[43px] cursor-pointer ${isValidHex || !user?.background ? "font-default" : "font-gray"
            }`}
          onClick={() => {
            if (isValidHex || !user?.background) {
              setStep(11);
            }
          }}
        >
          Next
        </div>
        <div className="cursor-pointer" onClick={() => setStep(9)}>
          Go back
        </div>
      </div>
    </div>
  );
};

export default Step10;
