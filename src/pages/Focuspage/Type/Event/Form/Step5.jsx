import { useEffect, useState } from "react";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { useDispatch, useSelector } from "react-redux";
import { setFocusEvent, setFocusMusic, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useNavigate } from "react-router";


export default function Step5() {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    let event = useSelector(state => state.focuspage.event)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (event?.avatarPreview) {
            // if (typeof event.avatar === "string") {
            //     setPreview(event.avatar);
            // } else if (event.avatar instanceof Blob) {
            //     setPreview(URL.createObjectURL(event.avatar));
            // }
            setPreview(event?.avatarPreview);
        }
    }, [event?.avatar]);

    const changeAvatar = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            dispatch(setFocusEvent({ avatar: selectedFile }));
            dispatch(setFocusEvent({ avatarPreview: URL.createObjectURL(selectedFile) }));
            // setUser({ ...event, avatar: selectedFile });
        }
    };

    const handleNext = async () => {
        navigate("/focus-page/event-type/step6")
    };


    return (
        <LayoutHeader>

            <div className="flex flex-col justify-center  h-[85vh]">
                <div
                    className="font-default mb-9 cursor-pointer"
                    onClick={() => document.getElementById("avatar").click()}
                >
                    {preview ? "Change header picture" : "Upload header picture"}
                </div>
                <input
                    type="file"
                    className="hidden"
                    id="avatar"
                    onChange={changeAvatar}
                />
                <div className="profile-picture mb-9 min-h-[100px]">
                    <div className="avatar">
                        {preview && (
                            <img
                                src={preview}
                                className="h-[80px] w-[80px] rounded-full"
                                alt="avatar"
                            />
                        )}
                    </div>
                </div>
                <div className="font-default flex">
                    <div
                        className={`mr-[43px] cursor-pointer ${(file || event?.avatar) ? 'font-default' : 'font-gray'}`}
                        onClick={() => {
                            if (file || event?.avatar) {
                                handleNext();
                            }
                        }}
                    >
                        Next
                    </div>

                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/event-type/step4")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

