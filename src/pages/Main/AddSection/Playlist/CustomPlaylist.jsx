import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { DizeeInput2, DizeeNumberInput } from '../../../../components/DixeeInput2';
import CopyLink from '../../../../svg/CopyLink';
import ImageSelectionCard from '../../../../components/ImageSelectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../../utils/upload';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../store/alert/alertSlice';
import AddedProductCard from '../../../../components/AddSection/Product/AddedProductCard';
import ProductOverlay from '../../../../components/AddSection/Product/ProductOverlay';
import { addPlaylistToSectionThunk, getPlaylistThunk } from '../../../../store/addsection/addsectionThunk';
import LayoutHeader from '../../../../layout/LayoutHeader';
import PlaylistOverlay from '../../../../components/AddSection/Playlist/PlaylistOverlay';


export default function CustomPlaylist() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [previousUrl, setPreviousUrl] = useState('');
    const [previousSource, setPreviousSource] = useState('');

    const playlist = useSelector((state) => state.addsection.playlist);
    const dispatch = useDispatch();

    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState('');

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
        dispatch(getPlaylistThunk({ token }))
    }, [dispatch, token])

    const filterLink = (link) => {
        if (playlist?.length > 0) {
            for (let m of playlist) {
                for (let musicLink of m.links) {
                    if (musicLink.url === link) {
                        return true;
                    }
                }
            }
        }
        return false;
    };



    const handleAddProduct = async () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }

        if (!title || !link || (!selectedImage && !imagePreview)) {
            dispatch(setErrorAlert('Please fill all the fields'))
            return
        }
        dispatch(setLoader(true))
        let url = '';
        if (selectedImage) {
            url = await uploadImage(selectedImage)
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
        }
        let payload = {
            type: 0,
            title: title,
            image: url ? url : imagePreview,
            links: [
                {
                    source: previousSource ? previousSource : 'custom',
                    url: link
                }
            ]
        }

        dispatch(addPlaylistToSectionThunk({ token: token, payload: payload, previousUrl: previousUrl })).then(() => {
            dispatch(getPlaylistThunk({ token: token }))
            setLink('')
            setTitle('')
            setSelectedImage(null)
            setImagePreview(null)
        })
    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>

                        <span className='text-white'>Custom product</span>
                    </div>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => handleAddProduct()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section')} className='text-white cursor-pointer'>Go back</p>
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
                        <ImageSelectionCard
                            txt="Add cover image"
                            dotimgclss={false}
                            onImageChange={handleImageChange}
                            imagePreview={imagePreview}
                            resetImage={resetImage}
                        />
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Enter a playlist link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>

                    </div>
                    {playlist?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Products</p>
                            </div>
                        </div>
                        {
                            playlist?.length > 0 && playlist?.map((item, index) => <AddedProductCard key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} setPreviousUrl={setPreviousUrl} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <PlaylistOverlay setOverlayVisible={setOverlayVisible} previousUrl={previousUrl} itemForBackend={itemForBackend} setLink={setLink} setTitle={setTitle} setImagePreview={setImagePreview} setSelectedImage={setSelectedImage} setPreviousUrl={setPreviousUrl} setPreviousSource={setPreviousSource} />}

        </LayoutHeader>
    );
}
