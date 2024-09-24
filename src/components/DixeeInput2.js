import { BACKEND_URL, BASE_URL } from "../utils/axios";

export const DizeeInput2 = ({ onChange, value, placeholder, className }) => {
    return <input value={value} onChange={onChange} placeholder={placeholder} className={className} />;
}
export const DizeeInput3 = ({ color, onChange, value, placeholder, className }) => {
    return <input style={{ color: `#${color}` }} value={value} onChange={onChange} placeholder={placeholder} className={className} />;
}
export const DizeeNumberInput = ({ onChange, value, type, placeholder, className }) => {
    return <input value={value} onChange={onChange} type={type} placeholder={placeholder} className={className} />;
}

export const maxLength = (text, number) => {
    return text?.length > number ? text?.slice(0, number) + '...' : text
}

export function removeUploadsFromUrl(url) {
    if (url?.includes("uploads/")) {
        let newUrl = url.replace(/uploads\//, '/');
        return `${BACKEND_URL}/${newUrl}`;

    }
    else {
        return url
    }
    // Use regular expression to remove the 'uploads/' segment
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

export const getContrastColor = (hex, bw = true) => {
    if (hex) {

        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // Convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            return
            // throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // Use luminance formula to return either black or white
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '000000'
                : 'FFFFFF';
        }
        // Invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // Pad each with zeros and return
        return padZero(r) + padZero(g) + padZero(b);
    }
    return
};

// Function to shade a color by a given percentage
const padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
};
