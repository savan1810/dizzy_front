import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusEvent } from "../../../../../store/focuspage/focuspageSlice";
import { useEffect, useState } from "react";

export default function Step3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let event = useSelector(state => state.focuspage.event);
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (event?.background) {
            setIsValid(true)
        }
    }, [])

    const isValidHex = (hex) => {
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    };

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        dispatch(setFocusEvent({ background: value }));
        if (isValidHex(value)) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    };

    return (
        <LayoutHeader>
            <div className="flex flex-col justify-center h-[85vh]">
                <div className="font-default mb-9">Add a background color</div>
                <div className="mb-20 flex font-default">
                    #
                    <DizeeInput
                        placeholder={"FFFFFF"}
                        onChange={handleChange}
                        value={event?.background}
                    />
                    {event?.background && isValid && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${event?.background && isValid ? "font-default" : "font-gray"}`}
                        onClick={() => event?.background && isValid && navigate("/focus-page/event-type/step4")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/event-type/step2")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>
    );
};
