import DizeeInput from "../../../components/DizeeInput";

const Step8 = ({ setStep, setUser, user }) => {
  return (
    <div>
      <div className="font-default mb-9">Connect your socials</div>
      <div className="mb-20 flex font-default">
        <div className="mr-2">@</div>
        <DizeeInput
          placeholder={"youraccount"}
          value={user?.social?.name}
          onChange={(e) =>
            setUser({
              ...user,
              social: {
                ...user?.social,
                name: e.target.value,
                ig: e.target.value,
                tt: e.target.value,
                x: e.target.value,
                fb: e.target.value,
                sc: e.target.value,
                yt: e.target.value,
                sf: e.target.value,
                am: e.target.value,
                th: e.target.value,
                li: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="font-default flex">
        <div className="mr-[43px] cursor-pointer" onClick={() => setStep(9)}>
          Next
        </div>
        <div className="cursor-pointer" onClick={() => setStep(7)}>
          Go back
        </div>
      </div>
    </div>
  );
};

export default Step8;
