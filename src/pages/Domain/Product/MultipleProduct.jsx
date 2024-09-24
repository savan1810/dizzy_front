import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LayoutHeader from '../../../layout/LayoutHeader';
import { getContrastColor, maxLength } from '../../../components/DixeeInput2';
import { getAccentColor, getAccentStyle } from '../../../constants/constants';
import ProductEdit from '../../../components/Focuspage/MainEdit/ProductEdit';
import { updateProductOverlay } from '../../../store/focuspage/focuspageSlice';

export default function MultipleProduct({ page, extension }) {
    const dispatch = useDispatch();
    const productArticleData = useSelector((state) => state.domain?.focusData?.product);

    const [productArticle, setproductArticle] = useState(null);

    useEffect(() => {
        productArticleData?.length > 0 && productArticleData?.map((item) => {
            if (item?.page === page && item?.extension === extension) {
                setproductArticle(item)
                return
            }
        })
    }, [])
    const userData = useSelector((state) => state.domain.userArticle);

    return (

        <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] " >
            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] " style={productArticle?.background ? { backgroundColor: `#${productArticle?.background}` } : { backgroundColor: '#000000' }}>
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



                <div className='w-full mt-[25px]' >
                    <p className='text-[14px] mx-4  mb-[24px]' style={getContrastColor(productArticle?.background) ? { color: `#${getContrastColor(productArticle?.background)}` } : { color: '#ffffff' }}>FULL COLLECTION</p>
                    <div className='flex flex-col gap-y-[24px] mx-4'>
                        {productArticle?.product && productArticle.product?.length > 0 && productArticle.product?.map((item, index) => (
                            <>
                                <div className='w-full '>
                                    <div className={`border-[1px] opacity-[0.5] `} style={{ borderColor: getAccentColor(getContrastColor(productArticle?.background)) }}></div>
                                </div>
                                <div key={index} className='flex-shrink-0 flex w-full gap-x-[25px]'>
                                    <img src={item?.image} onClick={() => window.open(`${item.links[0]?.url}`, '_blank')} alt='sp' className='h-[100px] w-[100px] cursor-pointer' />
                                    <div className='flex flex-col w-full justify-between gap-y-[20px] text-white'>
                                        <p className='text-[12px]' style={getAccentStyle(getContrastColor(productArticle?.background))}>{maxLength(item?.productName, 30)}</p>
                                        <p className='text-[12px]' style={getAccentStyle(getContrastColor(productArticle?.background))}>{maxLength(item?.description, 80)}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}


                {/* <div className="text-[#FDFAFA] cursor-pointer my-4 flex flex-row justify-between items-center" onClick={() => navigation('/add-section')}>
                    <Plus className='h-[12px] w-[12px] cursor-pointer mx-2' />
                    <p style={{ fontSize: '12px' }}>Add a section</p>
                </div> */}

                <div className='w-full text-white flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[50px] text-[12px]' style={getAccentStyle(productArticle?.accent)}>
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

    );
}
