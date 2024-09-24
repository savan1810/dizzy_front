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
import { clearFocusSection, setFocusProduct } from '../../../../../store/focuspage/focuspageSlice';
import { addProductForFocusThunk } from '../../../../../store/focuspage/focuspageThunk';
import FocusProductOverlay from '../../../../../components/Focuspage/Type/Product/FocusProductOverlay';


export default function Step6() {
    const product = useSelector((state) => state.focuspage?.product);

    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [link, setLink] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(product?.avatar);
    const [imagePreview, setImagePreview] = useState(product?.avatarPreview);
    const [previousUrl, setPreviousUrl] = useState('');
    const [previousSource, setPreviousSource] = useState('');
    const dispatch = useDispatch();


    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState(null);
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
    }, [dispatch, token])

    const filterLink = (link) => {
        if (product?.length > 0) {
            for (let m of product) {
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

        if (!previousUrl && isExistLink) {
            dispatch(setErrorAlert('Link already exists'));
            return;
        }


        // Handle when product.type is not 'single'
        let updatedData = product?.product || [];

        if (product.type !== 'single' && previousUrl) {
            updatedData = updatedData.filter(item => {
                return item?.links[0]?.url !== previousUrl;
            });
        }

        // Ensure all necessary fields are filled
        if (!productName || !link || (!selectedImage && !imagePreview) || !price || !description) {
            dispatch(setErrorAlert('Please fill all the fields'));
            return;
        }

        dispatch(setLoader(true));

        // Handle image upload
        let url = '';
        if (selectedImage) {
            url = await uploadImage(selectedImage);
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }
        }

        let payload = {
            productName: productName,
            description: description,
            price: price,
            image: url ? url : imagePreview,
            links: [
                {
                    source: previousSource ? previousSource : 'custom',
                    url: link
                }
            ]
        };

        if (product?.type === 'single') {
            dispatch(setFocusProduct({ product: [payload] }));
        } else {
            updatedData = [...updatedData, payload];
            dispatch(setFocusProduct({ product: updatedData }));
        }

        // Reset form fields
        setProductName('');
        setDescription('');
        setLink('');
        setPrice('');
        setSelectedImage(null);
        setImagePreview(null);
        setPreviousUrl(null)
        dispatch(setLoader(false));
    };

    const handleAddProductFocus = async () => {

        let url = '';
        dispatch(setLoader(true));

        try {
            if (product.avatar) {
                url = await uploadImage(product.avatar);
                if (!url) {
                    dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                    return

                }
            }

            // Clone the product to avoid mutating the original object
            const dataCopy = { ...product };

            delete dataCopy.avatar;
            delete dataCopy.avatarPreview;
            dataCopy.avatar = url;
            dataCopy.headeractive = true;


            dispatch(addProductForFocusThunk({ token: token, payload: dataCopy })).then((res) => {
                if (res.payload.status === 200) {
                    dispatch(clearFocusSection())
                    navigate("/focus-page");
                }
            });

        } catch (error) {
            console.error('Error uploading image or adding music:', error);
            // Optionally handle the error (e.g., show a notification)
        } finally {
            dispatch(setLoader(false));
        }
    }

    return (
        <LayoutHeader>
            <div className="w-[390px] h-[80vh] flex flex-col items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        <span className='text-white'>Add products</span>
                    </div>
                    <div className='flex gap-[20px]'>
                        {product && product?.product?.length > 0 && <button onClick={() => handleAddProductFocus()} className='text-white cursor-pointer' >Done</button>}
                        <button onClick={() => handleAddProduct()} className='text-white cursor-pointer' >Confirm</button>
                        <p onClick={() => navigate('/add-section/import-product')} className='text-white cursor-pointer'>Go back</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-y-[50px]" >
                    <div className='w-full'>
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

                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Product name"
                                    className="dizee-input w-full"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeInput2
                                    label="Link"
                                    placeholder="Description"
                                    className="dizee-input w-full"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='p-4 flex w-full justify-between items-center' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <DizeeNumberInput
                                    label="Link"
                                    placeholder="Price"
                                    type="number"
                                    className="dizee-input w-full"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                    </div>
                    {product && product?.product?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Products</p>
                            </div>
                        </div>
                        {
                            product?.product?.length > 0 && product?.product?.map((item, index) => <FocusAddedProduct key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} setPreviousUrl={setPreviousUrl} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <FocusProductOverlay isOverlayVisible={isOverlayVisible} setOverlayVisible={setOverlayVisible} setLink={setLink} setProductName={setProductName} setPrice={setPrice} setDescription={setDescription} setImagePreview={setImagePreview} itemForBackend={itemForBackend} />}

        </LayoutHeader>
    );
}
