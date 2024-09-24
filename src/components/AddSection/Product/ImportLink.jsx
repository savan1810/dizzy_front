import React from 'react';
import { useNavigate } from 'react-router-dom';
import CrossArrow from '../../../svg/CrossArrow';
import Shopify from '../../../svg/ProductPlatform/Shopify';
import BigCartel from '../../../svg/ProductPlatform/BigCartel';


const componentMapping = {
    shopify: <Shopify />,
    bigcartel: <BigCartel />,
};

export default function ImportLink({ txt, value, selected, onSelect }) {
    const navigate = useNavigate();
    const DynamicComponent = componentMapping[value];
    const handleClick = () => {
        navigate('/add-section/product-import-link', { state: { iconKey: value, name: txt } });
    };
    return (
        <div className='p-4 py-6 flex w-full justify-between items-center ' >
            <div className='flex items-center gap-x-[16px]'>
                {DynamicComponent}
                <span className='text-white'>{txt}</span>
            </div>
            <div onClick={handleClick}>
                <CrossArrow className='cursor-pointer text-white' />
            </div>
        </div>
    );
}
