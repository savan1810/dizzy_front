import DizeeInput from "../../../components/DizeeInput";
import FooterComment from "../footerComment";

import AppleMusic from "../../../svg/Social/AppleMusic";
import Facebook from "../../../svg/Social/Facebook";
import Linkedin from "../../../svg/Social/Linkedin";
import Snapchat from "../../../svg/Social/Snapchat";
import Spotify from "../../../svg/Social/Spotify";
import Thread from "../../../svg/Social/Thread";
import TwitterX from "../../../svg/Social/TwitterX";
import Youtube from "../../../svg/Social/Youtube";
import Instagram from "../../../svg/SocialFeedPlatform/Instagram";
import Tiktok from "../../../svg/SocialFeedPlatform/Tiktok";
const componentMapping = {
  IG: <Instagram />,
  TT: <Tiktok />,
  X: <TwitterX className='h-[15px] w-[15px]' />,
  FB: <Facebook className='h-[15px] w-[15px]' />,
  SC: <Snapchat className='h-[15px] w-[15px]' />,
  YT: <Youtube className='h-[15px] w-[15px]' />,
  SF: <Spotify className='h-[15px] w-[15px]' />,
  AM: <AppleMusic className='h-[15px] w-[15px]' />,
  TH: <Thread className='h-[15px] w-[15px]' />,
  LI: <Linkedin />,

};
const Step10 = ({ setStep, setUser, user }) => {
  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div>
          <div className="font-default mb-9">Confirm or edit your handles</div>

          {/* Add a className "scrollable-section" for custom scrollbar */}
          <div className="scrollable-section mb-9" style={{ maxHeight: '250px', overflowY: 'scroll' }}>
            <div className="mb-9 flex font-default gap-x-[10px] ">
              {componentMapping['IG']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.ig}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, ig: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['TT']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.tt}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, tt: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['X']}
              {/* &nbsp; */}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.x}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, x: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['FB']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.fb}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, fb: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['SC']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.sc}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, sc: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['YT']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.yt}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, yt: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['SF']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.sf}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, sf: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['AM']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.am}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, am: e.target.value } })
                }
              />
            </div>
            <div className="mb-9 flex font-default gap-x-[10px]">
              {componentMapping['TH']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.th}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, th: e.target.value } })
                }
              />
            </div>
            <div className="mb-3 flex font-default gap-x-[10px]">
              {componentMapping['LI']}
              <DizeeInput
                placeholder={"Username or URL "}
                value={user?.social?.li}
                onChange={(e) =>
                  setUser({ ...user, social: { ...user.social, li: e.target.value } })
                }
              />
            </div>
          </div>

          <div className="font-default flex">
            <div className="mr-[43px] cursor-pointer" onClick={() => setStep(22)}>
              Next
            </div>
            <div className="cursor-pointer" onClick={() => setStep(8)}>
              Go back
            </div>
          </div>
        </div>
      </div>
      <FooterComment comment={`These will be loaded on your brand page header but can be changed at any time `} />
    </div>
  );
};

export default Step10;
