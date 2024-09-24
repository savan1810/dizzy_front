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


export default function ManuallyAddProduct() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [link, setLink] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [previousUrl, setPreviousUrl] = useState('');
    const [previousSource, setPreviousSource] = useState('');

    const product = useSelector((state) => state.addsection.product);
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
        if (!previousUrl) {
            if (isExistLink) {
                dispatch(setErrorAlert('Link already exist'));
                return;
            }
        }


        if (!productName || !link || (!selectedImage && !imagePreview) || !price || !description) {
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
        }

        dispatch(addProductToSectionThunk({ token: token, payload: payload, previousUrl: previousUrl })).then(() => {
            dispatch(getProductThunk({ token: token }))
            setProductName('')
            setDescription('')
            setLink('')
            setPrice('')
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
                        <p onClick={() => navigate('/add-section/add-product')} className='text-white cursor-pointer'>Go back</p>
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
                    {product?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                            <div className='items-center flex flex-row text-white w-full'>
                                <p>Added Products</p>
                            </div>
                        </div>
                        {
                            product?.length > 0 && product?.map((item, index) => <AddedProductCard key={index} item={item} setOverlayVisible={setOverlayVisible} setItemForBackend={setItemForBackend} setPreviousUrl={setPreviousUrl} />)
                        }
                    </div>}
                </div>
            </div>
            {isOverlayVisible && <ProductOverlay setOverlayVisible={setOverlayVisible} previousUrl={previousUrl} itemForBackend={itemForBackend} setLink={setLink} setProductName={setProductName} setPrice={setPrice} setDescription={setDescription} setImagePreview={setImagePreview} setSelectedImage={setSelectedImage} setPreviousUrl={setPreviousUrl} setPreviousSource={setPreviousSource} />}

        </LayoutHeader>
    );
}
