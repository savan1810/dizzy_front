import React from 'react'
import More from '../../svg/More';
import { getContrastColor } from '../DixeeInput2';

export const Socialfeed = (props) => {
    const { userArticle, socialfeed, setOverlay, title } = props;
    return (
        <div className='w-[350px] sm:w-[639px] lg:w-[900px] px-4  relative'>
            <div className="text-[#FDFAFA] my-4 flex w-full flex-row justify-between items-center">
                <div>
                    <p className="mr-2" style={getContrastColor(userArticle?.background) ? { color: `#${getContrastColor(userArticle?.background)}` } : { color: '#ffffff' }}>
                        {title || 'SOCIAL POST'}
                    </p>
                </div>
                <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setOverlay(true)} />
            </div>
            <div className="w-full overflow-x-auto flex flex-row gap-x-4">
                {socialfeed?.map((item, index) => {
                    return (

                        <img key={index} src={item?.avatar} alt="imageurl" className="h-[190px] w-[150px] cursor-pointer rounded-[3px] object-cover" />

                    )
                })}
            </div>

        </div>
    )
}

