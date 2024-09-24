import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DizeeInput2, maxLength } from '../../DixeeInput2';
import { setWholeFocusNewsletter, updateNewsletterOverlay } from '../../../store/focuspage/focuspageSlice';
import { setErrorAlert, setLoader } from '../../../store/alert/alertSlice';
import { uploadImage } from '../../../utils/upload';
import { update_focus_data_thunk } from '../../../store/focuspage/focuspageThunk';
import ImageEditCard from '../../Main/ArticleEdit/ImageEditCard';
import Check from '../../../svg/Check';

export default function NewsletterEdit({ newsletterArticle }) {
    const token = localStorage.getItem('dizeeToken');
    const focusdata = useSelector((state) => state.focuspage.focusData);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            dispatch(updateNewsletterOverlay(false));
        }
    };


    const handleImageChange = (newsletter) => {
        const files = newsletter.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const updatedAvatar = URL.createObjectURL(file);

            dispatch(setWholeFocusNewsletter({ ...newsletterArticle, avatar: updatedAvatar }));

            setSelectedImage(file);
        }
    };


    const updateUserArticle = async () => {
        dispatch(updateNewsletterOverlay(false));

        let updatedData = focusdata?.newsletter?.map((e) => {
            if (e?.extension === newsletterArticle?.extension) {
                return newsletterArticle;
            }
            return e;
        });

        let body = { ...focusdata, newsletter: updatedData };

        if (newsletterArticle?.avatar.includes('blob')) {
            dispatch(setLoader(true));
            let url = await uploadImage(selectedImage);
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }

            const updatedDataArticle = { ...newsletterArticle, avatar: url };

            updatedData = focusdata?.newsletter?.map((e) => {
                if (e?.extension === newsletterArticle?.extension) {
                    return updatedDataArticle;
                }
                return e;
            });

            body = { ...focusdata, newsletter: updatedData };

            dispatch(setWholeFocusNewsletter(updatedDataArticle));
        }

        dispatch(update_focus_data_thunk({ token, body }));
    };


    return (
        <div
            id="overlay"
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-1"
            onClick={handleOverlayClick}
        >
            <div className="p-6 rounded-md w-[90%] max-w-[390px] space-y-[50px] text-white text-[12px]" onClick={e => e.stopPropagation()}>

                {/* <p className="cursor-pointer pb-[10px]" >Edit image</p> */}

                <div className='pb-[10px] flex justify-between'>
                    <p className="">Header title</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Header title"
                        className="dizee-input"
                        value={newsletterArticle?.newsletter[0]?.title} // Adjust the max length here
                        // value={maxLength(newsletterArticle?.newsletter[0]?.title, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedData = newsletterArticle.newsletter.map((item, index) =>
                                index === 0 ? { ...item, title: e.target.value } : item
                            );
                            dispatch(setWholeFocusNewsletter({ ...newsletterArticle, newsletter: updatedData }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="">Header subtitle</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Header subtitle"
                        className="dizee-input"
                        value={maxLength(newsletterArticle?.newsletter[0]?.newsletterType, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedData = newsletterArticle.newsletter.map((item, index) =>
                                index === 0 ? { ...item, newsletterType: e.target.value } : item
                            );
                            dispatch(setWholeFocusNewsletter({ ...newsletterArticle, newsletter: updatedData }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Header display</p>
                    <div className='flex pr-[5px]'>
                        <div className="flex items-center mr-4 cursor-pointer" onClick={() => dispatch(setWholeFocusNewsletter({ ...newsletterArticle, headeractive: true }))}>
                            <span className="mr-2">Active</span>
                            {newsletterArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => dispatch(setWholeFocusNewsletter({ ...newsletterArticle, headeractive: false }))}>
                            <span className="mr-2">Inactive</span>
                            {!newsletterArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                    </div>
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Background color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={newsletterArticle?.background ? `#${newsletterArticle?.background}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusNewsletter({ ...newsletterArticle, background: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Accent color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={newsletterArticle?.accent ? `#${newsletterArticle?.accent}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusNewsletter({ ...newsletterArticle, accent: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    {newsletterArticle?.unpublish
                        ? <button className="" onClick={() => dispatch(setWholeFocusNewsletter({ ...newsletterArticle, unpublish: false }))}>publish</button>
                        : <button className="" onClick={() => dispatch(setWholeFocusNewsletter({ ...newsletterArticle, unpublish: true }))}>unpublish</button>}

                </div>
                <ImageEditCard
                    txt="Edit Image"
                    dotimgclss={false}
                    onImageChange={handleImageChange}
                    imagePreview={newsletterArticle?.avatar}
                // resetImage={resetImage}
                />
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Add collaborator</p>

                </div>
                {/* <p className="pb-[20px] cursor-pointer" onClick={() => navigate('/social-edit')}>Edit socials</p> */}
                <button className="cursor-pointer " onClick={updateUserArticle}>Done</button>
            </div>
        </div>
    )
}
