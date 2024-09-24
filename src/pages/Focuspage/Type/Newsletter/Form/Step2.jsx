import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { setFocusMusic, setFocusNewsletter, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { checkPageAvailableForMusicThunk, checkPageAvailableForNewsletterThunk, checkPageAvailableForProductThunk } from "../../../../../store/focuspage/focuspageThunk";
import { useState } from "react";

export default function Step2() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let newsletter = useSelector(state => state.focuspage.newsletter)
    const [page, setPage] = useState(true);
    let token = localStorage.getItem("dizeeToken")


    const handleChange = (e) => {
        dispatch(setFocusNewsletter({ page: e.target.value }));
        dispatch(checkPageAvailableForNewsletterThunk({ page: e.target.value, token })).then(
            (res) => {
                if (res.payload.status === 200) {
                    setPage(true);
                } else {
                    setPage(false);
                }
            }
        )
    };
    return (
        <LayoutHeader>

            <div className="flex flex-col justify-center  h-[85vh]">
                <div className="font-default mb-9">Name your page</div>
                <div className="mb-20 flex font-default">

                    <DizeeInput
                        placeholder={"my focus page"}
                        onChange={handleChange}
                        value={newsletter?.page}
                    />
                    {newsletter?.page !== undefined && newsletter?.page !== "" && page && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${newsletter?.page !== undefined && newsletter?.page !== "" && page
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => (newsletter?.page !== undefined && newsletter?.page !== "") && page && navigate("/focus-page/newsletter-type/step3")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/newsletter-type/step1")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

