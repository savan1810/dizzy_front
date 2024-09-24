import React, { useRef, useState, useEffect } from 'react';
import more from '../../assets/images/components/More.png';
import { getContrastColor, maxLength } from '../DixeeInput2';
import { getAccentColor, getAccentStyle } from '../../constants/constants';
import More from '../../svg/More';

export default function Product(props) {
    const { userArticle, product, setOverlay, title } = props;
    const scrollRef = useRef(null);
    const [arrowsVisible, setArrowsVisible] = useState({ left: false, right: false });

    // Function to scroll left
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -318, behavior: 'smooth' });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 318, behavior: 'smooth' });
        }
    };

    // Update arrow visibility based on scroll position
    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const scrollWidth = scrollRef.current.scrollWidth;
            const clientWidth = scrollRef.current.clientWidth;

            // Determine visibility of left and right arrows
            setArrowsVisible({
                left: scrollLeft > 0,
                right: scrollWidth > scrollLeft + clientWidth
            });
        }
    };

    useEffect(() => {
        // Check visibility on mount and on scroll
        updateArrowVisibility();

        // Add scroll event listener
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', updateArrowVisibility);
        }

        // Cleanup event listener on unmount
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', updateArrowVisibility);
            }
        };
    }, [product]); // Dependency on product to handle changes in the list

    // Ensure arrow visibility is updated if product list changes
    useEffect(() => {
        updateArrowVisibility();
    }, [product]);

    return (
        <div className='w-full mb-[60px] px-4 relative'>
            <div className="text-[#FDFAFA] my-4 flex w-full flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>
                        {title || "MERCH"}
                    </p>
                </div>
                <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setOverlay(true)} />
                {/* <img src={more} alt='more' className='h-[3px] w-[12px] cursor-pointer' /> */}
            </div>
            <div className='w-full mb-[24px]'>
                <div className={``} style={{ borderBottom: '.3px solid ' + getAccentColor(getContrastColor(userArticle?.background)) }}></div>
            </div>

            {/* Left Arrow */}
            {arrowsVisible.left && <button
                className="absolute left-0 top-1/2 mt-[25px] transform -translate-y-1/2 text-[white] pl-1 z-10"
                onClick={scrollLeft}
                style={getAccentStyle(getContrastColor(userArticle?.background))}
            >
                &lt;
            </button>
            }
            {/* Horizontal scroll wrapper */}
            <div className='w-full overflow-x-auto relative' ref={scrollRef}>
                <div className='flex'>
                    {product?.map((item, index) => (
                        <div key={index} className='flex-shrink-0 flex w-full gap-x-[25px]'>
                            <img src={item?.image} onClick={() => window.open(`${item.links[0]?.url}`, '_blank')} alt='sp' className='h-[100px] w-[100px] cursor-pointer' />
                            <div className='flex flex-col w-full justify-between gap-y-[20px] text-white'>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.productName, 30)}</p>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}>${item?.price}</p>
                                <p className='text-[12px]' style={getAccentStyle(userArticle?.accent)}>{maxLength(item?.description, 80)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Arrow */}
            {arrowsVisible.right && <button
                className="absolute right-0 mt-[25px] top-1/2 transform -translate-y-1/2 text-white pr-1 z-10"
                onClick={scrollRight}
                style={getAccentStyle(getContrastColor(userArticle?.background))}
            >
                &gt;
            </button>}

            <div className='w-full mt-[9px]'>
                <div style={{ borderBottom: '.3px solid ' + getAccentColor(getContrastColor(userArticle?.background)) }}></div>
            </div>

        </div>
    );
}