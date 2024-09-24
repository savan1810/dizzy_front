import Check from "../../../../svg/Check";

const ColorTemplate = ({ setStep, setUser, user }) => {
    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div className="flex-grow flex justify-center items-center">
                <div className=" w-[300px]">
                    <div className="font-default mb-9">Select a color template</div>
                    <div className="mb-10 flex flex-col gap-y-[20px] font-default">
                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "0D0D0D", accent: "FFFFFF" })}
                            >
                                Dark
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "0D0D0D" && user.accent === "FFFFFF" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="w-[20px] h-[20px] border rounded-full z-10 bg-[#0D0D0D]">
                                </div>
                                <div className="w-[20px] h-[20px] border rounded-full bg-white ml-[-5px]">
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "FFFFFF", accent: "0D0D0D", })}

                            >
                                Light
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "FFFFFF" && user.accent === "0D0D0D" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="w-[20px] h-[20px] border rounded-full z-10 bg-white">
                                </div>
                                <div className="w-[20px] h-[20px] border rounded-full bg-[#0D0D0D] ml-[-5px]">
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "B22222", accent: "FF6B6B" })}
                            >
                                Warm
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "B22222" && user.accent === "FF6B6B" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="w-[20px] h-[20px] border rounded-full z-10 bg-[#B22222]">
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full bg-[#FF6B6B] ml-[-5px]">
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "2B3A67", accent: "00FFFF" })}
                            >
                                Cool
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "2B3A67" && user.accent === "00FFFF" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="w-[20px] h-[20px] border rounded-full z-10 bg-[#2B3A67]">
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full bg-[#00FFFF] ml-[-5px]">
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "228B22", accent: "FFFFFF" })}
                            >
                                Organic
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "228B22" && user.accent === "FFFFFF" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>
                            <div className="flex ">
                                <div className="w-[20px] h-[20px] border rounded-full z-10 bg-[#228B22]">
                                </div>
                                <div className="w-[20px] h-[20px] rounded-full bg-white ml-[-5px]">
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">

                            <div
                                className="cursor-pointer flex justify-center items-center"
                                onClick={() => setUser({ ...user, background: "000000", accent: "FFFFFF" })}
                            >
                                Custom
                                <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                                    {user.background === "000000" && user.accent === "FFFFFF" && <Check className="h-full w-full mt-[2px]" />}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="font-default flex">
                        <div
                            className={`mr-[43px] cursor-pointer ${user.background !== undefined && user.accent !== undefined ? "font-default" : "font-gray"}`}
                            onClick={() => {
                                if (user.background !== undefined && user.accent !== undefined) {
                                    if (user.background === "000000" && user.accent === "FFFFFF") {
                                        setStep(20)
                                    }
                                    else {
                                        setStep(7);
                                    }
                                }
                            }}
                        >
                            Next
                        </div>
                        <div className="cursor-pointer" onClick={() => setStep(5)}>
                            Go back
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 font-default  mb-4 w-[300px]">
                <div className="flex flex-col gap-y-[25px]">
                    <p className=" ">Example</p>
                    <p className=" ">Select from our curated color palettes or create your own. Your Dizee color palette will be applied to the background and accent colors across all your pages, giving your profile a cohesive and personalized look.</p>
                    <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
                </div>
            </div>
        </div>

    );
};

export default ColorTemplate;
