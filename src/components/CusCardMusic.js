import React from 'react';
import { getContrastColor, maxLength } from './DixeeInput2';
import { getAccentLightStyle, getAccentStyle, haxToRgbLight } from '../constants/constants';
import Spotify from '../svg/Social/Spotify';
import AppleMusic from '../svg/Social/AppleMusic';
import AmazonMusic from '../svg/MusicPlatform/AmazonMusic';
import SoundCloud from '../svg/MusicPlatform/SoundCloud';
import Tidal from '../svg/MusicPlatform/Tidal';
import { useNavigate } from 'react-router';
import MusicDataPage from '../pages/Main/Pages/Music/MusicDataPage';

const componentMapping = {
    spotify: (props) => <Spotify {...props} />,
    apple_music: (props) => <AppleMusic {...props} />,
    amazon: (props) => <AmazonMusic {...props} />,
    soundcloud: (props) => <SoundCloud {...props} />,
    tidal: (props) => <Tidal {...props} />
};

const CusCardMusic = ({ imgurl, txt, artist, userArticle, links, item }) => {
    const navigate = useNavigate();
    const contrastColor = getContrastColor(userArticle?.background);
    const accentStyle = getAccentStyle(contrastColor);
    const accentLightStyle = getAccentLightStyle(haxToRgbLight(contrastColor));

    const [showModal, setShowModal] = React.useState(false);
    console.log('item', item?.id)
    return (
        <>
            <div className="w-[130px] flex-shrink-0 flex flex-col h-auto">
                <img
                    onClick={() =>
                        setShowModal(true)
                        // window.open(`/music-data/${userArticle?.domain}/${item?.id}`, '_blank')
                    }
                    src={imgurl} alt="imageurl" className="h-[130px] object-cover w-[130px] cursor-pointer rounded-[3px]" />
                <div className="w-full pt-3 justify-center flex flex-col items-center gap-y-1">
                    <p className="text-white w-full text-[12px]" style={getAccentStyle(userArticle?.accent)}>
                        {maxLength(txt, 15)}
                    </p>
                    <p className="text-gray-300 w-full text-[12px]" style={getAccentLightStyle(haxToRgbLight(userArticle?.accent))}>
                        {maxLength(artist, 15)}
                    </p>
                </div>
            </div>
            {showModal &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">

                    <MusicDataPage domain={userArticle?.domain} id={item?.id} setShowModal={setShowModal} />
                </div>
            }
        </>
    );
};

export default CusCardMusic;


// <div className="w-[130px] flex-shrink-0 flex flex-col h-auto">
//     {/* Image container with hover group */}
//     <div className="relative overflow-hidden group">
//         <img
//             onClick={() => window.open(links[0]?.url, '_blank')}
//             src={imgurl}
//             alt="imageurl"
//             className="h-[130px] object-cover w-[130px] cursor-pointer rounded-[3px]"
//         />
//         {/* Overlay, visible on hover via group-hover */}
//         <div className="hidden group-hover:flex absolute top-0 left-0 bg-black bg-opacity-50 w-full h-full rounded-[3px] justify-center items-center text-white text-sm">
//             <div className="flex flex-wrap justify-center items-center gap-2 px-2">
//                 {links.map(link => (
//                     <span key={link.source} className="mx-1 cursor-pointer" onClick={() => window.open(link.url, '_blank')}>
//                         {componentMapping[link.source] && componentMapping[link.source]({ className: 'w-4 h-4' })}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     </div>

//     {/* Text part, not affected by hover */}
//     <div className="w-full pt-3 flex flex-col items-center gap-y-1">
//         <p
//             className="text-white w-full text-[12px] text-start"
//             style={accentStyle}
//         >
//             {maxLength(txt, 15)}
//         </p>
//         <p
//             className="text-gray-300 w-full text-[12px] text-start"
//             style={accentLightStyle}
//         >
//             {maxLength(artist, 15)}
//         </p>
//     </div>
// </div>