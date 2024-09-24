import React, { useEffect, useState } from 'react'
import LayoutHeader from '../../../../layout/LayoutHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { DizeeInput2 } from '../../../../components/DixeeInput2';
import { setUserArticle } from '../../../../store/user/userSlice';
import ImageEditCard from '../../../../components/Main/ArticleEdit/ImageEditCard';
import ImageCard from '../../../../components/More/ImageCard';
import { get_user_articles_thunk, update_user_article_thunk } from '../../../../store/user/userThunk';
import { setErrorAlert, setLoader } from '../../../../store/alert/alertSlice';
import { uploadImage } from '../../../../utils/upload';
import DizeeInput from '../../../../components/DizeeInput';
import axios from "../../../../utils/axios";
import Check from '../../../../svg/Check';

export default function Profile() {
    const token = localStorage.getItem('dizeeToken')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [domain, setDomain] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const userArticle = useSelector((state) => state.user.userArticle);
    const [selectedImage, setSelectedImage] = useState(null);
    const [domainAvailable, setDomainAvailable] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(true);

    useEffect(() => {
        dispatch(get_user_articles_thunk({ token })).then((res) => {
            setDomain(res?.domain)
            setEmail(res?.email)
            setUsername(res?.username)
        });
    }, [])


    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedImage(file);
            dispatch(setUserArticle({ ...userArticle, avatar: URL.createObjectURL(file) }));
        }
    };

    const updateUserArticle = async () => {

        if (!domainAvailable) {
            dispatch(setErrorAlert("Domain is already exist"))
            return
        }
        if (!usernameAvailable) {
            dispatch(setErrorAlert("username is already exist"))
            return

        }
        if (!emailAvailable) {
            dispatch(setErrorAlert("email is already exist"))
            return

        }

        let body = userArticle
        if (userArticle?.avatar?.includes('blob')) {
            dispatch(setLoader(true))
            let url = await uploadImage(selectedImage)
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
            dispatch(setUserArticle({ ...userArticle, avatar: url }));
            body = { ...userArticle, avatar: url }
        }
        dispatch(update_user_article_thunk({ token, body }));
    }

    const handleDomainChange = async (e) => {
        const domain = e.target.value;
        dispatch(setUserArticle({ ...userArticle, domain }));

        try {
            const res = await axios.post("/auth/checkdomain", { domain });
            if (res.data.data.success && !res.data.data.exist) {
                setDomainAvailable(true);
            } else {
                setDomainAvailable(false);
            }
        } catch (error) {
            console.error('Error checking domain:', error);
            setDomainAvailable(false);
        }
    };
    const handleUsernameChange = async (e) => {
        const username = e.target.value;
        dispatch(setUserArticle({ ...userArticle, username }));

        try {
            const res = await axios.post("/auth/checkUserName", { username });
            if (!res.data.data.exist) {
                setUsernameAvailable(true);
            } else {
                setUsernameAvailable(false);
            }
        } catch (error) {
            console.error('Error checking domain:', error);
            setUsernameAvailable(false);
        }
    };
    const handleEmailChange = async (e) => {
        const email = e.target.value;
        dispatch(setUserArticle({ ...userArticle, email }));

        try {
            const res = await axios.get(`/auth/checkemail?email=${email}`);
            dispatch(setLoader(false));
            if (res.data.status === 200) {
                setEmailAvailable(true);
                // Optionally add success alert here if needed
                // thunkAPI.dispatch(setSuccessAlert(res.data.message));
            }
            else {
                setEmailAvailable(false);
            }
        } catch (error) {
            console.error('Error checking domain:', error);
            // dispatch(checkDomain(false));
            setEmailAvailable(false);
        }
    };

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0] text-white gap-y-[125px]">
                <div className='px-4 mt-[50px] flex w-full justify-between'>
                    <p className='text-white'>Profile</p>
                    <div className='flex gap-[20px]'>
                        <button className='text-white cursor-pointer' onClick={updateUserArticle}>Confirm</button>
                        <p onClick={() => navigate('/more/setting')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>

                <div className='flex flex-col w-full gap-y-[52px] px-4 '>
                    <div className='flex justify-between items-center'>

                        <ImageCard
                            txt="Edit Image"
                            dotimgclss={false}
                            onImageChange={handleImageChange}
                            imagePreview={userArticle?.avatar}

                        />

                    </div>
                    <div className='flex justify-between items-center'>
                        <button>Edit name</button>
                        <div className='relative flex gap-x-1 '>
                            <DizeeInput2
                                label="Link"
                                placeholder="Edit name"
                                className="dizee-input text-right"
                                value={userArticle?.username}
                                onChange={handleUsernameChange}
                            />
                            {usernameAvailable && (
                                <Check className='h-[12px] w-[18px] cursor-pointer absolute right-[-24px] mt-[5px]' />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <button>Change domain</button>
                        <div className='relative flex gap-x-1 '>
                            {/* diz.ee/ */}
                            <DizeeInput2
                                label="Link"
                                placeholder="Change domain"
                                className="dizee-input text-right"
                                value={userArticle?.domain}
                                onChange={handleDomainChange}
                            />
                            {domainAvailable && (
                                <Check className='h-[12px] w-[18px] cursor-pointer absolute right-[-24px] mt-[5px]' />
                            )}

                        </div>

                    </div>
                    <div className='flex justify-between items-center'>
                        <button>Update email</button>
                        <div className='relative flex gap-x-1 '>
                            <DizeeInput2
                                label="Link"
                                placeholder="Update email"
                                className="dizee-input text-right"
                                value={userArticle?.email}
                                onChange={handleEmailChange}
                            />
                            {emailAvailable && (
                                <Check className='h-[12px] w-[18px] cursor-pointer absolute right-[-24px] mt-[5px]' />
                            )}
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <button onClick={() => navigate('/more/setting/profile-edit')}>Change phone number</button>
                    </div>
                </div>

            </div>
        </LayoutHeader>
    )
}
