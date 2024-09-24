import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import { DizeeInput2 } from '../../../../components/DixeeInput2';
import CopyLink from '../../../../svg/CopyLink';
import ImageSelectionCard from '../../../../components/ImageSelectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../../utils/upload';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../store/alert/alertSlice';
import { addProductToSectionThunk, addSocialFeedToSectionThunk, getProductThunk, getSocialFeedThunk } from '../../../../store/addsection/addsectionThunk';
import AddedProductCard from '../../../../components/AddSection/Product/AddedProductCard';
import ProductOverlay from '../../../../components/AddSection/Product/ProductOverlay';
import AddedSocialFeed from '../../../../components/AddSection/SocialFeed/AddedSocialFeed';
import SocialFeedOverlay from '../../../../components/AddSection/SocialFeed/SocialFeedOverlay';


export default function AddSocialFed() {
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [link, setLink] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [previousUrl, setPreviousUrl] = useState('');

    const socialfeed = useSelector((state) => state.addsection.socialfeed);
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
        dispatch(getProductThunk({ token }))
    }, [dispatch, token])

    const filterLink = (link) => {
        if (socialfeed?.length > 0) {
            for (let m of socialfeed) {
                if (m.links[0].url === link) {
                    return true;
                }
            }
        }
        return false;
    };



    const handleAddSocialFeed = async () => {
        const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }


        if (!link || (!selectedImage && !imagePreview)) {
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
            avatar: url ? url : imagePreview,
            links: [
                {
                    source: 'custom',
                    url: link
                }
            ]
        }

        dispatch(addSocialFeedToSectionThunk({ token: token, payload: payload, previousUrl: previousUrl })).then(() => {
            dispatch(getSocialFeedThunk({ token: token }))
            setLink('')
            setPreviousUrl(null)
            setSelectedImage(null)
            setImagePreview(null)
        })
    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>

                        <span className='text-white'>Social feed</span>
                    </div>
                    <div className='flex gap-[30px]'>
                        <button onClick={() => handleAddSocialFeed()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>
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
                                    placeholder="Enter a link"
                                    className="dizee-input w-full"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                            <CopyLink className='h-[14px] w-[14px] mx-1' />
                        </div>



                    </div>
                    {socialfeed?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Posts</p>
                            </div>
                        </div>
                        {
                            socialfeed?.length > 0 && socialfeed?.map((item, index) => <AddedSocialFeed key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} setPreviousUrl={setPreviousUrl} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <SocialFeedOverlay setOverlayVisible={setOverlayVisible} previousUrl={previousUrl} itemForBackend={itemForBackend} setLink={setLink} setImagePreview={setImagePreview} setSelectedImage={setSelectedImage} setPreviousUrl={setPreviousUrl} />}

        </LayoutHeader>
    );
}
