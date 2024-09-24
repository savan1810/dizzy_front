import { useEffect, useState } from "react";
import LayoutHeader from "../../../../../layout/LayoutHeader";
import { useDispatch, useSelector } from "react-redux";
import { setFocusMusic, setFocusNewsletter, setFocusProduct } from "../../../../../store/focuspage/focuspageSlice";
import { useNavigate } from "react-router";


export default function Step5() {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    let newsletter = useSelector(state => state.focuspage.newsletter)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (newsletter?.avatarPreview) {
            // if (typeof newsletter.avatar === "string") {
            //     setPreview(newsletter.avatar);
            // } else if (newsletter.avatar instanceof Blob) {
            //     setPreview(URL.createObjectURL(newsletter.avatar));
            // }
            setPreview(newsletter?.avatarPreview);
        }
    }, [newsletter?.avatar]);

    const changeAvatar = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            dispatch(setFocusNewsletter({ avatar: selectedFile }));
            dispatch(setFocusNewsletter({ avatarPreview: URL.createObjectURL(selectedFile) }));
            // setUser({ ...newsletter, avatar: selectedFile });
        }
    };

    const handleNext = async () => {
        navigate("/focus-page/newsletter-type/step6")
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
                        className={`mr-[43px] cursor-pointer ${(file || newsletter?.avatar) ? 'font-default' : 'font-gray'}`}
                        onClick={() => {
                            if (file || newsletter?.avatar) {
                                handleNext();
                            }
                        }}
                    >
                        Next
                    </div>

                    <div className="cursor-pointer" onClick={() => navigate("/focus-page/newsletter-type/step4")}>
                        Go back
                    </div>
                </div>
            </div>
        </LayoutHeader>

    );
};

