import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow_unfollow_thunk } from '../../store/user/userThunk';
import { useParams } from 'react-router';
import { get_following_list } from '../../store/domain/domainThunk';  // Fetch following list instead

export default function Following() {
    const token = localStorage.getItem('dizeeToken');
    const { domain } = useParams();
    const dispatch = useDispatch();
    const [following, setFollowing] = useState([]);  // Use 'following' instead of 'followers'
    const currentUser = useSelector((state) => state.user.userArticle);  // Currently logged-in user

    useEffect(() => {
        // Fetch the following list of the target user (whose domain is passed as a prop)
        dispatch(get_following_list({ domain, token })).then((res) => {
            if (res?.payload?.status === 200) {
                setFollowing(res.payload?.data?.response);  // Set the following in the state
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [domain, dispatch]);

    // Handle follow/unfollow logic
    const handleFollowUnfollow = async (followingId, isFollowing, domainVar) => {
        dispatch(follow_unfollow_thunk({ domain: domainVar, token })).then((res) => {
            if (res?.payload?.status === 200) {
                // Update the following list to reflect the follow/unfollow change
                setFollowing((prevFollowing) =>
                    prevFollowing.map((following) =>
                        following._id === followingId
                            ? { ...following, isFollowing: !isFollowing }
                            : following
                    )
                );
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='h-[100vh] w-full text-white flex justify-center items-center'>
            {following?.length > 0 && following.map((user) => (
                <div key={user._id} className='max-w-[350px] flex justify-between items-center dizee-input mb-4'>
                    <img src={user.avatar} alt={user.username} className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col ml-4 gap-y-[4px]'>
                        <p className='text-white'>{user.username}</p>
                        {currentUser?._id !== user._id && (
                            <button
                                className={`ml-auto ${user.isFollowing ? 'bg-red-500' : 'bg-white'} px-4 py-[1px] text-black rounded`}
                                onClick={() => handleFollowUnfollow(user._id, user.isFollowing)}
                            >
                                {user.isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
