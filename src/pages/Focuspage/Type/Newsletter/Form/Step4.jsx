import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusMusic, setFocusNewsletter, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useEffect, useState } from "react";

export default function Step4() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let newsletter = useSelector(state => state.focuspage.newsletter)
    const [isValid, setIsValid] = useState(false);


    useEffect(() => {
        if (newsletter?.accent) {
            setIsValid(true)
        }
    }, [])

    const isValidHex = (hex) => {
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    };

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        dispatch(setFocusNewsletter({ accent: value }));
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
                        value={newsletter?.accent}
                    />
                    {newsletter?.accent !== undefined && newsletter?.accent !== "" && isValid && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${newsletter?.accent !== undefined && newsletter?.accent !== "" && isValid
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => newsletter?.accent !== undefined && newsletter?.accent !== "" && isValid && navigate("/focus-page/newsletter-type/step5")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/newsletter-type/step3")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

