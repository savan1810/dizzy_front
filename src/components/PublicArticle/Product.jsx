import React, { useRef, useState, useEffect } from 'react';
import more from '../../assets/images/components/More.png';
import { getContrastColor, maxLength } from '../DixeeInput2';
import { getAccentColor, getAccentStyle } from '../../constants/constants';
import More from '../../svg/More';
import { postDataAPI } from '../../utils/fetchData';
import { useParams } from 'react-router';

export default function Product(props) {
    const { userArticle, product, setOverlay, title } = props;
    const scrollRef = useRef(null);
    const [arrowsVisible, setArrowsVisible] = useState({ left: false, right: false });
    const { domain: dynamicVar } = useParams();

    // Function to scroll based on the screen size

    const scrollByAmount = () => {
        if (window.innerWidth < 640) { // md or larger
            // Scroll by two products (318px is assumed width of each product)
            return 318; // Scroll by one product for smaller screens

        }
        else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            return 630; // Scroll by one product for smaller screens

        }
        else {
            return 892; // Scroll by one product for smaller screens
        }
    };

    // Scroll left
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
        }
    };

    // Scroll right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
        }
    };

    // Update arrow visibility based on scroll position
    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const scrollWidth = scrollRef.current.scrollWidth;
            const clientWidth = scrollRef.current.clientWidth;

            setArrowsVisible({
                left: scrollLeft > 0,
                right: scrollWidth > scrollLeft + clientWidth,
            });
        }
    };

    useEffect(() => {
        updateArrowVisibility();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', updateArrowVisibility);
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', updateArrowVisibility);
            }
        };
    }, [product]);

    const handleProductClick = async (item) => {
        window.open(`${item.links[0]?.url}`, '_blank');
        try {
            await postDataAPI('analytics/create-product-analytics', { link: item?.links[0]?.url, domain: dynamicVar, title: item?.productName }, null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='w-[350px] sm:w-[639px] lg:w-[900px] mb-[60px] px-4 relative'>
            <div className="text-[#FDFAFA] my-4 flex w-full flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>
                        {title || "MERCH"}
                    </p>
                </div>
            </div>
            <div className='w-full mb-[24px]'>
                <div style={{ borderBottom: '.3px solid ' + getAccentColor(userArticle?.accent) }}></div>
            </div>

            {/* Left Arrow */}
            {arrowsVisible.left && (
                <button
                    className="absolute left-0 top-1/2 mt-[25px] transform -translate-y-1/2 text-[white] pl-1 z-10"
                    onClick={scrollLeft}
                    style={getAccentStyle(userArticle?.accent)}
                >
                    &lt;
                </button>
            )}

            {/* Horizontal scroll wrapper */}
            <div className='w-full overflow-x-auto relative' ref={scrollRef}>
                <div className='flex'>
                    {product?.map((item, index) => (
                        <div
                            key={index}
                            className='flex flex-shrink-0 w-[100%] sm:w-[318px] md:w-[calc(50%-12px)] md:mr-[24px] gap-x-[25px] sm:gap-x-[70px]' // Adjust for two products in md and above
                        >
                            <img src={item?.image} onClick={() => handleProductClick(item)} alt='sp' className='h-[100px] w-[100px] cursor-pointer' />
                            <div className='flex flex-col w-full justify-between gap-y-[20px] text-white'>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.productName, 30)}</p>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}> ${item?.price}</p>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.description, 80)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Arrow */}
            {arrowsVisible.right && (
                <button
                    className="absolute right-0 mt-[25px] top-1/2 transform -translate-y-1/2 text-white pr-1 z-10"
                    onClick={scrollRight}
                    style={getAccentStyle(userArticle?.accent)}
                >
                    &gt;
                </button>
            )}

            <div className='w-full mt-[9px]'>
                <div style={{ borderBottom: '.3px solid ' + getAccentColor(userArticle?.accent) }}></div>
            </div>
        </div>
    );
}
