import DizeeInput from "../../../../components/DizeeInput";
import FooterComment from "../../footerComment";

const Interest = ({ setStep, setUser, user }) => {
    // Function to handle interest input changes
    const handleInterestChange = (index, value) => {
        const updatedInterests = [...(user?.social?.interest || [])];
        updatedInterests[index] = value;
        setUser({ ...user, social: { ...user.social, interest: updatedInterests } });
    };

    // Function to handle form submission (triggered by pressing Enter)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        setStep(22); // Move to the next step when Enter is pressed
    };

    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div className="flex-grow flex justify-center items-center">
                <div>
                    <div className="font-default w-full mb-9">Select all of your interests</div>

                    {/* Form element to capture Enter key press */}
                    <form onSubmit={handleSubmit}>
                        {/* Scrollable section */}
                        <div className="scrollable-section mb-9 w-full flex flex-col gap-y-8" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
                            {[...Array(8)].map((_, index) => (
                                <div className="flex font-default gap-x-[10px]" key={index}>
                                    <DizeeInput
                                        placeholder={`Interest ${index + 1}`}
                                        value={user?.social?.interest?.[index] || ""}
                                        onChange={(e) => handleInterestChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Buttons for Next and Go Back */}
                        <div className="font-default flex">
                            <button type="submit" className="mr-[43px] cursor-pointer">
                                Next
                            </button>
                            <div className="cursor-pointer" onClick={() => setStep(2)}>
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

export default Interest;
