import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { follow_unfollow_thunk } from '../../store/user/userThunk';
import { useParams } from 'react-router';
import { get_follower_list } from '../../store/domain/domainThunk';

export default function Follower() {
    const token = localStorage.getItem('dizeeToken');
    const { domain: domain } = useParams();
    const dispatch = useDispatch();
    const [followers, setFollowers] = useState([]);
    const currentUser = useSelector((state) => state.user.userArticle);  // Currently logged-in user

    useEffect(() => {
        // Fetch the followers of the target user (whose domain is passed as a prop)
        dispatch(get_follower_list({ domain, token })).then((res) => {
            console.log('res?.payload?.status', res?.payload?.status)
            if (res?.payload?.status === 200) {
                console.log('res.payload?.data?.data?.followers', res.payload?.data?.response)
                setFollowers(res.payload?.data?.response);  // Set the followers in the state
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [domain, dispatch]);

    // Handle follow/unfollow logic
    const handleFollowUnfollow = async (followerId, isFollowing, domainVar) => {
        dispatch(follow_unfollow_thunk({ domain: domainVar, token })).then((res) => {
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
        <div className='h-[100vh] w-full text-white flex justify-center items-center'>
            {followers?.length > 0 && followers.map((follower) => (
                <div key={follower._id} className='max-w-[350px] flex justify-between items-center dizee-input mb-4'>
                    <img src={follower.avatar} alt={follower.username} className='w-[50px] h-[50px] rounded-full' />
                    <div className='flex flex-col ml-4 gap-y-[4px]'>
                        <p className='text-white'>{follower.username}</p>
                        {currentUser?._id !== follower._id && (
                            <button
                                className={`ml-auto ${follower.isFollowing ? 'bg-red-500' : 'bg-white'} px-4 py-[1px] text-black rounded`}
                                onClick={() => handleFollowUnfollow(follower._id, follower.isFollowing, follower?.domain)}
                            >
                                {follower.isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
}
