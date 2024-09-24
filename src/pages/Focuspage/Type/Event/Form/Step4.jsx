import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusEvent, setFocusMusic, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useEffect, useState } from "react";

export default function Step4() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let event = useSelector(state => state.focuspage.event)
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (event?.accent) {
            setIsValid(true)
        }
    }, [])

    const isValidHex = (hex) => {
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    };

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        dispatch(setFocusEvent({ accent: value }));
        if (isValidHex(value)) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
    };

    return (
        <LayoutHeader>

            <div className="flex flex-col justify-center  h-[85vh]">
                <div className="font-default mb-9">Add accent color</div>
                <div className="mb-20 flex font-default">
                    #
                    <DizeeInput
                        placeholder={"FFFFFF"}
                        onChange={handleChange}
                        value={event?.accent}
                    />
                    {event?.accent !== undefined && event?.accent !== "" && isValid && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${event?.accent !== undefined && event?.accent !== "" && isValid
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => event?.accent !== undefined && event?.accent !== "" && isValid && navigate("/focus-page/event-type/step5")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/event-type/step3")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

