import peggyyou from '../../../../assets/images/components/peggygou 1.png'
import b1 from '../../../../assets/images/components/b1.png'
import b2 from '../../../../assets/images/components/b2.png'
import b3 from '../../../../assets/images/components/b3.png'
import CusCard from '../../../../components/CusCard';
import { SOCIAL_PLATFORMS, SOCIAL_PLATFORMS_SVG } from '../../../../constants/constants';
import { useDispatch } from 'react-redux';
import { add_userInfo_thunk } from '../../../../store/auth/authThunk';
import { clearAlerts, setErrorAlert } from '../../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { getContrastColor } from '../../../../components/DixeeInput2';
import { LoginFun } from '../../../../store/auth/authSlice';

const Presentation = ({ setStep, setUser, user }) => {
    const persistedData = localStorage.getItem('persist:root');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let imageFun = (image) => {
        if (typeof user.avatar === "string") {
            // setPreview(user.avatar);
            return user.avatar
        } else if (user.avatar instanceof Blob) {
            // setPreview(URL.createObjectURL(user.avatar));
            return URL.createObjectURL(user.avatar)
        }
    }


    // const getPlatformSrc = (value) => {
    //   const platform = SOCIAL_PLATFORMS.find(p => p.value === value);
    //   return platform ? platform.src : null;
    // };

    const handleSubmit = async () => {
        dispatch(clearAlerts())
        if (persistedData) {
            try {
                const parsedData = JSON.parse(persistedData);
                let userData = JSON.parse(parsedData.user);
                user.phone = userData.phone
                // Do something with the parsedData
            } catch (error) {
                console.error('Failed to parse persisted data:', error);
                dispatch(setErrorAlert('Email and Phone number are required'))

            }
        } else {
            console.log('No data found for the key "persist:root".');
            dispatch(setErrorAlert('Email and Phone number are required'))

        }
        const url = new URL(window.location.href);

        // Get the email parameter from the URL
        const emailParam = url.searchParams.get('email');
        const userParam = JSON.parse(url.searchParams.get('user'));
        if (userParam) {
            user.email = userParam.email
        }
        else {
            user.email = emailParam;
        }
        if (user.phone && user.email) {
            dispatch(add_userInfo_thunk(user)).then((res) => {
                console.log('res', res)
                if (res?.payload?.status === 200) {
                    dispatch(LoginFun(true))
                    if (user?.professionRole === 'personal') {
                        window.location.href = "/more"
                    }
                    else {
                        window.location.href = "/"
                    }
                    // navigate('/')
                }
            })
        }
        else {
            dispatch(setErrorAlert('Email and Phone number are required'))
        }
    };

    const getPlatformSrc = (value) => {
        const platform = SOCIAL_PLATFORMS_SVG.find(p => p.value === value);
        if (!platform) return null;

        return {
            Component: platform.Component,
            redirect: platform.redirect,
        };
    };

    return (
        <div>
            <div className='flex w-[300px] font-default  justify-end gap-x-[25px] mb-[15px]'>
                <div className="cursor-pointer " onClick={() => handleSubmit()}>Complete</div>
                <div className="cursor-pointer " onClick={() => setStep(12)}>Go back</div>
            </div>
            <div className="w-[300px] h-[360px]  flex relative rounded-lg rounded-br-lg">
                <img src={
                    imageFun(user.avatar)
                } alt="photoimage" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex justify-between items-end p-4 rounded-br-lg">
                    <div>
                        <p className='text-md text-white font-bold' style={{ color: "#FBFBFD" }}>{user?.domain}</p>
                        <div className='flex flex-row mt-2 gap-x-[8px]'>

                            {user?.social && Object.keys(user.social).map(key => {
                                const platformData = getPlatformSrc(key);

                                if (platformData && platformData.Component) {
                                    const SocialIcon = platformData.Component;
                                    return (
                                        <div
                                            key={key}
                                            className=' cursor-pointer'
                                        >
                                            <SocialIcon className="w-[16px] h-[16px] cursor-pointer" color={"#FBFBFD"} />
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>


                </div>
            </div>
            <div className='font-default flex justify-center items-center mt-[100px]'>
                <p>
                    FOR PRESENTATION PURPOSES ONLY
                </p>
            </div>
        </div>

    );
};

export default Presentation;
