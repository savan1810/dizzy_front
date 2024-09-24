import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../../layout/LayoutHeader';
import More from '../../../../svg/More';
import Plus from '../../../../svg/Plus';
import FocusMusicOverlay from '../../../../components/Focuspage/Type/Music/FocusMusicOverlay';
import { getContrastColor, maxLength } from '../../../../components/DixeeInput2';
import CrossArrow from '../../../../svg/CrossArrow';
import { getAccentColor, getAccentStyle } from '../../../../constants/constants';
import ProductEdit from '../../../../components/Focuspage/MainEdit/ProductEdit';
import { updateProductOverlay } from '../../../../store/focuspage/focuspageSlice';

export default function ProductPage() {
    const dispatch = useDispatch();
    const productArticle = useSelector((state) => state.focuspage.product);
    const productOverlay = useSelector((state) => state.focuspage.isProductOverlay);
    const userData = useSelector((state) => state.user.userArticle);


    return (
        <LayoutHeader>

            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] bg-black" >
                <div className='flex py-4 z-1 ml-4 w-full items-center text-white' >
                    <div className=" mx-auto">
                        diz.ee/{userData?.domain}/{productArticle?.extension}
                    </div>
                    <div className="mr-4">
                        <More
                            className='h-[20px] w-[20px] cursor-pointer'
                            onClick={() => dispatch(updateProductOverlay(true))}

                        />
                    </div>
                </div>
                <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]" style={productArticle?.background ? { backgroundColor: `#${productArticle?.background}` } : { backgroundColor: '#000000' }}>
                    <div className="max-w-[350px] sm:max-w-[390px] h-[490px] flex relative">
                        <img src={productArticle?.product[0]?.image} alt="photoimage" className="w-full h-full object-cover rounded-[20px]" />
                        {/* <More className='h-[20px] w-[20px] absolute top-2 right-4 cursor-pointer' color={getContrastColor(productArticle?.background) ? `#${getContrastColor(productArticle?.background)}` : '#ffffff'}
                    // onClick={() => dispatch(updatePhotoOverlay(true))} 
                    /> */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end p-4"
                            style={{
                                backgroundImage: `linear-gradient(to top, ${productArticle?.background ? `#${productArticle.background}` : 'black'}, transparent)`,
                            }}
                        >
                            {productArticle?.headeractive &&
                                <div>
                                    <p className='text-[16px] text-white' style={getContrastColor(productArticle?.background) ? { color: `#${getContrastColor(productArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(productArticle?.product[0]?.productName
                                        , 30)}</p>

                                    <p className='text-[20px] text-white font-bold' style={getContrastColor(productArticle?.background) ? { color: `#${getContrastColor(productArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(productArticle?.product[0]?.price, 25)}</p>
                                    <p className='text-[12px] text-white ' style={getContrastColor(productArticle?.background) ? { color: `#${getContrastColor(productArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(`BUY NOW`, 25)}</p>

                                </div>
                            }

                        </div>
                    </div>


                    {/* <div className="text-[#FDFAFA] cursor-pointer my-4 flex flex-row justify-between items-center" onClick={() => navigation('/add-section')}>
                    <Plus className='h-[12px] w-[12px] cursor-pointer mx-2' />
                    <p style={{ fontSize: '12px' }}>Add a section</p>
                </div> */}

                    <div className='w-full  flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[25px] text-[12px]' style={getAccentStyle(productArticle?.accent)}>
                        <div className='space-y-[15px]'>
                            <div className='flex flex-row gap-x-[10px]'>
                                <p className='uppercase font-bold'>{userData?.username}</p>
                                <p className=''>x</p>
                                <p className='uppercase text-[11px]'>DIZEE</p>
                            </div>
                            <p>Privacy Policy</p>
                        </div>


                    </div>
                </div>
            </div>

            {productOverlay && <ProductEdit productArticle={productArticle} />}
        </LayoutHeader>
    );
}
