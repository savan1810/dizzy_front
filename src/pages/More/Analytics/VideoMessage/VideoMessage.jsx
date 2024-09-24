import React, { useEffect, useState } from 'react'
import LayoutHeader from '../../../../layout/LayoutHeader'
import { useNavigate } from 'react-router';
import SelectionCard from '../../../../components/SelectionCard';
import RedirectCard from '../../../../components/More/RedirectCard';
import { getDataAPI, postDataAPI } from '../../../../utils/fetchData';
import { maxLength } from '../../../../components/DixeeInput2';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAlert } from '../../../../store/alert/alertSlice';

export default function VideoMessageAnalytics() {
    const navigate = useNavigate();
    const token = localStorage.getItem('dizeeToken');
    const [totlaClick, setTotalClick] = useState(null);
    const [videoMessage, setVideoMessage] = useState(null);
    const filter = useSelector((state) => state.setting.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getDataAPI(`analytics/get-video-message-analytics?filter=${filter}`, token).then((res) => {
                    if (res?.data?.status === 200) {
                        setTotalClick(res?.data?.data?.totalClicks)
                        setVideoMessage(res?.data?.data?.response)
                    }
                })
            } catch (err) {
                dispatch(setErrorAlert(err.response.data.message))
            }

        }

        fetchData()
    }, [filter])
    return (
        <LayoutHeader>
            <div className="w-[390px] flex flex-col justify-start items-center relative z-[0]">
                <div className='px-4 my-[50px]  flex w-full justify-between'>
                    <p className='text-white'>Video message analytics</p>
                    <div className='flex justify-center items-center gap-x-[20px]'>
                        <p className='text-[red] cursor-pointer'>Export data</p>
                        <p onClick={() => navigate('/more/analytics')} className='text-white cursor-pointer'>Go Back</p>
                    </div>
                </div>
                <div className='px-4 my-[50px] flex w-full justify-between'>
                    <p className='text-white'>Total clicks (all time)</p>
                    <p className='text-white cursor-pointer' onClick={() => navigate('/more/analytics/filter', { state: { path: '/more/analytics/video-message' } })}>Filter</p>
                </div>
                <div className='px-4 my-[50px] flex flex-col gap-y-[38px] w-full '>
                    <div className='flex justify-between items-center'>
                        <p className='text-white'>All video messages</p>
                        <p className='text-white'>{totlaClick}</p>
                    </div>
                    {
                        videoMessage?.length > 0 && videoMessage.map((item, index) => {
                            return (<div className='flex justify-between items-center'>
                                <p className='text-white'>{maxLength(item?.title, 30)}</p>
                                <p className='text-white'>{item?.clicks?.length}</p>
                            </div>)
                        }
                        )}

                </div>
            </div>
        </LayoutHeader>
    )
}
