import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../store/auth/authThunk';
import { clearAlerts } from '../store/alert/alertSlice';
import DotSvg from '../svg/DotSvg';
import { BACKEND_URL } from '../utils/axios';
import { removeUploadsFromUrl } from '../components/DixeeInput2';
import { Link, useLocation } from 'react-router-dom';
import { setUserArticle } from '../store/user/userSlice';
import { update_user_article_thunk } from '../store/user/userThunk';

export default function PersonalHeader() {
    let token = localStorage.getItem('dizeeToken');
    const location = useLocation();
    const currentPath = location.pathname;
    const userArticle = useSelector((state) => state.user.userArticle);


    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const profilePicRef = useRef(null);
    let user = localStorage.getItem('dizeeUser');
    user = JSON.parse(user);


    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    const handleLogout = () => {
        dispatch(clearAlerts());
        dispatch(logoutThunk());
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            profilePicRef.current && !profilePicRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateUserArticle = async (bool) => {
        // dispatch(setUserArticle({ ...userArticle, unpublish: bool }));
        dispatch(update_user_article_thunk({ token, body: { ...userArticle, unpublish: bool } }));
    }

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-[100px] flex items-center justify-between px-[3vw] z-[9] bg-black'>
                <div className='flex-grow'></div>
                <div className='flex items-center gap-[12px] sm:gap-[100px] md:gap-[120px] lg:gap-[220px]'>
                    <Link to={'/'} className={`${currentPath === '/' ? 'text-white' : 'text-[#4d4d4d]'} text-[14px] cursor-pointer`}>suggested</Link>
                    <Link to={'/top'} className={`${currentPath.includes('/top') ? 'text-white' : 'text-[#4d4d4d]'} text-[14px] cursor-pointer`}>top</Link>
                    <Link to={'/trending'} className={`${currentPath.includes('/trending') ? 'text-white' : 'text-[#4d4d4d]'} text-[14px] cursor-pointer`}>trending</Link>
                    <Link to={'/following'} className={`${currentPath.includes('/following') ? 'text-white' : 'text-[#4d4d4d]'} text-[14px] cursor-pointer`}>following</Link>
                </div>
                <div className='relative flex-grow flex justify-end'>
                    <img
                        src={removeUploadsFromUrl(`${user?.avatar}`)}
                        alt='imagedp'
                        className='h-[40px] w-[40px] rounded-full cursor-pointer'
                        onClick={toggleDropdown}
                        ref={profilePicRef}
                    />
                    {dropdownVisible && (
                        <div ref={dropdownRef} className='absolute right-0 mt-[50px] w-48 cursor-pointer bg-gray-800 hover:bg-gray-900 rounded-md shadow-lg py-1 z-50'>
                            <span
                                className='block px-4 py-2 text-sm text-gray-100'
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}
