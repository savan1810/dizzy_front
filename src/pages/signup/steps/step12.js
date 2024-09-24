import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearAlerts, setErrorAlert } from "../../../store/alert/alertSlice";
import { add_personal_user_userInfo_thunk } from "../../../store/auth/authThunk";

const Step12 = ({ setStep, setUser, user }) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const persistedData = localStorage.getItem('persist:root');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.avatar) {
      if (typeof user.avatar === "string") {
        setPreview(user.avatar);
      } else if (user.avatar instanceof Blob) {
        setPreview(URL.createObjectURL(user.avatar));
      }
    }
  }, [user?.avatar]);

  const changeAvatar = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUser({ ...user, avatar: selectedFile });
    }
  };

  const handleSubmit = async () => {
    // e.preventDefault(); // Prevent default form submission
    dispatch(clearAlerts());

    if (persistedData) {
      try {
        const parsedData = JSON.parse(persistedData);
        let userData = JSON.parse(parsedData.user);
        user.phone = userData.phone;
      } catch (error) {
        console.error('Failed to parse persisted data:', error);
        dispatch(setErrorAlert('Email and Phone number are required'));
        return; // Exit if there is an error
      }
    } else {
      console.log('No data found for the key "persist:root".');
      dispatch(setErrorAlert('Email and Phone number are required'));
      return; // Exit if there is no data
    }

    const url = new URL(window.location.href);
    const emailParam = url.searchParams.get('email');
    const userParam = JSON.parse(url.searchParams.get('user'));

    user.email = userParam ? userParam.email : emailParam;

    if (user.phone && user.email) {
      dispatch(add_personal_user_userInfo_thunk(user)).then((res) => {
        if (res?.payload?.status === 200) {
          setStep(32);
        }
      });
    } else {
      dispatch(setErrorAlert('Email and Phone number are required'));
    }
  };

  const handleNext = async () => {
    if (user.professionRole === 'personal') {
      handleSubmit(); // Ensure handleSubmit is called correctly
    } else {
      setStep(13);
    }
  };

  // Handle key press events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext(); // Call your next step function
    }
  };

  return (
    <div onKeyDown={handleKeyPress} tabIndex="0">
      <div
        className="font-default mb-9 cursor-pointer"
        onClick={() => document.getElementById("avatar").click()}
      >
        {preview ? "Change a cover image" : "Upload a cover image"}
      </div>
      <input
        type="file"
        className="hidden"
        id="avatar"
        onChange={changeAvatar}
      />
      <div className="profile-picture mb-9 min-h-[100px]">
        <div className="avatar">
          {preview && (
            <img
              src={preview}
              className="h-[80px] w-[80px] rounded-full"
              alt="avatar"
            />
          )}
        </div>
      </div>
      <div className="font-default flex">
        <div
          className={`mr-[43px] cursor-pointer ${(file || user?.avatar) ? 'font-default' : 'font-gray'}`}
          onClick={() => {
            if (file || user?.avatar) {
              handleNext();
            }
          }}
        >
          Next
        </div>

        <div className="cursor-pointer" onClick={() => {
          if (user.professionRole !== undefined) {
            setStep(user.professionRole === 'personal' ? 22 : 9);
          }
        }}>
          Go back
        </div>
      </div>
    </div>
  );
};

export default Step12;
