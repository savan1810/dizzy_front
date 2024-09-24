import React, { useState } from 'react';
import '../../../../css/ColorPicker.css'; // External CSS for custom styling
import FooterComment from "../../footerComment";

// Utility function to convert HSL to Hex
export const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to hex
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

const MainColorPicker = ({ setStep, setUser, user }) => {
    // State for hue and brightness/saturation
    const [hue, setHue] = useState(0);
    const [brightness, setBrightness] = useState(50);

    // Function to handle hue changes
    const handleHueChange = (e) => {
        setHue(e.target.value);
    };

    // Function to handle brightness/saturation changes
    const handleBrightnessChange = (e) => {
        setBrightness(e.target.value);
    };

    // Override brightness color with blue when hue is red (around 0 degrees)
    const adjustedBrightness = hue === '0' ? 50 : brightness; // This can be adjusted as needed

    // Calculating the current color using HSL (Hue, Saturation, Lightness)
    const selectedColor = `hsl(${hue}, 100%, ${adjustedBrightness}%)`;

    // Convert HSL to Hex
    const hexColor = hslToHex(hue, 100, adjustedBrightness);

    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div className="flex-grow flex justify-center items-center">
                <div className='space-y-[50px]'>
                    <div className="color-picker w-[300px] space-y-[50px]">
                        <h3 className='font-default w-[300px] text-start'>Select main color</h3>
                        <div className='flex flex-col justify-center items-start gap-y-[30px]'>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={hue}
                                onChange={handleHueChange}
                                className="hue-slider"
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={brightness}
                                onChange={handleBrightnessChange}
                                className="brightness-slider"
                                style={{
                                    background: `linear-gradient(to left, white,  hsl(${hue},100%, 50%))`
                                }}
                            />
                            <div className='flex items-start text-start gap-x-[10px]'>
                                <span className="font-default">Hex</span>
                                <p className="font-default">
                                    <span className="">{hexColor}</span>
                                </p>
                                <div
                                    className="color-display"
                                    style={{
                                        backgroundColor: selectedColor,
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '4px',
                                        border: '1px solid white' // Explicitly set the border color
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="font-default flex">
                        <div
                            className={`mr-[43px] cursor-pointer `}
                            onClick={() => {
                                setUser({
                                    ...user, background:
                                        hexColor.replace("#", "")
                                });
                                if (hexColor.replace("#", "")) {
                                    setStep(21);
                                }
                            }}
                        >
                            Confirm
                        </div>
                        <div className="cursor-pointer" onClick={() => setStep(6)}>
                            Go back
                        </div>
                    </div>
                </div>
            </div>
            <FooterComment comment={`This will be used as the main color in your dizee brand kit, used for backgrounds`} />
        </div>
    );
};

export default MainColorPicker;
