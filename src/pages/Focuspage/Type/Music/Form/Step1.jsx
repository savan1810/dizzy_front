import { useNavigate } from "react-router";
import Check from "../../../../../svg/Check";
import DizeeInput from "../../../../../components/DizeeInput";
import { useDispatch, useSelector } from "react-redux";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { setFocusMusic } from "../../../../../store/focuspage/focuspageSlice";
import { useState } from "react";
import { checkExtensionAvailableForMusicThunk } from "../../../../../store/focuspage/focuspageThunk";

export default function Step1() {
    let user = localStorage.getItem("dizeeUser")
    let token = localStorage.getItem("dizeeToken")
    user = JSON.parse(user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [extension, setExtension] = useState(true);
    let music = useSelector(state => state.focuspage.music)

    const handleChange = (e) => {
        dispatch(setFocusMusic({ extension: e.target.value }));
        dispatch(checkExtensionAvailableForMusicThunk({ extension: e.target.value, token })).then(
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
                        placeholder={"music"}
                        onChange={handleChange}
                        value={music?.extension}
                    />
                    {music?.extension !== undefined && music?.extension !== "" && extension && <Check className="h-[12px] w-[18px] ml-2" />}
                </div>
                <div className="font-default flex">
                    <div
                        className={`cursor-pointer mr-[43px] ${music?.extension !== undefined && music?.extension !== "" && extension
                            ? "font-default"
                            : "font-gray"
                            }`}
                        onClick={() => (music?.extension !== undefined && music?.extension !== "") && extension && navigate("/focus-page/music-type/step2")}
                    >
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/music-type")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>
    );
};

