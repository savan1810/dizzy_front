import React from 'react'
import { getContrastColor, maxLength } from './DixeeInput2'
import { getAccentLightStyle, getAccentStyle, haxToRgbLight } from '../constants/constants'

const CusCard = ({ imgurl, txt, item, artist, userArticle }) => {
    return (
        <div className="w-[130px] flex-shrink-0 flex flex-col h-auto">
            <img onClick={() => window.open(item?.links[0]?.url, '_blank')} src={imgurl} alt="imageurl" className="h-[130px] object-cover w-[130px] cursor-pointer rounded-[3px]" />
            <div className="w-full pt-3 justify-center flex flex-col items-center gap-y-1">
                <p className="text-white w-full text-[12px]" style={getAccentStyle(getContrastColor(userArticle?.background))}>
                    {maxLength(txt, 15)}
                </p>
                <p className="text-gray-300 w-full text-[12px]" style={getAccentLightStyle(haxToRgbLight(getContrastColor(userArticle?.background)))}>
                    {maxLength(artist, 15)}
                </p>
            </div>
        </div>
    )
}

export default CusCard
