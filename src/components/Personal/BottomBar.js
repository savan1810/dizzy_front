import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomBar() {
    const navigate = useNavigate(); // Use useNavigate hook for navigation

    return (
        <div className="fixed max-w-[350px] bottom-0 w-full ">
            <div className="flex justify-between items-center bg-black py-4 ">
                <button
                    className="font-default text-center py-2  rounded-lg"
                    onClick={() => console.log('Notification')}
                >
                    NOTIFICATION
                </button>
                <button
                    className="text-white text-center py-2  rounded-lg"
                    onClick={() => navigate('/search')} // Correctly navigate to the search page
                >
                    SEARCH
                </button>
                <button
                    className="font-default text-center py-2  rounded-lg"
                    onClick={() => console.log('Profile')}
                >
                    PROFILE
                </button>
            </div>
        </div>
    );
}
