import insta from '../assets/images/components/insta.png'
import facebook from '../assets/images/components/facebook.png'
import tiktok from '../assets/images/components/tiktok.png'
import youtube from '../assets/images/components/youtube.png'
import snapchat from '../assets/images/components/snapchat.png'
import twitter from '../assets/images/components/twitter.png'

import InstagramSvg from "../svg/Social/Instagram"
import TwitterSvg from "../svg/Social/TwitterX"
import FacebookSvg from "../svg/Social/Facebook"
import TiktokSvg from "../svg/Social/Tiktok"
import SnapchatSvg from "../svg/Social/Snapchat"
import YoutubeSvg from "../svg/Social/Youtube"
import SpotifySvg from "../svg/Social/Spotify"
import ApplemusicSvg from "../svg/Social/AppleMusic"
import ThreadSvg from "../svg/Social/Thread"
import LinkedinSvg from "../svg/Social/Linkedin"

export const SOCIAL_PLATFORMS = [
    { label: "Instagram", value: "ig", src: insta, redirect: 'https://www.instagram.com/' },
    { label: "Twitter", value: "x", src: twitter, redirect: 'https://twitter.com/' },
    // { label: "Threads", value: "tt", src: threads },
    { label: "FaceBook", value: "fb", src: facebook, redirect: 'https://www.facebook.com/' },
    { label: "Tiktok", value: "tt", src: tiktok, redirect: 'https://www.tiktok.com/' },
    { label: "Snapchat", value: "sc", src: snapchat, redirect: 'https://www.snapchat.com/' },
    { label: "youtube", value: "yt", src: youtube, redirect: 'https://www.youtube.com/' },
];

export const SOCIAL_PLATFORMS_SVG = [
    { label: "Instagram", value: "ig", Component: InstagramSvg, redirect: 'https://www.instagram.com/' },
    { label: "Twitter", value: "x", Component: TwitterSvg, redirect: 'https://twitter.com/' },
    { label: "FaceBook", value: "fb", Component: FacebookSvg, redirect: 'https://www.facebook.com/' },
    { label: "Tiktok", value: "tt", Component: TiktokSvg, redirect: 'https://www.tiktok.com/' },
    { label: "Snapchat", value: "sc", Component: SnapchatSvg, redirect: 'https://www.snapchat.com/' },
    { label: "Youtube", value: "yt", Component: YoutubeSvg, redirect: 'https://www.youtube.com/' },
    { label: "Spotify", value: "sf", Component: SpotifySvg, redirect: 'https://www.spotify.com/' },
    { label: "Apple Music", value: "am", Component: ApplemusicSvg, redirect: 'https://music.apple.com/' },
    { label: "Threads", value: "th", Component: ThreadSvg, redirect: 'https://www.threads.net/' },
    { label: "Linkedin", value: "li", Component: LinkedinSvg, redirect: 'https://linkedin.com' },
];

export const videoMessageOpts = [
    { label: "Save as draft", value: "save-as-draft" },
    { label: "Post on page", value: "post-on-page" },
];

export const PLATFORM_IDS = {
    spotify: "spotify",
    apple: "apple_music",
    amazon: "amazon",
    soundcloud: "soundcloud",
    deezer: "deezer",
    tidal: "tidal",
    youtube: "youtube",
};
export const MUSIC_PLATFORMS = [
    { label: "Spotify", value: PLATFORM_IDS.spotify, },
    { label: "Apple Music", value: PLATFORM_IDS.apple, },
    { label: "Amazon Music", value: PLATFORM_IDS.amazon, },
    { label: "Soundcloud", value: PLATFORM_IDS.soundcloud, },
    { label: "Deezer", value: PLATFORM_IDS.deezer, },
    { label: "Tidal", value: PLATFORM_IDS.tidal, },
    { label: "Youtube Music", value: PLATFORM_IDS.youtube, },
];
export const MANUAL_MUSIC_PLATFORMS = [
    { label: "Spotify", value: PLATFORM_IDS.spotify, },
    { label: "Apple Music", value: PLATFORM_IDS.apple, },
    { label: "Amazon Music", value: PLATFORM_IDS.amazon, },
    { label: "Tidal", value: PLATFORM_IDS.tidal, },
    { label: "Soundcloud", value: PLATFORM_IDS.soundcloud, },
];

export const VIDEO_PLATFORMS = [
    { label: "Youtube", value: "youtube" },
    // { label: "Vimeo", value: "vimeo" },
]

export const EVENT_PLATFORMS = [
    { label: "Bandsintown", value: "bandsintown" },
    // { label: "Ticketmaster", value: "ticketmaster" },
    { label: "Songkick", value: "songkick" },
    { label: "Seated", value: "seated" },
]

export const PRODUCT_PLATFORMS = [
    { label: "Shopify", value: "shopify" },
    { label: "Big cartel", value: "bigcartel" },
]


export const PLAYLIST_PLATFORMS = [
    { label: "Spotify", value: PLATFORM_IDS.spotify },
    { label: "Apple Music", value: PLATFORM_IDS.apple },
]

export const SOCIAL_PLATFORMS_FOR_FEED = [
    { label: "TikTok", value: "tt" },
    { label: "Instagram Reels", value: "igreel" },
    { label: "Instagram Grid", value: "iggrid" },
    { label: "Youtube Shorts", value: "ytshorts" },
]

export const SELECT_SECTION = [
    { label: "Image", value: "image" },
    { label: "Logo", value: "logo" },
    { label: "Socials", value: "socials" },
    { label: "Music", value: "music" },
    { label: "Tour", value: "tour" },
    { label: "Merch", value: "merch" },
    { label: "Updates", value: "updates" },
    { label: "Forms", value: "forms" },

]

export const getAccentStyle = (accent) => {
    return accent ? { color: `#${accent}` } : { color: '#ffffff' };
};
export const getAccentLightStyle = (accent) => {
    return accent ? { color: `${accent}` } : { color: '#ffffff' };
};

export const getAccentColor = (accent) => {
    return accent ? `#${accent}` : '#ffffff';
};



export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const haxToRgbLight = (hex) => {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.8)`;
}

export const articlDataDefaultArray = [
    {
        title: "MUSIC",
        type: "music",
    },
    {
        title: "TOUR",
        type: "event",
    },
    {
        title: "MERCH",
        type: "product",
    },
    {
        title: "VIDEO",
        type: "video",
    },
    {
        title: "SOCIAL POSTS",
        type: "socialfeed",
    },
    {
        title: "PLAYLIST",
        type: "playlist",
    },
    {
        title: "FORM",
        type: "form",
    }
]

export const ANALYTICS_FILTER = [
    { label: "24 hours", value: "24hours" },
    { label: "7 days", value: "7days" },
    { label: "30 days", value: "30days" },
    { label: "365 days", value: "365days" },
    { label: "All time", value: "alltime" },
]