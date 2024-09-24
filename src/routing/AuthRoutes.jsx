import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Mobile from '../pages/login/Mobile';
import Otp from '../pages/login/Otp';
import Protect from '../pages/home/Protect';
import { useSelector } from 'react-redux';
import Domain from '../pages/Domain/Domain';
import Follower from '../pages/Domain/Follower';
import Following from '../pages/Domain/Following';

function AuthRoutes() {
    const isProtected = useSelector((state) => state.auth.protect);

    return (
        <Routes>
            {!isProtected ? (
                <>
                    <Route path="/" element={<Protect />} />
                    <Route path="/:domain" element={<Domain />} />
                    <Route path="/follower/:domain" element={<Follower />} />
                    <Route path="/following/:domain" element={<Following />} />

                </>
            ) : (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Mobile />} />
                    <Route path="/login-otp" element={<Otp />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/:domain" element={<Domain />} />
                    <Route path="/follower/:domain" element={<Follower />} />
                    <Route path="/following/:domain" element={<Following />} />

                </>
            )}
        </Routes>
    );
}

export default AuthRoutes;
