import React from 'react';
import { useDispatch } from 'react-redux';
import plus from '../../../assets/images/components/plus.png';
import { maxLength } from '../../DixeeInput2';
import { clearAlerts } from '../../../store/alert/alertSlice';
import { addProductToSectionThunk, getProductThunk } from '../../../store/addsection/addsectionThunk';
import Plus from '../../../svg/Plus';

export default function ImportProductLink(props) {
    const { data, isExist, setLink, setData, link } = props;
    const token = localStorage.getItem('dizeeToken');
    const dispatch = useDispatch();

    const handleClick = () => {
        let links = [];
        links.push({
            source: 'import',
            url: link
        });

        const payload = {
            type: 1,
            image: data?.image,
            productName: data?.title,
            description: data?.description,
            price: data?.price,
            links: links
        };

        dispatch(clearAlerts());
        dispatch(addProductToSectionThunk({ token: token, payload: payload })).then(() => {
            dispatch(getProductThunk({ token: token }));
        });

        // setLink('');
        // setData({});
    };

    return (
        <div className='w-[350px] sm:w-[390px] p-5 flex flex-row justify-between items-center'>
            <div className='flex flex-row justify-start items-center gap-x-[11px]'>
                <img
                    src={data?.image}
                    alt={data?.title || 'Product Image'}
                    className='object-cover h-[50px] w-[50px] rounded-[3px]'
                />
                <div className='flex flex-col items-start justify-start h-full p-2'>
                    <p className='text-white mb-[6px]' style={{ fontSize: '12px' }}>
                        {maxLength(data?.title, 30)}
                    </p>
                    {/* Additional details can be added here if needed */}
                </div>
            </div>
            {!isExist && (
                <button onClick={handleClick}>
                    <Plus className='h-[12px] w-[12px] cursor-pointer' />
                    {/* Alternatively use img icon: <img src={plus} alt='plus' className='h-[12px] w-[12px] cursor-pointer' /> */}
                </button>
            )}
        </div>
    );
}
