import { useEffect, useState } from "react";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { useDispatch, useSelector } from "react-redux";
import { setFocusMusic } from "../../../../../store/focuspage/focuspageSlice";
import { useNavigate } from "react-router";


export default function Step5() {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    let music = useSelector(state => state.focuspage.music)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (music?.avatarPreview) {
            // if (typeof music.avatar === "string") {
            //     setPreview(music.avatar);
            // } else if (music.avatar instanceof Blob) {
            //     setPreview(URL.createObjectURL(music.avatar));
            // }
            setPreview(music?.avatarPreview);
        }
    }, [music?.avatar]);

    const changeAvatar = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            dispatch(setFocusMusic({ avatar: selectedFile }));
            dispatch(setFocusMusic({ avatarPreview: URL.createObjectURL(selectedFile) }));
            // setUser({ ...music, avatar: selectedFile });
        }
    };

    const handleNext = async () => {
        if (music?.type === "single") {
            navigate("/focus-page/music-type/step6")
        } else {
            navigate("/focus-page/music-type/step8")
        }
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
                        className={`mr-[43px] cursor-pointer ${(file || music?.avatar) ? 'font-default' : 'font-gray'}`}
                        onClick={() => {
                            if (file || music?.avatar) {
                                handleNext();
                            }
                        }}
                    >
                        Next
                    </div>

                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/music-type/step4")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

