import React, { useEffect, useState } from 'react'
import LayoutHeader from '../../../../layout/LayoutHeader';
import { ANALYTICS_FILTER } from '../../../../constants/constants';
import FilterComponent from '../../../../components/More/Analytics/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setFilter } from '../../../../store/setting/settingSlice';

export default function Filter() {
    const token = localStorage.getItem('dizeeToken');
    const [selectedFilter, setSelectedFilter] = useState(null); // Allow only one selected Filter
    const filter = useSelector((state) => state.setting.filter);
    const location = useLocation();
    const { path } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedFilter(filter)
    }, [])

    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Filter date range</p>
                    <div className='space-x-4'>
                        <button className='text-white cursor-pointer' onClick={() => {
                            dispatch(setFilter(selectedFilter))
                            navigate(path)
                        }}>Confirm</button>
                        <button className='text-white cursor-pointer' onClick={() => navigate(path)}>Go back</button>
                    </div>
                </div>
                {
                    ANALYTICS_FILTER.map((item, index) => (
                        <FilterComponent
                            txt={item.label}
                            key={index}
                            selected={selectedFilter === item.value}
                            onSelect={() => setSelectedFilter(item.value)}
                        />
                    ))
                }
            </div>
        </LayoutHeader>
    );
}