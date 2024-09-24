import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { setFocusMusic } from "../../../../../store/focuspage/focuspageSlice";
import { checkPageAvailableForMusicThunk } from "../../../../../store/focuspage/focuspageThunk";
import { useState } from "react";

export default function Step2() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let music = useSelector(state => state.focuspage.music)
    const [page, setPage] = useState(true);
    let token = localStorage.getItem("dizeeToken")


    const handleChange = (e) => {
        dispatch(setFocusMusic({ page: e.target.value }));
        dispatch(checkPageAvailableForMusicThunk({ page: e.target.value, token })).then(
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
                        value={music?.page}
                    />
                    {music?.page !== undefined && music?.page !== "" && page && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${music?.page !== undefined && music?.page !== "" && page
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => (music?.page !== undefined && music?.page !== "") && page && navigate("/focus-page/music-type/step3")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/music-type/step1")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

