import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getContrastColor, maxLength } from '../../../components/DixeeInput2';
import NewsletterEdit from '../../../components/Focuspage/MainEdit/NewsletterEdit';
import { updateNewsletterOverlay } from '../../../store/focuspage/focuspageSlice';
import { getAccentStyle } from '../../../constants/constants';

export default function SingleNewsletter({ page, extension }) {
    const dispatch = useDispatch();
    const newsletterArticleData = useSelector((state) => state.domain?.focusData?.newsletter);

    const [newsletterArticle, setnewsletterArticle] = useState(null);

    useEffect(() => {
        newsletterArticleData?.length > 0 && newsletterArticleData?.map((item) => {
            if (item?.page === page && item?.extension === extension) {
                setnewsletterArticle(item)
                return

            }
        })
    }, [])
    const userData = useSelector((state) => state.domain.userArticle);

    return (

        <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative rounded-[20px] ">
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

                        </div>}

                    </div>
                </div>

                <div className='w-full text-white flex flex-col px-4 justify-center items-start gap-y-[16px] mt-[25px] text-[12px]'>
                    {newsletterArticle?.newsletter?.length > 0 && newsletterArticle?.newsletter?.map((item, index) => (
                        <div className='space-y-[25px]'>

                            <p className='text-white overflow-x-auto max-w-[316px] text-[12px]'
                                style={getContrastColor(newsletterArticle?.background) ? { color: `#${getContrastColor(newsletterArticle?.background)}`, whiteSpace: 'normal' } : { color: '#ffffff', whiteSpace: 'normal' }}>
                                {item?.content}
                            </p>

                        </div>
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
    );
}
