import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutPersonalHeader from '../../layout/LayoutPersonalHeader';
import { follow_unfollow_auth_thunk, getTopUserThunk } from '../../store/auth/authThunk';
import { setUserArticle } from '../../store/user/userSlice';
import CrossArrow from '../../svg/CrossArrow';
import BottomBar from '../../components/Personal/BottomBar';

export default function Top() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const userArticle = useSelector((state) => state.user.userArticle);  // Currently logged-in user

    // Fetch top users
    useEffect(() => {
        dispatch(getTopUserThunk({ username: userArticle?.username, size: 7 })).then((res) => {
            if (res?.payload?.status === 200) {
                const fetchedUsers = res.payload?.data?.response.map(user => ({
                    ...user,
                    isFollowing: user.followers?.includes(userArticle?._id) // Check if the logged-in user is following
                }));
                setUsers(fetchedUsers);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [userArticle?.username, dispatch]);

    // Handle follow/unfollow logic
    const handleFollowUnfollow = async (followerId, isFollowing, follower) => {
        dispatch(follow_unfollow_auth_thunk({ username: userArticle?.username, user: follower })).then((res) => {
            if (res?.payload?.status === 200) {
                // Update the followers list to reflect the follow/unfollow change
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === followerId
                            ? { ...user, isFollowing: !isFollowing }  // Toggle the follow/unfollow state
                            : user
                    )
                );

                // Update the global user state with the updated follower list
                dispatch(setUserArticle(res?.payload?.data?.response));
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <LayoutPersonalHeader>
            <div className='flex flex-col justify-start items-center '>
                <div className="flex-grow flex justify-center items-center">
                    <div className='h-[80vh] max-w-[350px] text-white flex flex-col items-start gap-y-[40px]'>
                        <div className='flex flex-col items-start gap-y-[60px] pt-[20px] pb-[70px]'>
                            {users?.length > 0 && users.map((follower) => (
                                <div key={follower._id} className='w-[300px] sm:w-[350px] flex justify-between items-center dizee-input'>
                                    <div className='flex justify-center items-center'>
                                        <img src={follower.avatar} alt={follower.username} className='w-[40px] h-[40px] rounded-full' />
                                        <div className='ml-6 flex justify-center items-center gap-x-[5px]'>
                                            <p className='text-white'>diz.ee/{follower.domain}</p>
                                            <div className="mr-4" onClick={() => {
                                                window.open(`https://diz.ee/${follower.domain}`, '_blank');
                                            }}>
                                                <CrossArrow className='h-[14px] w-[14px] cursor-pointer' />
                                            </div>
                                        </div>
                                    </div>
                                    {userArticle?._id !== follower._id && (
                                        <button
                                            className={` ${follower.isFollowing ? 'text-red-500' : 'text-white'} rounded`}
                                            onClick={() => handleFollowUnfollow(follower._id, follower.isFollowing, follower)}
                                        >
                                            {follower.isFollowing ? 'Unfollow' : 'Follow'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <BottomBar /> {/* Add the BottomBar component here */}
            </div>
        </LayoutPersonalHeader>
    );
}
