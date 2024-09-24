import { useState } from "react";
import DizeeInput from "../../../components/DizeeInput";
import Check from "../../../svg/Check";

const Step11 = ({ setStep, setUser, user }) => {
  const [isValidHex, setIsValidHex] = useState(false);

  const validateHex = (hex) => {
    const hexPattern = /^([0-9A-Fa-f]{3}){1,2}$/;
    return hexPattern.test(hex);
  };

  const handleAccentChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, accent: value });
    setIsValidHex(validateHex(value));
  };

  return (
    <div>
      <div className="font-default mb-9">Add accent color</div>
      <div className="mb-20 flex items-center font-default">
        #{" "}
        <DizeeInput
          placeholder={"FFFFFF"}
          value={user?.accent || ""}
          onChange={handleAccentChange}
          className={`ml-2 ${user?.accent && !isValidHex ? "border-red-500" : ""}`}
        />
        <div className="ml-2 mt-1 h-[12px] w-[18px]">
          {isValidHex && user?.accent && <Check className="h-full w-full" />}
        </div>
      </div>
      <div className="font-default flex">
        <div
          className={`mr-[43px] cursor-pointer ${isValidHex || !user?.accent ? "font-default" : "font-gray"}`}
          onClick={() => {
            if (isValidHex || !user?.accent) {
              setStep(12);
            }
          }}
        >
          Next
        </div>
        <div className="cursor-pointer" onClick={() => setStep(10)}>
          Go back
        </div>
      </div>
    </div>
  );
};

export default Step11;
