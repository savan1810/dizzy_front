import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SelectionCard from '../../components/SelectionCard';
import LayoutHeader from '../../layout/LayoutHeader';
import RedirectCard from '../../components/Focuspage/RedirectCard';
import AddCard from '../../components/Focuspage/AddCard';
import { useDispatch, useSelector } from 'react-redux';
import { getDataForFocusThunk } from '../../store/focuspage/focuspageThunk';
import MusicRedirectCard from '../../components/Focuspage/RedirectCard/MusicRedirectCard';
import ProductRedirectCard from '../../components/Focuspage/RedirectCard/ProductRedirectCard';
import EventRedirectCard from '../../components/Focuspage/RedirectCard/EventRedirectCard';
import NewsRedirectCard from '../../components/Focuspage/RedirectCard/NewsRedirectCard';

export default function Selectpage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('dizeeToken');
    const focusData = useSelector((state) => state.focuspage.focusData);
    useEffect(() => {
        dispatch(getDataForFocusThunk({ token: token }))
    }, [])

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Select a page</p>
                    <p onClick={() => navigate('/')} className='text-white cursor-pointer'>Learn more</p>
                </div>
                <AddCard txt="Create a new focus page" link="/focus-page/focus-type" dotimgclss={false} />

                {
                    focusData && focusData?.music?.length > 0 && focusData?.music?.map((item, index) => (
                        item?.type === "single" ?
                            <MusicRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/music-page`}
                                item={item}
                            /> :
                            <MusicRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/multiple-music-page`}
                                item={item}
                            />
                    ))
                }
                {
                    focusData && focusData?.product?.length > 0 && focusData?.product?.map((item, index) => (
                        item?.type === "single" ?
                            <ProductRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/product-page`}
                                item={item}
                            />
                            :
                            <ProductRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/multiple-product-page`}
                                item={item}
                            />

                    ))
                }
                {
                    focusData && focusData?.event?.length > 0 && focusData?.event?.map((item, index) => (
                        item?.type === "single" ?
                            <EventRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/event-page`}
                                item={item}
                            />
                            :
                            <EventRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/multiple-event-page`}
                                item={item}
                            />
                    ))
                }
                {
                    focusData && focusData?.newsletter?.length > 0 && focusData?.newsletter?.map((item, index) => (
                        item?.type === "single" ?
                            <NewsRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/newsletter-page`}
                                item={item}
                            /> :
                            <NewsRedirectCard
                                txt={item?.page}
                                key={index}
                                link={`/focus-page/multiple-newsletter-page`}
                                item={item}
                            />
                    ))
                }
                {/* {
                    focusData && focusData?.music?.length > 0 && focusData?.music?.map((item, index) => (
                        <RedirectCard
                            txt={item?.title}
                            key={index}
                            link={`/focus-page/${item?.slug}`}
                        />
                    ))
                } */}
                {/* <RedirectCard txt="Playlist" dotimgclss={false} link="/add-section/add-video" />
                <RedirectCard txt="Ejekt Fest" dotimgclss={false} link={"/add-section/add-event"} />
                <RedirectCard txt="I Hear You" dotimgclss={false} link={"/add-section/add-product"} />
                <RedirectCard txt="Just Gou It" dotimgclss={false} link={"/add-section/add-playlist"} />
                <RedirectCard txt="Peggy Goods" dotimgclss={false} link={"/add-section/add-form"} /> */}

            </div>
        </LayoutHeader>
    );
}
