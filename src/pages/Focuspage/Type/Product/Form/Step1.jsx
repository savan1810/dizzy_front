import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusMusic, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useState } from "react";
import { checkExtensionAvailableForMusicThunk, checkExtensionAvailableForProductThunk } from "../../../../../store/focuspage/focuspageThunk";

export default function Step1() {
    let user = localStorage.getItem("dizeeUser")
    let token = localStorage.getItem("dizeeToken")
    user = JSON.parse(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [extension, setExtension] = useState(true);
    let product = useSelector(state => state.focuspage.product)

    const handleChange = (e) => {
        dispatch(setFocusProduct({ extension: e.target.value }));
        dispatch(checkExtensionAvailableForProductThunk({ extension: e.target.value, token })).then(
            (res) => {
                if (res.payload.status === 200) {
                    setExtension(true);
                } else {
                    setExtension(false);
                }
            }
        )
    };


    return (
        <LayoutHeader>
            <div className="flex flex-col justify-center  h-[85vh]">
                <div className="font-default mb-9">Add your extension</div>
                <div className="mb-20 flex font-default">
                    diz.ee/{user?.domain}/
                    <DizeeInput
                        placeholder={"product"}
                        onChange={handleChange}
                        value={product?.extension}
                    />
                    {product?.extension !== undefined && product?.extension !== "" && extension && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${product?.extension !== undefined && product?.extension !== "" && extension
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => (product?.extension !== undefined && product?.extension !== "") && extension && navigate("/focus-page/product-type/step2")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/product-type")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>
    );
};

