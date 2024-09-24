import React from 'react';
import More from '../../svg/More';
import { getContrastColor } from '../DixeeInput2';
import CusCardMusic from '../CusCardMusic';

export default function Music(props) {
    let { userArticle, music, setMusicOverlay, title } = props;

    return (
        <>
            {music?.length > 0 &&
                <div className="text-[#FDFAFA] mb-4 flex w-full px-4 flex-row justify-between items-center">
                    <div>
                        <p className="mr-2" style={userArticle?.accent ? { color: `#${userArticle?.accent}` } : { color: '#ffffff' }}>
                            {title || `MUSIC`}
                        </p>
                    </div>
                    <More className='h-[20px] w-[20px] cursor-pointer' color={getContrastColor(userArticle?.background) ? `#${getContrastColor(userArticle?.background)}` : '#ffffff'} onClick={() => setMusicOverlay(true)} />
                </div>
            }
            {music?.length > 0 && (
                <div className="w-full mb-[50px] overflow-x-auto px-4 flex flex-row gap-x-4">
                    {music.slice(0, 6).map((item, index) => (
                        <CusCardMusic
                            key={index}
                            imgurl={item?.avatar}
                            txt={item?.title}
                            artist={item?.artist}
                            userArticle={userArticle}
                            links={item?.links}  // Passing links to CusCard
                            item={item}
                        />
                    ))}
                </div>
            )}
        </>
    );
}