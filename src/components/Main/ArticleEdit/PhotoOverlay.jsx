import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { DizeeInput2 } from '../../DixeeInput2';
import { setUserArticle, updatePhotoOverlay } from '../../../store/user/userSlice';
import ImageEditCard from './ImageEditCard';
import { update_user_article_thunk } from '../../../store/user/userThunk';
import { uploadImage } from '../../../utils/upload';
import { setErrorAlert, setLoader } from '../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';

export default function PhotoOverlay({ userArticle }) {
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            dispatch(updatePhotoOverlay(false));
        }
    };


    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedImage(file);
            dispatch(setUserArticle({ ...userArticle, avatar: URL.createObjectURL(file) }));
        }
    };

    const updateUserArticle = async () => {
        dispatch(updatePhotoOverlay(false));

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
    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-20"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>
                <ImageEditCard
                    txt="Edit Image"
                    dotimgclss={false}
                    onImageChange={handleImageChange}
                    imagePreview={userArticle?.avatar}
                // resetImage={resetImage}
                />
                {/* <p className="cursor-pointer pb-[10px]" >Edit image</p> */}
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Header title</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input "
                        value={userArticle?.username}
                        onChange={(e) => dispatch(setUserArticle({ ...userArticle, username: e.target.value }))}
                    // onChange={(e) => dispatch(updateTitle(e.target.value))}
                    />
                    {/* <p className="" >title</p> */}
                </div>


                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Background color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="background color"
                        className="dizee-input"
                        value={userArticle?.background ? `#${userArticle?.background}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setUserArticle({ ...userArticle, background: colorValue }));
                        }}
                    />

                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Accent color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="accent color"
                        className="dizee-input"
                        value={userArticle?.accent ? `#${userArticle?.accent}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setUserArticle({ ...userArticle, accent: colorValue }));
                        }}
                    />
                </div>
                <p className="pb-[20px] cursor-pointer" onClick={() => navigate('/social-edit')}>Edit socials</p>
                <button className="cursor-pointer " onClick={updateUserArticle}>Done</button>
            </div>
        </div>
    )
}
