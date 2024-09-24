import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusMusic, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useEffect, useState } from "react";

export default function Step3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let product = useSelector(state => state.focuspage.product)
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (product?.background) {
            setIsValid(true)
        }
    }, [])

    const isValidHex = (hex) => {
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    };
    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        dispatch(setFocusProduct({ background: value }));
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
                <div className="font-default mb-9">Add a background color</div>
                <div className="mb-20 flex font-default">
                    #
                    <DizeeInput
                        placeholder={"FFFFFF"}
                        onChange={handleChange}
                        value={product?.background}
                    />
                    {product?.background !== undefined && product?.background !== "" && isValid && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${product?.background !== undefined && isValid && product?.background !== ""
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => product?.background !== undefined && product?.background !== "" && isValid && navigate("/focus-page/product-type/step4")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/product-type/step2")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

