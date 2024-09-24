import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import { DizeeInput2, DizeeNumberInput } from '../../../../../components/DixeeInput2';
import CopyLink from '../../../../../svg/CopyLink';
import ImageSelectionCard from '../../../../../components/ImageSelectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../../../../../utils/upload';
import { clearAlerts, setErrorAlert, setLoader } from '../../../../../store/alert/alertSlice';
import { addProductToSectionThunk, getProductThunk } from '../../../../../store/addsection/addsectionThunk';
import AddedProductCard from '../../../../../components/AddSection/Product/AddedProductCard';
import ProductOverlay from '../../../../../components/AddSection/Product/ProductOverlay';
import FocusAddedProduct from '../../../../../components/Focuspage/Type/Product/FocusAddedProduct';
import { clearFocusSection, setFocusNewsletter, setFocusProduct } from '../../../../../store/focuspage/focuspageSlice';
import { addNewsletterForFocusThunk, addProductForFocusThunk } from '../../../../../store/focuspage/focuspageThunk';
import FocusAddedNewsletter from '../../../../../components/Focuspage/Type/Newsletter/FocusAddedNewsletter';
import FocusNewsOverlay from '../../../../../components/Focuspage/Type/Newsletter/FocusNewsOverlay';


export default function Step6() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [title, setTitle] = useState('');
    const [newsletterType, setNewsletterType] = useState('');
    const [content, setContent] = useState('');
    const dispatch = useDispatch();


    const newsletter = useSelector((state) => state.focuspage?.newsletter);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState(null);
    const [previousUrl, setPreviousUrl] = useState('');

    useEffect(() => {
        dispatch(clearAlerts())
    }, [dispatch, token])

    // const filterLink = (link) => {
    //     if (newsletter?.length > 0) {
    //         for (let m of newsletter) {
    //             for (let musicLink of m.links) {
    //                 if (musicLink.url === link) {
    //                     return true;
    //                 }
    //             }
    //         }
    //     }
    //     return false;
    // };



    const handleAddNewsletter = async () => {
        // const isExistLink = filterLink(link);
        dispatch(clearAlerts());
        // if (!previousUrl) {
        //     if (isExistLink) {
        //         dispatch(setErrorAlert('Link already exist'));
        //         return;
        //     }
        // }

        let updatedData = newsletter?.newsletter || [];

        if (newsletter.type !== 'single' && previousUrl) {
            updatedData = updatedData.filter(item => {
                console.log('item?.title', item?.title);
                console.log('previousUrl', previousUrl);
                return item?.title !== previousUrl;
            });
            console.log('updatedData after filtering', updatedData);
        }


        if (!title || !newsletterType || !content) {
            dispatch(setErrorAlert('Please fill all the fields'))
            return
        }

        let payload = {
            title: title,
            newsletterType: newsletterType,
            content: content,
        }


        if (newsletter?.type === 'single') {
            dispatch(setFocusNewsletter({ newsletter: [payload] }))
        }
        else {
            updatedData = [...updatedData, payload];
            dispatch(setFocusNewsletter({ newsletter: updatedData }));
        }
        setTitle('')
        setNewsletterType('')
        setContent('')
        setPreviousUrl('')

    }

    const handleAddNewsletterFocus = async () => {
        let url = '';
        console.log('newsletter.avatar', newsletter.avatar);
        dispatch(setLoader(true));

        try {
            if (newsletter.avatar) {
                url = await uploadImage(newsletter.avatar);
                if (!url) {
                    dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return

                }
            }
            console.log('url', url);

            // Clone the newsletter to avoid mutating the original object
            const dataCopy = { ...newsletter };

            delete dataCopy.avatar;
            delete dataCopy.avatarPreview;
            dataCopy.avatar = url;
            dataCopy.headeractive = true;

            dispatch(addNewsletterForFocusThunk({ token: token, payload: dataCopy })).then((res) => {
                if (res.payload.status === 200) {
                    dispatch(clearFocusSection())
                    navigate("/focus-page");
                }
            });

        } catch (error) {
            console.error('Error uploading image or adding music:', error);
            // Optionally handle the error (e.g., show a notification)
        } finally {
            console.log('newsletter', newsletter);
            dispatch(setLoader(false));
        }

    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        <span className='text-white'>Newsletter details </span>
                    </div>
                    <div className='flex gap-[20px]'>
                        {newsletter && newsletter?.newsletter?.length > 0 && <button onClick={() => handleAddNewsletterFocus()} className='text-white cursor-pointer' >Done</button>}
                        <button onClick={() => handleAddNewsletter()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section/import-newsletter')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Add title"
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
                                    placeholder="Add newsletter type"
                                    className="dizee-input w-full"
                                    value={newsletterType}
                                    onChange={(e) => setNewsletterType(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeNumberInput
                                    label="Link"
                                    placeholder="Add content (max 1500 characters)"

                                    className="dizee-input w-full"
                                    value={content}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 1500) {
                                            setContent(e.target.value);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {newsletter && newsletter?.newsletter?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added newsletters</p>
                            </div>
                        </div>
                        {
                            newsletter?.newsletter?.length > 0 && newsletter?.newsletter?.map((item, index) => <FocusAddedNewsletter key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} setPreviousUrl={setPreviousUrl} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <FocusNewsOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} setTitle={setTitle} setNewsletterType={setNewsletterType} setContent={setContent} itemForBackend={itemForBackend} />}

        </LayoutHeader>
    );
}
