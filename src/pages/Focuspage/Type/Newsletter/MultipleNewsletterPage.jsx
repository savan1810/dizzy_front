import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayoutHeader from '../../../../layout/LayoutHeader';
import More from '../../../../svg/More';
import { getContrastColor, maxLength } from '../../../../components/DixeeInput2';
import CrossArrow from '../../../../svg/CrossArrow';
import { getAccentColor, getAccentStyle } from '../../../../constants/constants';
import NewsletterEdit from '../../../../components/Focuspage/MainEdit/NewsletterEdit';
import { updateNewsletterOverlay } from '../../../../store/focuspage/focuspageSlice';

export default function MultipleNewsletterPage() {
    const dispatch = useDispatch();
    const newsletterArticle = useSelector((state) => state.focuspage.newsletter);
    const newsOverlay = useSelector((state) => state.focuspage.isNewsletterOverlay);
    const userData = useSelector((state) => state.user.userArticle);


    return (
        <LayoutHeader>

            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] bg-black" >
                <div className='flex py-4 z-1 ml-4 w-full items-center text-white' >
                    <div className=" mx-auto">
                        diz.ee/{userData?.domain}/{newsletterArticle?.extension}
                    </div>
                    <div className="mr-4">
                        <More
                            className='h-[20px] w-[20px] cursor-pointer'
                            onClick={() => dispatch(updateNewsletterOverlay(true))}

                        />
                    </div>
                </div>
                <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px]" style={newsletterArticle?.background ? { backgroundColor: `#${newsletterArticle?.background}` } : { backgroundColor: '#000000' }}>
                    <div className="max-w-[350px] sm:max-w-[390px] h-[490px] flex relative">
                        <img src={newsletterArticle?.avatar} alt="photoimage" className="w-full h-full object-cover rounded-[20px]" />
                        {/* <More className='h-[20px] w-[20px] absolute top-2 right-4 cursor-pointer' color={getContrastColor(newsletterArticle?.background) ? `#${getContrastColor(newsletterArticle?.background)}` : '#ffffff'}
                    // onClick={() => dispatch(updatePhotoOverlay(true))} 
                    /> */}
                        <div
                            className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end p-4"
                            style={{
                                backgroundImage: `linear-gradient(to top, ${newsletterArticle?.background ? `#${newsletterArticle.background}` : 'black'}, transparent)`,
                            }}
                        >
                            {newsletterArticle?.headeractive && <div>

                                <p className='text-[20px] text-white font-bold' style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(newsletterArticle?.newsletter[0]?.newsletterType, 25)}</p>

                                <p className='text-[16px] text-white' style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(newsletterArticle?.newsletter[0]?.title, 30)}</p>

                                {/* <p className='text-[12px] text-white ' style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}` } : { color: '#ffffff' }}>{maxLength(newsletterArticle?.newsletter[0]?.time, 25)}</p> */}

                            </div>}

                        </div>
                    </div>


                    {/* <div className="text-[#FDFAFA] cursor-pointer my-4 flex flex-row justify-between items-center" onClick={() => navigation('/add-section')}>
                    <Plus className='h-[12px] w-[12px] cursor-pointer mx-2' />
                    <p style={{ fontSize: '12px' }}>Add a section</p>
                </div> */}

                    <div className='w-full text-white flex flex-col  px-4 justify-center items-start gap-y-[24px] mt-[25px] text-[12px]'>
                        {newsletterArticle?.newsletter?.length > 0 && newsletterArticle?.newsletter?.map((item, index) => (
                            <div className='flex w-full item-center justify-between '>
                                <p className='text-white' style={getAccentStyle(getContrastColor(newsletterArticle?.background))}>{maxLength(item?.title, 30)}</p>

                                <div className='flex gap-x-1'>
                                    <p className='text-white cursor-pointer' style={getAccentStyle(getContrastColor(newsletterArticle?.background))}>{maxLength(item?.newsletterType, 10)}</p>
                                    <button >
                                        {/* <CrossArrow color={"white"} /> */}
                                        <CrossArrow color={getAccentColor(getContrastColor(newsletterArticle?.background))} />
                                    </button>
                                </div>
                            </div>
                            // <div className='space-y-[25px]'>
                            //     <p className='text-white text-[12px]' style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}` } : { color: '#ffffff' }}>{item?.title}</p>
                            //     <p className='text-white overflow-x-auto max-w-[316px] text-[10px]'
                            //         style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}`, whiteSpace: 'normal' } : { color: '#ffffff', whiteSpace: 'normal' }}>
                            //         {item?.content}
                            //     </p>

                            // </div>
                        ))}
                    </div>
                    <div className='w-full text-white flex flex-col justify-center items-start gap-y-[16px] px-4 mt-[50px] text-[12px]' style={getAccentStyle(newsletterArticle?.accent)}>
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
            {newsOverlay && <NewsletterEdit newsletterArticle={newsletterArticle} />}
        </LayoutHeader>
    );
}
