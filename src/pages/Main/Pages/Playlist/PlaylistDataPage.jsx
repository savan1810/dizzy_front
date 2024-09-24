import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { postDataAPI } from '../../../../utils/fetchData';
import { maxLength, removeUploadsFromUrl } from '../../../../components/DixeeInput2';

import CrossArrow from '../../../../svg/CrossArrow';




export default function PlaylistDataPage() {
    const { domain: domain } = useParams();
    const [data, setData] = useState({});
    console.log('domain', domain)
    const getMusic = async () => {
        try {
            const res = await postDataAPI(`auth/get-playlist-data`, { domain }, null);
            console.log('res?.data?.response', res?.data?.data?.response)
            if (res?.data?.status === 200) {
                setData(res?.data?.data?.response)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        getMusic()
    }, []);


    const handlePlaylistClick = async (item) => {
        window.open(`${item.links[0]?.url}`, '_blank')
        try {
            await postDataAPI('analytics/create-playlist-analytics', { link: item?.links[0]?.url, domain: domain, title: item?.title }, null);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className="w-[350px] sm:max-w-[390px] pb-[16px] h-full flex flex-col justify-center items-center relative rounded-[20px]" >
                <div className="max-w-[350px] sm:max-w-[390px] max-h-[350px] sm:max-h-[390px] flex  relative">
                    <img src={removeUploadsFromUrl(`${data?.[0]?.avatar}`)} alt="photoimage" className="w-full h-full object-cover rounded-[20px] " />
                    <div
                        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t to-transparent flex justify-between items-end pl-4 from-black"

                    >
                        <div className='flex flex-col justify-center gap-y-2 pb-2'>
                            <p className='text-[12px] text-[#FBFBFD] ' style={{ color: '#FBFBFD' }}>{data?.[0]?.artist}</p>
                            <p className='text-[15px] text-[#FBFBFD] font-bold' style={{ color: '#FBFBFD' }}>{data?.[0]?.title}</p>
                            {/* <div className="flex flex-wrap  items-center gap-x-[10px]">
                                {data?.links?.length > 0 && data?.links.map(link => (
                                    <span key={link.source} className=" cursor-pointer"
                                        onClick={() => handleClickMusic(link, data)}
                                    >
                                        {componentMapping[link.source] && componentMapping[link.source]({ className: 'w-4 h-4 mx-0' })}
                                    </span>
                                ))}
                            </div> */}
                        </div>

                    </div>

                </div>
                <div className='w-full flex flex-col justify-center items-center gap-y-[16px] mt-[60px]'>
                    {data?.length > 0 && data.map((item, index) => {
                        return (
                            <>
                                <div className='flex w-full item-center justify-between px-4 text-[12px]'>
                                    <p className='text-white' >{maxLength(item?.title, 30)}</p>

                                    <div className='flex gap-x-1'
                                        onClick={() => handlePlaylistClick(item)}
                                    >
                                        <p className='text-white cursor-pointer' >LISTEN NOW</p>
                                        <button >
                                            <CrossArrow />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
