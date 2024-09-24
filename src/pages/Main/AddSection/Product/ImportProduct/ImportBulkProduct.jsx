import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LayoutHeader from '../../../../../layout/LayoutHeader';
import CopyLink from '../../../../../svg/CopyLink';
import { DizeeInput2 } from '../../../../../components/DixeeInput2';
import { getDataAPI, postDataAPI } from '../../../../../utils/fetchData';
import { ClipLoader } from 'react-spinners';
import { clearAlerts, setErrorAlert } from '../../../../../store/alert/alertSlice';
import { getProductThunk, getVideoThunk } from '../../../../../store/addsection/addsectionThunk';
import { useDispatch, useSelector } from 'react-redux';
import ImportAddVideo from '../../../../../components/AddSection/Video/ImportAddVideo';
import AddedVideoCard from '../../../../../components/AddSection/Video/AddedVideoCard';
import VideoOverlay from '../../../../../components/AddSection/Video/VideoOverlay';
import ImportProductLink from '../../../../../components/AddSection/Product/ImportProductLink';
import AddedProductCard from '../../../../../components/AddSection/Product/AddedProductCard';
import ProductOverlay from '../../../../../components/AddSection/Product/ProductOverlay';
import ProductOverlayImport from '../../../../../components/AddSection/Product/ProductOverlayImport';

export default function ImportBulkProduct() {
    const dispatch = useDispatch();
    const [link, setLink] = useState('');
    const [data, setData] = useState([]);
    const token = localStorage.getItem('dizeeToken');
    const [loading, setLoading] = useState(false);
    const product = useSelector((state) => state.addsection.product);
    // const [isExist, setIsExist] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [itemForBackend, setItemForBackend] = useState('');
    const [previousUrl, setPreviousUrl] = useState('');
    const [title, setTitle] = useState('');
    const params = new URLSearchParams(window.location.search);
    const [isExistList, setIsExistList] = useState([]);
    // Get the value of the 'shopUrl' parameter
    const shopUrl = params.get('shopUrl');

    useEffect(() => {
        dispatch(clearAlerts());
        dispatch(getProductThunk({ token }));
    }, [dispatch, token]);


    console.log('data', data)

    useEffect(() => {
        const fetchApi = async () => {
            if (shopUrl) {
                console.log('shopUrl', shopUrl)
                try {
                    let response = await getDataAPI(`user/products?shopUrl=${shopUrl}`);
                    console.log('response.data.data.response', response.data.data.response)
                    setLink(shopUrl)
                    response = response.data.data.response
                    const products = response.products.map((product) => ({
                        title: product.title,
                        description: product.body_html,
                        image: product.image ? product.image.src : '',
                        price: product.variants && product.variants.length > 0 ? product.variants[0].price : '',
                    }));

                    setData(products);
                } catch (error) {
                    console.log('error', error)
                }

            }
        }
        fetchApi();
    }, [])

    // Debounced function to handle API call
    const debouncedApiCall = useCallback(
        _.debounce(async (value) => {
            if (shopUrl === value) {
                // window.location.reload();
                return
            }
            // setLoading(true);
            try {
                dispatch(clearAlerts());
                const response = await getDataAPI(`user/install?shopUrl=${value}`);
                if (response.data.data.response) {
                    window.open(response.data.data.response);

                }
                // console.log('response.data.data.response', response.data.data.response)
                // if (response.data.data.response.title === 'Page not available') {
                //     setData({});
                //     setLoading(false);
                //     return;
                // }
                // setData(response.data.data.response);
                // setLoading(false);
            } catch (err) {
                setLoading(false);
                dispatch(setErrorAlert("Please enter a valid link"));
            }
        }, 500),
        [dispatch, token]
    );
    // Define filterLink inside the useCallback to ensure proper memoization
    const filterLink = useCallback(
        (link, title) => {
            if (product?.length > 0) {
                for (let m of product) {
                    for (let musicLink of m.links) {
                        console.log('musicLink.url', musicLink.url)
                        console.log('link', link)
                        console.log('m.title', m.productName)
                        console.log('title', title)
                        if (musicLink.url === link && m.productName === title) {
                            // setIsExist(true);
                            return true;
                        }
                    }
                }
            }
            // setIsExist(false);
            return false;
        },
        [product]
    );


    useEffect(() => {
        if (link) {
            debouncedApiCall(link);
            if (data.length > 0) {
                const updatedIsExistList = data.map((product) => {
                    console.log('product.title', product.title)
                    console.log('link', link)

                    return filterLink(link, product.title)
                }
                ); // Use product title or a unique identifier for the link

                setIsExistList(updatedIsExistList); // Set the existence status for each product
            }
        }
    }, [link, debouncedApiCall, filterLink]);

    return (
        <LayoutHeader>
            <div className="w-[350px] sm:w-[390px] h-[80vh] bg-black flex flex-col  items-center relative">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <div className='flex items-center gap-x-[16px]'>
                        {/* {IconComponent} */}
                        <span className='text-white'>Import product link</span>
                    </div>
                    <Link to="/add-section/connect-with-shopify">
                        <p className='text-white cursor-pointer ' style={{ fontSize: '12px' }}>Go Back</p>
                    </Link>
                </div>
                <div className='flex w-full flex-col gap-y-[50px] '>

                    <div className="flex flex-col justify-center items-center w-full ">
                        <div className='p-4 pb-[40px] flex w-full justify-between items-center '>
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
                        {
                            loading ? (
                                <ClipLoader
                                    color="white"
                                    loading={true}
                                    size={50}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : (
                                data.length > 0 &&
                                data.map((product, index) => (
                                    <ImportProductLink
                                        key={index}
                                        data={product}
                                        isExist={isExistList[index]}  // Pass specific isExist status for each product
                                        setData={setData}
                                        setLink={setLink}
                                        link={link}
                                    />
                                ))
                            )
                        }
                    </div>
                    {
                        product?.length > 0 && <div className="flex flex-col justify-center items-center w-full">
                            <div className='p-4 pb-[40px] flex w-full justify-between items-center cursor-pointer' style={{ fontSize: '12px' }}>
                                <div className='items-center flex flex-row text-white w-full'>
                                    <p>Added product</p>
                                </div>
                            </div>
                            {
                                product?.length > 0 && product?.map((item, index) => <AddedProductCard key={index} item={item} setItemForBackend={setItemForBackend} setOverlayVisible={setOverlayVisible} setPreviousUrl={setPreviousUrl} setTitle={setTitle} />)
                            }
                        </div>
                    }
                </div>
            </div>
            {isOverlayVisible && <ProductOverlayImport setOverlayVisible={setOverlayVisible} previousUrl={previousUrl} title={title} />}
        </LayoutHeader >
    );
}
