import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutPersonalHeader from '../../layout/LayoutPersonalHeader';
import { follow_unfollow_auth_thunk, getSearchByUserDomainThunk } from '../../store/auth/authThunk';
import { setUserArticle } from '../../store/user/userSlice';
import CrossArrow from '../../svg/CrossArrow';
import BottomBar from '../../components/Personal/BottomBar';

export default function Search() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const userArticle = useSelector((state) => state.user.userArticle);  // Currently logged-in user
    const token = localStorage.getItem('dizeeToken');

    // Debounce the search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // Adjust delay as needed (300ms here)

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Fetch users based on debounced search term
    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchUsers = async () => {
                try {
                    const res = await dispatch(getSearchByUserDomainThunk({ username: userArticle?.username, domain: debouncedSearchTerm, token }));
                    if (res?.payload?.status === 200) {
                        const fetchedUsers = res.payload?.data?.response.map(user => ({
                            ...user,
                            isFollowing: user.followers?.includes(userArticle?._id) // Check if the logged-in user is following
                        }));
                        setUsers(fetchedUsers);
                    }
                } catch (err) {
                    console.log(err);
                }
            };

            fetchUsers();
        } else {
            setUsers([]); // Clear users if search term is empty
        }
    }, [debouncedSearchTerm, userArticle?.username, dispatch]);

    // Handle follow/unfollow logic
    const handleFollowUnfollow = async (followerId, isFollowing, follower) => {
        try {
            const res = await dispatch(follow_unfollow_auth_thunk({ username: userArticle?.username, user: follower }));
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <LayoutPersonalHeader>
            <div className='flex flex-col justify-between h-[80vh]'>
                <div className="flex-grow flex justify-center items-center">
                    <div className='max-w-[350px] text-white flex flex-col items-start gap-y-[20px]'>
                        <p className='font-default'>Related results</p>
                        <div className='flex flex-col items-start gap-y-[20px] pt-[20px]'>
                            {users.length > 0 ? (
                                users.map((follower) => (
                                    <div key={follower._id} className='w-[300px] sm:w-[350px] flex justify-between items-center dizee-input'>
                                        <div className='flex justify-center items-center'>
                                            <div className='flex justify-center items-center gap-x-[5px]'>
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
                                ))
                            ) : (
                                <p className='w-[300px] sm:w-[350px] flex justify-between items-center dizee-input'>No results found</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="fixed bottom-10 w-full max-w-[350px]">
                    <div className="flex justify-center items-center bg-white mb-6 py-0 rounded-lg shadow-md">
                        <input
                            type="text"
                            placeholder="Search by domain..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border-none rounded-lg w-full py-4 outline-none ml-[8px]"
                        />
                    </div>
                </div>
                <BottomBar />
            </div>
        </LayoutPersonalHeader>
    );
}
