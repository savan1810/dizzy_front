import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DizeeInput2, maxLength } from '../../DixeeInput2';
import { setWholeFocusProduct, updateProductOverlay } from '../../../store/focuspage/focuspageSlice';
import { setErrorAlert, setLoader } from '../../../store/alert/alertSlice';
import { uploadImage } from '../../../utils/upload';
import { update_focus_data_thunk } from '../../../store/focuspage/focuspageThunk';
import ImageEditCard from '../../Main/ArticleEdit/ImageEditCard';
import Check from '../../../svg/Check';

export default function ProductEdit({ productArticle }) {
    const token = localStorage.getItem('dizeeToken');
    const focusdata = useSelector((state) => state.focuspage.focusData);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const handleOverlayClick = (e) => {
        if (e.target.id === 'overlay') {
            dispatch(updateProductOverlay(false));
        }
    };


    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const updatedAvatar = URL.createObjectURL(file);

            const updatedData = productArticle.product.map((item, index) =>
                index === 0 ? { ...item, image: updatedAvatar } : item
            );
            dispatch(setWholeFocusProduct({ ...productArticle, product: updatedData }));

            setSelectedImage(file);
        }
    };


    const updateUserArticle = async () => {
        dispatch(updateProductOverlay(false));

        let updatedData = focusdata?.product?.map((e) => {
            if (e?.extension === productArticle?.extension) {
                return productArticle;
            }
            return e;
        });

        let body = { ...focusdata, product: updatedData };

        if (productArticle?.product[0]?.image.includes('blob')) {
            dispatch(setLoader(true));
            let url = await uploadImage(selectedImage);
            if (!url) {
                dispatch(setErrorAlert('Image cannot contain nudity , violence or drugs'));
                return

            }

            const updatedDataArray = productArticle.product.map((item, index) =>
                index === 0 ? { ...item, image: url } : item
            );

            const updatedDataArticle = { ...productArticle, product: updatedDataArray };

            updatedData = focusdata?.product?.map((e) => {
                if (e?.extension === productArticle?.extension) {
                    return updatedDataArticle;
                }
                return e;
            });

            body = { ...focusdata, product: updatedData };

            dispatch(setWholeFocusProduct(updatedDataArticle));
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
                        value={productArticle?.product[0]?.productName} // Adjust the max length here
                        // value={maxLength(productArticle?.product[0]?.title, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedData = productArticle.product.map((item, index) =>
                                index === 0 ? { ...item, productName: e.target.value } : item
                            );
                            dispatch(setWholeFocusProduct({ ...productArticle, product: updatedData }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="">Product price</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Product price"
                        className="dizee-input"
                        value={maxLength(productArticle?.product[0]?.price, 18)} // Adjust the max length here
                        onChange={(e) => {
                            const updatedData = productArticle.product.map((item, index) =>
                                index === 0 ? { ...item, price: e.target.value } : item
                            );
                            dispatch(setWholeFocusProduct({ ...productArticle, product: updatedData }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Header display</p>
                    <div className='flex pr-[15px]'>
                        <div className="flex items-center mr-2 cursor-pointer" onClick={() => dispatch(setWholeFocusProduct({ ...productArticle, headeractive: true }))}>
                            <span className="mr-2">Active</span>
                            {productArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => dispatch(setWholeFocusProduct({ ...productArticle, headeractive: false }))}>
                            <span className="mr-2">Inactive</span>
                            {!productArticle?.headeractive && <Check className='h-[12px] w-[18px]' />}
                        </div>
                    </div>
                </div>
                <div className='pb-[10px] flex justify-between items-center'>
                    <p>Background color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={productArticle?.background ? `#${productArticle?.background}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusProduct({ ...productArticle, background: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    <p className="" >Accent color</p>
                    <DizeeInput2
                        label="Link"
                        placeholder="Add a title"
                        className="dizee-input"
                        value={productArticle?.accent ? `#${productArticle?.accent}` : '#'}
                        onChange={(e) => {
                            const colorValue = e.target.value.startsWith('#') ? e.target.value.slice(1) : e.target.value;
                            dispatch(setWholeFocusProduct({ ...productArticle, accent: colorValue }));
                        }}
                    />
                </div>
                <div className='pb-[10px] flex justify-between'>
                    {productArticle?.unpublish
                        ? <button className="" onClick={() => dispatch(setWholeFocusProduct({ ...productArticle, unpublish: false }))}>publish</button>
                        : <button className="" onClick={() => dispatch(setWholeFocusProduct({ ...productArticle, unpublish: true }))}>unpublish</button>}

                </div>
                <ImageEditCard
                    txt="Edit Image"
                    dotimgclss={false}
                    onImageChange={handleImageChange}
                    imagePreview={productArticle?.product?.[0]?.image}
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
