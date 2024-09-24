import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { follow_unfollow_auth_thunk, getRandomUserThunk } from '../../../../store/auth/authThunk';
import { clearAlerts } from '../../../../store/alert/alertSlice';

export default function Finalpage({ setStep, setUser, user }) {
    const username = user?.username;
    const dispatch = useDispatch();
    const [followers, setFollowers] = useState([]);
    const currentUser = useSelector((state) => state.user.userArticle);  // Currently logged-in user


    useEffect(() => {
        dispatch(getRandomUserThunk({ username })).then((res) => {
            console.log('res?.payload?.status', res?.payload?.status)
            if (res?.payload?.status === 200) {
                console.log('res.payload?.data?.data?.followers', res.payload?.data?.response)
                setFollowers(res.payload?.data?.response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [username, dispatch]);

    // Handle follow/unfollow logic
    const handleFollowUnfollow = async (followerId, isFollowing, domainVar, follower) => {
        dispatch(follow_unfollow_auth_thunk({ username: username, user: follower })).then((res) => {
            if (res?.payload?.status === 200) {
                // Update the followers list to reflect the follow/unfollow change
                setFollowers((prevFollowers) =>
                    prevFollowers.map((follower) =>
                        follower._id === followerId
                            ? { ...follower, isFollowing: !isFollowing }
                            : follower
                    )
                );
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="h-screen flex flex-col justify-between relative">
            <div className="flex-grow flex justify-center items-center">
                <div className='h-[100vh] max-w-[350px] text-white flex flex-col justify-center items-start gap-y-[40px]'>
                    <p className='font-default'>Follow some accounts to get started</p>
                    <div className='flex flex-col items-start'>
                        {followers?.length > 0 && followers.map((follower) => (
                            <div key={follower._id} className='max-w-[350px] flex justify-between items-start dizee-input mb-4'>
                                <img src={follower.avatar} alt={follower.username} className='w-[40px] h-[40px] rounded-full' />
                                <div className=' ml-6 gap-y-[4px]'>
                                    <p className='text-white'>{follower.username}</p>
                                    {currentUser?._id !== follower._id && (
                                        <button
                                            className={` ${follower.isFollowing ? 'text-red-500' : 'text-white'} py-[1px]  rounded`}
                                            onClick={() => handleFollowUnfollow(follower._id, follower.isFollowing, follower?.domain, follower)}
                                        >
                                            {follower.isFollowing ? 'Unfollow' : 'Follow'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='font-default' onClick={() => {
                        window.location.href = "/"
                    }}>Get dizee</button>

                </div >
            </div >
            <div className="absolute bottom-0 left-0 right-0 space-y-[15px] mb-4">
                <div className="flex flex-row gap-x-[10px]">
                    <p className="uppercase text-[13px] tracking-widest">DIZEE</p>
                </div>
                <div className="text-[12px] flex justify-start gap-x-[6px]">
                    <p>Terms</p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                </div>
            </div>
        </div >
    );
}
