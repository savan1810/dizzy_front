import React from 'react'

export default function Template({ setStep, setUser, user }) {
    console.log('user', user)
    return (
        <div className="h-screen flex flex-col justify-between relative ">
            <div className="font-default
font-default
font-default h-screen flex flex-col justify-between px-[50px] mt-[100px]" style={{ backgroundColor: `#${user?.background}`, color: `#${user?.accent}` }}>
                <div className="flex-grow flex justify-center items-center mb-[100px]">

                    <div>
                        <div className=" mb-9">
                            DARK
                        </div>
                        <div className=" mb-9">
                            FOR PRESENTATION PURPOSES ONLY
                        </div>

                        <div className=" flex">
                            <div
                                className={`cursor-pointer mr-[43px]`}
                                onClick={() => setStep(8)}
                            >
                                Select
                            </div>
                            <div className="cursor-pointer" onClick={() => setStep(6)}>
                                Go back
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-[50px] right-0 space-y-[15px] mb-4">
                    <div className="flex flex-row gap-x-[10px]">
                        <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
