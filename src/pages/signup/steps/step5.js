import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAlerts, setLoader } from '../../../store/alert/alertSlice';
import { postDataAPI } from '../../../utils/fetchData';
import { DizeeInput2 } from '../../../components/DixeeInput2';
import FooterComment from "../footerComment";

const Step5 = ({ setStep, setUser, user }) => {
  const [debouncedBio, setDebouncedBio] = useState(user?.bio || '');
  const [data, setData] = useState(null)
  const dispatch = useDispatch();
  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBio(user?.bio);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [user?.bio]);

  // API call when debouncedBio changes
  useEffect(() => {
    const fetchMetaData = async () => {
      if (debouncedBio) {
        try {
          dispatch(clearAlerts());
          dispatch(setLoader(true));
          const token = localStorage.getItem('dizeeToken');
          const response = await postDataAPI(`user/getUrlMetadata`, { url: user?.bio }, token);
          if (response.data.data.response.title === 'Page not available') {
            return;
          }
          const urlObj = new URL(response.data.data.response?.url);
          // Extract the pathname from the URL and split by '/'
          let pathParts = urlObj.pathname.split('/');
          pathParts = pathParts[pathParts.length - 1];
          // The username will be the last part
          if (response.data.data.response?.image) {
            setData(response.data.data.response?.image);
            setUser({
              ...user,
              avatar: response.data.data.response?.image,
              social: {
                ...user?.social,
                name: pathParts,
                ig: pathParts,
                tt: pathParts,
                x: pathParts,
                fb: pathParts,
                sc: pathParts,
                yt: pathParts
              },
            });
          }
          dispatch(setLoader(false));
        } catch (error) {
          dispatch(setLoader(false));
          console.error('Error fetching metadata:', error);
        }
      }
    };

    fetchMetaData();
  }, [debouncedBio]);

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">

        <div>
          <div className="font-default mb-9">
            Drop in your existing link in bio to start off your page
          </div>
          <div className="mb-20 flex font-default">
            <DizeeInput2
              placeholder={"Add a link"}
              value={user?.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className={"w-full dizee-input"}
            />
          </div>
          <div className="font-default flex">
            <div
              className={`cursor-pointer mr-[43px]`}
              onClick={() => setStep(6)}
            >
              {data ? 'Next' : 'Skip'}
            </div>
            <div className="cursor-pointer" onClick={() => setStep(4)}>
              Go back
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 font-default  mb-4 w-[300px]">
        <div className="flex flex-col">
          <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
        </div>
      </div>
      <FooterComment />
    </div>
  );
};

export default Step5;
