import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DizeeInput2, maxLength } from '../../DixeeInput2';
import { useNavigate } from 'react-router';
import { setWholeFocusMusic, updateMusicOverlay } from '../../../store/focuspage/focuspageSlice';
import { setErrorAlert, setLoader } from '../../../store/alert/alertSlice';
import { uploadImage } from '../../../utils/upload';
import { update_focus_data_thunk } from '../../../store/focuspage/focuspageThunk';
import ImageEditCard from '../../Main/ArticleEdit/ImageEditCard';
import Check from '../../../svg/Check';

export default function MusicEdit({ musicArticle }) {
    const token = localStorage.getItem('dizeeToken');
    const focusdata = useSelector((state) => state.focuspage.focusData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            dispatch(updateMusicOverlay(false));
        }
    };


    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const updatedAvatar = URL.createObjectURL(file);

            // Create a new music array with the updated avatar
            const updatedMusic = musicArticle.music.map((musicItem, index) =>
                index === 0 ? { ...musicItem, avatar: updatedAvatar } : musicItem
            );
            // Dispatch the updated musicArticle with the new music array
            dispatch(setWholeFocusMusic({ ...musicArticle, music: updatedMusic }));

            // Set the selected image (if needed for other purposes)
            setSelectedImage(file);
        }
    };


    const updateUserArticle = async () => {
        dispatch(updateMusicOverlay(false));

        let updatedMusic = focusdata?.music?.map((e) => {
            if (e?.extension === musicArticle?.extension) {
                return musicArticle; // Replace the matching element with musicArticle
            }
            return e; // Return the original element if it doesn't match
        });

        let body = { ...focusdata, music: updatedMusic }; // Initial body with updated music

        // Check if the avatar is a blob (indicating it needs to be uploaded)
        if (musicArticle?.music[0]?.avatar.includes('blob')) {
            dispatch(setLoader(true));
            let url = await uploadImage(selectedImage);
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }

            // Create a new music array with the updated avatar for the first item
            const updatedMusicArray = musicArticle.music.map((musicItem, index) =>
                index === 0 ? { ...musicItem, avatar: url } : musicItem
            );

            // Update the musicArticle with the new music array
            const updatedMusicArticle = { ...musicArticle, music: updatedMusicArray };

            // Update the focusdata music array with the updated musicArticle
            updatedMusic = focusdata?.music?.map((e) => {
                if (e?.extension === musicArticle?.extension) {
                    return updatedMusicArticle;
                }
                return e;
            });

            // Update the body with the new music array
            body = { ...focusdata, music: updatedMusic };

            dispatch(setWholeFocusMusic(updatedMusicArticle)); // Update the store with the new musicArticle
        }

        // Dispatch the thunk with the updated body
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
                    <p className="">Header subtitle</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Header subtitle"
                        className="dizee-input"
                        value={maxLength(musicArticle?.music[0]?.artist, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedMusic = musicArticle.music.map((item, index) =>
                                index === 0 ? { ...item, artist: e.target.value } : item
                            );
                            dispatch(setWholeFocusMusic({ ...musicArticle, music: updatedMusic }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="">Header title</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Header title"
                        className="dizee-input"
                        value={musicArticle?.music[0]?.title} // Adjust the max length here
                        // value={maxLength(musicArticle?.music[0]?.title, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedMusic = musicArticle.music.map((item, index) =>
                                index === 0 ? { ...item, title: e.target.value } : item
                            );
                            dispatch(setWholeFocusMusic({ ...musicArticle, music: updatedMusic }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p>Header display</p>
                    <div className='flex pr-[20px]'>
                        <div className="flex items-center  cursor-pointer" onClick={() => dispatch(setWholeFocusMusic({ ...musicArticle, headeractive: true }))}>
                            <span className="mr-2">Active</span>
                            {musicArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => dispatch(setWholeFocusMusic({ ...musicArticle, headeractive: false }))}>
                            <span className="mr-2">Inactive</span>
                            {!musicArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                    </div>
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Background color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={musicArticle?.background ? `#${musicArticle?.background}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusMusic({ ...musicArticle, background: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Accent color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={musicArticle?.accent ? `#${musicArticle?.accent}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusMusic({ ...musicArticle, accent: colorValue }));
                        }}
                    />
                </div>

                <ImageEditCard
                    txt="Edit Image"
                    dotimgclss={false}
                    onImageChange={handleImageChange}
                    imagePreview={musicArticle?.music[0]?.avatar}
                // resetImage={resetImage}
                />
                <div className='pb-[10px] flex justify-between'>
                    {musicArticle?.unpublish
                        ? <button className="" onClick={() => dispatch(setWholeFocusMusic({ ...musicArticle, unpublish: false }))}>publish</button>
                        : <button className="" onClick={() => dispatch(setWholeFocusMusic({ ...musicArticle, unpublish: true }))}>unpublish</button>}

                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Add collaborator</p>

                </div>
                {/* <p className="pb-[20px] cursor-pointer" onClick={() => navigate('/social-edit')}>Edit socials</p> */}
                <button className="cursor-pointer " onClick={updateUserArticle}>Done</button>
            </div>
        </div>
    )
}
