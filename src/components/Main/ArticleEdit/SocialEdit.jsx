import { useDispatch, useSelector } from "react-redux";
import DizeeInput from "../../DizeeInput";
import { useState } from "react";
import { useNavigate } from "react-router";
import { setUserArticle, updateSocialApiCall } from "../../../store/user/userSlice";

export const SocialEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userArticle = useSelector((state) => state.user?.userArticle);
    const [social, setSocial] = useState(
        userArticle?.social ? userArticle?.social : { ig: "", tt: "", x: "", fb: "", sc: "", yt: "" }
    )

    const handleConfirm = () => {
        dispatch(updateSocialApiCall(true))
        dispatch(setUserArticle({ ...userArticle, social }))
        navigate("/")
    }

    const handleGoBack = () => {
        dispatch(updateSocialApiCall(true))
        navigate("/")
    }

    return (
        <div className="w-full flex justify-center items-center flex-col h-[100vh]">

            <div >
                <div className="font-default mb-9">Confirm or edit your handles</div>
                <div className="mb-9 flex font-default">
                    IG @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.ig}
                        onChange={(e) =>
                            setSocial({ ...social, ig: e.target.value })
                        }
                    />
                </div>
                <div className="mb-9 flex font-default">
                    TT @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.tt}
                        onChange={(e) =>
                            setSocial({ ...social, tt: e.target.value })
                        }
                    />
                </div>
                <div className="mb-9 flex font-default">
                    X &nbsp; @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.x}
                        onChange={(e) => setSocial({ ...social, x: e.target.value })}
                    />
                </div>
                <div className="mb-9 flex font-default">
                    FB @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.fb}
                        onChange={(e) => setSocial({ ...social, fb: e.target.value })}
                    />
                </div>
                <div className="mb-9 flex font-default">
                    SC @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.sc}
                        onChange={(e) => setSocial({ ...social, sc: e.target.value })}
                    />
                </div>
                <div className="mb-20 flex font-default">
                    YT @
                    <DizeeInput
                        placeholder={"youraccount"}
                        value={social?.yt}
                        onChange={(e) => setSocial({ ...social, yt: e.target.value })}
                    />
                </div>
                <div className="font-default flex">
                    <div className="mr-[43px] cursor-pointer" onClick={() => handleConfirm()}>
                        Next
                    </div>
                    <div className="cursor-pointer" onClick={() => handleGoBack()}>
                        Go back
                    </div>
                </div>
            </div>
        </div>

    );
};

