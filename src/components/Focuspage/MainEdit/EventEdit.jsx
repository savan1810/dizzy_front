import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DizeeInput2, maxLength } from '../../DixeeInput2';
import { setWholeFocusEvent, updateEventOverlay } from '../../../store/focuspage/focuspageSlice';
import { setErrorAlert, setLoader } from '../../../store/alert/alertSlice';
import { uploadImage } from '../../../utils/upload';
import { update_focus_data_thunk } from '../../../store/focuspage/focuspageThunk';
import ImageEditCard from '../../Main/ArticleEdit/ImageEditCard';
import Check from '../../../svg/Check';

export default function EventEdit({ eventArticle }) {
    const token = localStorage.getItem('dizeeToken');
    const focusdata = useSelector((state) => state.focuspage.focusData);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            dispatch(updateEventOverlay(false));
        }
    };


    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const updatedAvatar = URL.createObjectURL(file);

            dispatch(setWholeFocusEvent({ ...eventArticle, avatar: updatedAvatar }));

            setSelectedImage(file);
        }
    };


    const updateUserArticle = async () => {
        dispatch(updateEventOverlay(false));

        let updatedData = focusdata?.event?.map((e) => {
            if (e?.extension === eventArticle?.extension) {
                return eventArticle;
            }
            return e;
        });

        let body = { ...focusdata, event: updatedData };

        if (eventArticle?.avatar.includes('blob')) {
            dispatch(setLoader(true));
            let url = await uploadImage(selectedImage);
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return
            }

            const updatedDataArticle = { ...eventArticle, avatar: url };

            updatedData = focusdata?.event?.map((e) => {
                if (e?.extension === eventArticle?.extension) {
                    return updatedDataArticle;
                }
                return e;
            });

            body = { ...focusdata, event: updatedData };

            dispatch(setWholeFocusEvent(updatedDataArticle));
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


                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Header display</p>
                    <div className='flex items-center pr-[4px]'>
                        <div className="flex items-center mr-4 cursor-pointer" onClick={() => dispatch(setWholeFocusEvent({ ...eventArticle, headeractive: true }))}>
                            <span className="mr-2">Active</span>
                            {eventArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => dispatch(setWholeFocusEvent({ ...eventArticle, headeractive: false }))}>
                            <span className="mr-2">Inactive</span>
                            {!eventArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                    </div>
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Background color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={eventArticle?.background ? `#${eventArticle?.background}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusEvent({ ...eventArticle, background: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Accent color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={eventArticle?.accent ? `#${eventArticle?.accent}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusEvent({ ...eventArticle, accent: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    {eventArticle?.unpublish
                        ? <button className="" onClick={() => dispatch(setWholeFocusEvent({ ...eventArticle, unpublish: false }))}>publish</button>
                        : <button className="" onClick={() => dispatch(setWholeFocusEvent({ ...eventArticle, unpublish: true }))}>unpublish</button>}

                </div>
                <ImageEditCard
                    txt="Edit Image"
                    dotimgclss={false}
                    onImageChange={handleImageChange}
                    imagePreview={eventArticle?.avatar}
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
