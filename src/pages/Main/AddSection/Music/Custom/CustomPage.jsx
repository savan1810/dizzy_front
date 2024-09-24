import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import CopyLink from '../../../../../svg/CopyLink';
import ImageSelectionCard from '../../../../../components/ImageSelectionCard';
import { useDispatch, useSelector } from 'react-redux';
import AddedMusicCard from '../../../../../components/AddSection/Music/AddedMusicCard';
import { uploadImage } from '../../../../../utils/upload';
import { clearAlerts, setErrorAlert } from '../../../../../store/alert/alertSlice';
import { addMusicToSectionThunk, getMusicThunk } from '../../../../../store/addsection/addsectionThunk';
import MusicOverlay from '../../../../../components/AddSection/Music/MusicOverlay';

export default function CustomPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const music = useSelector((state) => state.addsection.music);
    const dispatch = useDispatch();

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [avtarForBackend, setAvatarForBackend] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };
    useEffect(() => {
        dispatch(clearAlerts())
        dispatch(getMusicThunk({ token }))
    }, [dispatch, token])




    const handleAddMusic = async () => {
        if (!title || !link || !selectedImage || !description) {
            dispatch(setErrorAlert('Please fill all the fields'))
            return
        }
        const url = await uploadImage(selectedImage)
        if (!url) {
            dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
            return

        }
        let links = []
        links.push({
            url: link,
        })
        let payload = {
            type: 2,
            avatar: url,
            title: title,
            links: links,
            artist: description
        }

        dispatch(clearAlerts());
        dispatch(addMusicToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getMusicThunk({ token: token }))
            setTitle('')
            setDescription('')
            setLink('')
            setSelectedImage(null)
            setImagePreview(null)
        })
    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Custom link</p>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => handleAddMusic()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section/add-music')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>

                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add a title"
                                    className="dizee-input w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add a description"
                                    className="dizee-input w-full"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <ImageSelectionCard
                            txt="Add cover image"
                            dotimgclss={false}
                            onImageChange={handleImageChange}
                            imagePreview={imagePreview}
                            resetImage={resetImage}
                        />
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter a link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>
                    </div>

                    {music?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Music</p>
                            </div>
                        </div>
                        {
                            music?.length > 0 && music?.map((item, index) => <AddedMusicCard key={index} music={item} setAvatarForBackend={setAvatarForBackend} setOverlayVisible={setOverlayVisible} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <MusicOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} avtarForBackend={avtarForBackend} />}

        </LayoutHeader>
    );
}
