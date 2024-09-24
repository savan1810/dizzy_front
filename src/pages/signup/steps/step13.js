import peggyyou from '../../../assets/images/components/peggygou 1.png'
import b1 from '../../../assets/images/components/b1.png'
import b2 from '../../../assets/images/components/b2.png'
import b3 from '../../../assets/images/components/b3.png'
import CusCard from '../../../components/CusCard';
import { SOCIAL_PLATFORMS, SOCIAL_PLATFORMS_SVG } from '../../../constants/constants';
import { useDispatch } from 'react-redux';
import { add_userInfo_thunk } from '../../../store/auth/authThunk';
import { clearAlerts, setErrorAlert } from '../../../store/alert/alertSlice';
import { useNavigate } from 'react-router';
import { getContrastColor } from '../../../components/DixeeInput2';
import { LoginFun } from '../../../store/auth/authSlice';

const Step13 = ({ setStep, setUser, user }) => {
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

    <div className='flex flex-col gap-y-[20px] sm:flex-row sm:gap-x-[120px] items-center justify-center py-[20px]'>
      <div class="relative mx-auto border-slate-300 bg-black border-[4px] rounded-[2.5rem] h-[628px] w-[300px] shadow-2xl order-2 sm:order-1">
        <div class="w-[100px] h-[28px] bg-black top-3 z-10 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div class="h-[46px] w-[3px] bg-slate-300 absolute -left-[8px] top-[124px] rounded-s-lg"></div>
        <div class="h-[46px] w-[3px] bg-slate-300 absolute -left-[8px] top-[178px] rounded-s-lg"></div>
        <div class="h-[64px] w-[3px] bg-slate-300 absolute -right-[8px] top-[142px] rounded-e-lg"></div>

        <div class="absolute inset-0 border-black border-[7px] rounded-[2.5rem] h-[620px] w-[292px]">
          <div class="rounded-[2rem] overflow-hidden w-[280px] h-[606px] bg-white dark:bg-gray-800 ">
            <div className=" h-auto bg-orange-300 flex flex-col justify-start items-center relative" style={user.background ? { backgroundColor: `#${user.background}` } : { backgroundColor: '#000000' }}>
              <div className=" text-[#FDFAFA] py-4 flex item-center justify-between gap-x-[25px] mt-[35px] px-[5px]">
                <span className='text-[10px]' style={getContrastColor(user?.background) ? { color: `#${getContrastColor(user?.background)}` } : { color: '#ffffff' }}>MUSIC</span>
                <span className='text-[10px]' style={getContrastColor(user?.background) ? { color: `#${getContrastColor(user?.background)}` } : { color: '#ffffff' }}>TOUR DATES</span>
                <span className='text-[10px]' style={getContrastColor(user?.background) ? { color: `#${getContrastColor(user?.background)}` } : { color: '#ffffff' }}>GOODS</span>
                <span className='text-[10px]' style={getContrastColor(user?.background) ? { color: `#${getContrastColor(user?.background)}` } : { color: '#ffffff' }}>PRESS</span>
              </div>
              <div className="w-[280px] h-[360px]  flex relative rounded-lg rounded-br-lg">
                <img src={
                  imageFun(user.avatar)
                } alt="photoimage" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent flex justify-between items-end p-4 rounded-br-lg">
                  <div>
                    <p className='text-md text-white font-bold' style={{ color: "#FBFBFD" }}>{user?.username}</p>
                    <div className='flex flex-row mt-2 gap-x-1'>
                      {/* {user?.social && Object.keys(user?.social).map(key => {
                        const src = getPlatformSrc(key);
                        if (src) {
                          return (
                            <img
                              key={key}
                              src={src}
                              alt={key}
                              className='h-[10px] w-[10px] mx-1'
                            />
                          );
                        }
                        return null;
                      })} */}
                      {user?.social && Object.keys(user.social).map(key => {
                        const platformData = getPlatformSrc(key);

                        if (platformData && platformData.Component) {
                          const SocialIcon = platformData.Component;
                          return (
                            <div
                              key={key}
                              className=' cursor-pointer'
                            >
                              <SocialIcon className="w-[12px] h-[12px] cursor-pointer" color={"#FBFBFD"} />
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  </div>
                  <div>
                    <img src={peggyyou} alt='sp' className=' absolute bottom-0 right-0 h-[40px] w-[40px] ' />

                  </div>

                </div>
              </div>


              <div className="text-[#FDFAFA] my-4 flex flex-row  justify-between items-center">
                {/* <img src={plus} alt='plus' className='h-[12px] w-[12px] mx-2 ' />
              <p style={{ fontSize: '12px' }}>
                Add a section

              </p> 
                    */}
              </div>

              <div className="text-[#FDFAFA] text-[10px] my-4 flex w-full px-4 flex-row justify-between items-center">
                <div>
                  <p className="mr-2" style={getContrastColor(user?.background) ? { color: `#${getContrastColor(user?.background)}` } : { color: '#ffffff' }}>MUSIC</p>
                </div>
                {/* <img src={more} alt='sp' className='h-[2px] w-[10px] ' /> */}
              </div>



              <div className='w-full overflow-x-auto px-4 flex flex-row gap-4'>
                <CusCard imgurl={b1} txt="(It goes like) Nanana - Edit" />
                <CusCard imgurl={b2} txt="(It goes like) Nanana - Edit" />
                <CusCard imgurl={b3} txt="(It goes like) Nanana - Edit" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-[40px] sm:gap-y-[84px] text-[12px] order-1 sm:order-2'>
        <div>
          Get dizee
        </div>
        <div className='flex justify-center gap-x-[25px]'>
          <div className="cursor-pointer" onClick={() => handleSubmit()}>Complete</div>
          <div className="cursor-pointer" onClick={() => setStep(12)}>Go back</div>
        </div>
      </div>
    </div>

  );
};

export default Step13;
