import React, { useEffect, useState } from 'react'
import CusCard from '../../components/CusCard';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_articles_thunk, update_user_article_thunk } from '../../store/user/userThunk';
import { clearAlerts } from '../../store/alert/alertSlice';
import { articlDataDefault, articlDataDefaultArray, getAccentStyle, SOCIAL_PLATFORMS_SVG } from '../../constants/constants';
import { useNavigate, useParams } from 'react-router';
import LayoutHeader from '../../layout/LayoutHeader'
import { getContrastColor, removeUploadsFromUrl } from '../../components/DixeeInput2'
import { getAllSectionsThunk } from '../../store/addsection/addsectionThunk'
import Music from '../../components/PublicArticle/Music';
import Event from '../../components/PublicArticle/Event'
import Product from '../../components/PublicArticle/Product'
import Video from '../../components/PublicArticle/Video'
import Playlist from '../../components/PublicArticle/Playlist'
import Form from '../../components/PublicArticle/Form'
import Plus from '../../svg/Plus'
import More from '../../svg/More'
import PhotoOverlay from '../../components/Main/ArticleEdit/PhotoOverlay'
import { updatePhotoOverlay, updateSocialApiCall } from '../../store/user/userSlice'
import { Socialfeed } from '../../components/Main/Socialfeed'
import { get_domain_articles_thunk, getDomainAllSectionsThunk, getDomainDataForFocusThunk } from '../../store/domain/domainThunk';
import BrandPage from './BrandPage';
import SingleMusic from './Music/SingleMusic';
import MultipleMusic from './Music/MultipleMusic';
import SingleProduct from './Product/SingleProduct';
import MultipleProduct from './Product/MultipleProduct';
import MultipleEvent from './Event/MultipleEvent';
import SingleEvent from './Event/SingleEvent';
import SingleNewsletter from './Newsletter/SingleNewsletter';
import MultipleNewsletterPage from './Newsletter/MultipleNewsletter';

export default function Domain() {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const dispatch = useDispatch();

    const { domain: dynamicVar } = useParams();
    const { focuspage: focuspageVar } = useParams();

    const focusData = useSelector((state) => state.domain.focusData);
    const musicArticleData = useSelector((state) => state.domain?.focusData?.music);
    const eventArticleData = useSelector((state) => state.domain?.focusData?.event);
    const newsletterArticleData = useSelector((state) => state.domain?.focusData?.newsletter);
    const productArticleData = useSelector((state) => state.domain?.focusData?.product);
    const [focusLoader, setFocusLoader] = useState(false)


    const userArticle = useSelector((state) => state.domain.userArticle);
    const videoMessage = useSelector((state) => state.domain.videoMessage);
    const music = useSelector((state) => state.domain.music);
    const event = useSelector((state) => state.domain.event);
    const product = useSelector((state) => state.domain.product);
    const video = useSelector((state) => state.domain.video);
    const playlist = useSelector((state) => state.domain.playlist);
    const form = useSelector((state) => state.domain.form);
    const socialfeed = useSelector((state) => state.domain.socialfeed);
    const [articlDataDefault, setArticlDataDefault] = useState(articlDataDefaultArray);
    const [isFirst, setIsFirst] = useState(true);

    let getPublishVideoMessage = videoMessage?.length > 0 && videoMessage?.filter((item) => item.saveType === 'post-on-page');
    const navigation = useNavigate()


    const [currentPage, setCurrentPage] = useState(null);
    const [type, setType] = useState(null);
    const [page, setPage] = useState(true);
    const [extension, setExtension] = useState(null);
    const [background, setBackground] = useState(userArticle?.background);
    const [textColor, setTextColor] = useState(userArticle?.textColor);
    const [unpublish, setUnpublish] = useState(null)


    useEffect(() => {
        if (userArticle?.unpublish) {
            setUnpublish(userArticle?.unpublish)
        }
        else {
            setUnpublish(false)

        }
    }, [userArticle?.unpublish])

    // let socialApiCall = useSelector((state) => state.user.socialApiCall);

    useEffect(() => {
        if (dynamicVar) {
            dispatch(get_domain_articles_thunk({ domain: dynamicVar }));
            dispatch(getDomainAllSectionsThunk({ domain: dynamicVar }));
            dispatch(getDomainDataForFocusThunk({ domain: dynamicVar }));
        }
        // else {
        //     dispatch(updateSocialApiCall(false));
        // }
    }, [dispatch, dynamicVar]);


    useEffect(() => {
        if (dynamicVar && !focuspageVar) {
            setCurrentPage('brand')
        }
    }, [])

    useEffect(() => {

        if (focuspageVar && isFirst) {
            musicArticleData?.length > 0 && musicArticleData?.map((item) => {
                if (item?.extension === focuspageVar) {
                    setCurrentPage('music')
                    setType(item?.type)
                    setPage(item?.page)
                    setExtension(item?.extension)
                    setBackground(item?.background)
                    setTextColor(item?.textColor)
                    setIsFirst(false)
                    setUnpublish(item?.unpublish)
                    return

                }
            })
            eventArticleData?.length > 0 && eventArticleData?.map((item) => {
                if (item?.extension === focuspageVar) {

                    setCurrentPage('event')
                    setType(item?.type)
                    setPage(item?.page)
                    setExtension(item?.extension)
                    setBackground(item?.background)
                    setTextColor(item?.textColor)
                    setIsFirst(false)
                    setUnpublish(item?.unpublish)

                    return
                }
            })
            newsletterArticleData?.length > 0 && newsletterArticleData?.map((item) => {
                if (item?.extension === focuspageVar) {
                    setCurrentPage('newsletter')
                    setType(item?.type)
                    setPage(item?.page)
                    setExtension(item?.extension)
                    setBackground(item?.background)
                    setTextColor(item?.textColor)
                    setIsFirst(false)
                    setUnpublish(item?.unpublish)

                    return

                }
            })
            productArticleData?.length > 0 && productArticleData?.map((item) => {
                if (item?.extension === focuspageVar) {

                    setCurrentPage('product')
                    setType(item?.type)
                    setPage(item?.page)
                    setExtension(item?.extension)
                    setBackground(item?.background)
                    setTextColor(item?.textColor)
                    setIsFirst(false)
                    setUnpublish(item?.unpublish)

                    return
                }
            })


        }

    }, [dispatch, focuspageVar, page, extension, musicArticleData, eventArticleData, newsletterArticleData, productArticleData, isFirst]);

    useEffect(() => {
        if (userArticle?.articlDataDefault) {
            setArticlDataDefault(userArticle?.articlDataDefault)
        }
    }, [getPublishVideoMessage]);

    return (
        <div className='h-auto bg-black'>
            {!currentPage ? < div></div> :
                <>
                    {!unpublish &&
                        <div className='relative w-full text-[12px] h-auto flex justify-center items-start bg-[black]'>
                            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-start items-center relative  bg-black" >
                                <div className="max-w-[350px] overflow-x-auto text-[#FDFAFA] py-4 flex items-center justify-between gap-x-[25px] mt-[35px] px-4">
                                    {
                                        !userArticle?.unpublish &&
                                        <button className='text-[12px] whitespace-nowrap text-[white]'
                                            onClick={() => {
                                                setType(null)
                                                setCurrentPage('brand')
                                                setPage(null)
                                                setExtension(null)
                                                setBackground(userArticle?.background)
                                                setTextColor(userArticle?.accent)
                                                setUnpublish(userArticle?.unpublish)
                                            }}>BRAND PAGE</button>}
                                    {
                                        focusData?.music?.length > 0 && focusData.music.map((item, index) => {
                                            if (item?.unpublish) {
                                                return
                                            }
                                            return (

                                                <button key={index} className='text-[12px] whitespace-nowrap uppercase'
                                                    onClick={() => {
                                                        setType(item.type)
                                                        setCurrentPage('music')
                                                        setPage(item?.page)
                                                        setExtension(item?.extension)
                                                        setBackground(item?.background)
                                                        setTextColor(item?.accent)
                                                        setUnpublish(item?.unpublish)

                                                    }}
                                                >
                                                    {item.extension}
                                                </button>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        focusData?.product?.length > 0 && focusData.product.map((item, index) => {
                                            if (item?.unpublish) {
                                                return
                                            }
                                            return (
                                                <button key={index} className='text-[12px] whitespace-nowrap uppercase'
                                                    onClick={() => {
                                                        setType(item.type)
                                                        setCurrentPage('product')
                                                        setPage(item?.page)
                                                        setExtension(item?.extension)
                                                        setBackground(item?.background)
                                                        setTextColor(item?.accent)
                                                        setUnpublish(item?.unpublish)

                                                    }}
                                                >
                                                    {item.extension}
                                                </button>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        focusData?.event?.length > 0 && focusData.event.map((item, index) => {
                                            if (item?.unpublish) {
                                                return
                                            }
                                            return (
                                                <button key={index} className='text-[12px] whitespace-nowrap uppercase'
                                                    onClick={() => {
                                                        setType(item.type)
                                                        setCurrentPage('event')
                                                        setPage(item?.page)
                                                        setExtension(item?.extension)
                                                        setBackground(item?.background)
                                                        setTextColor(item?.accent)
                                                        setUnpublish(item?.unpublish)

                                                    }}
                                                >
                                                    {item.extension}
                                                </button>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        focusData?.newsletter?.length > 0 && focusData.newsletter.map((item, index) => {
                                            if (item?.unpublish) {
                                                return
                                            }
                                            return (
                                                <button key={index} className='text-[12px] whitespace-nowrap uppercase'
                                                    onClick={() => {
                                                        setType(item.type)
                                                        setCurrentPage('newsletter')
                                                        setPage(item?.page)
                                                        setExtension(item?.extension)
                                                        setBackground(item?.background)
                                                        setTextColor(item?.accent)
                                                        setUnpublish(item?.unpublish)

                                                    }}
                                                >
                                                    {item.extension}
                                                </button>
                                            )
                                        }
                                        )
                                    }
                                </div>

                                {currentPage === 'brand' && !unpublish && !type && <BrandPage />}
                                {currentPage === 'music' && !unpublish && type === 'single' ? <SingleMusic page={page} extension={extension} /> : currentPage === 'music' && type === 'multiple' ? <MultipleMusic page={page} extension={extension} /> : null}

                                {currentPage === 'product' && !unpublish && type === 'single' ? <SingleProduct page={page} extension={extension} /> : currentPage === 'product' && type === 'multiple' ? <MultipleProduct page={page} extension={extension} /> : null}

                                {currentPage === 'event' && !unpublish && type === 'single' ? <SingleEvent page={page} extension={extension} /> : currentPage === 'event' && type === 'multiple' ? <MultipleEvent page={page} extension={extension} /> : null}

                                {currentPage === 'newsletter' && !unpublish && type === 'single' ? <SingleNewsletter page={page} extension={extension} /> : currentPage === 'newsletter' && type === 'multiple' ? <MultipleNewsletterPage page={page} extension={extension} /> : null}

                            </div>
                        </div>
                    }
                </>

            }
        </div >
    );
}

