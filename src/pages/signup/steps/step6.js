import Check from "../../../svg/Check";

const comment = {
  brand: "A Brand account on Dizee allows you to showcase your products and services across multiple platforms like Shopify, Big Cartel, and TikTok Shop. With built-in and real-time audience insights, Dizee helps elevate your brand visibility. This will also be your dizee discovery category.",
  creator: "A Creator account on Dizee is ideal for artists, vloggers, and influencers who want to centralize their content from platforms like Instagram, TikTok, and YouTube. Easily embed your videos, reels, and other creative projects while integrating your social media channels and personal website to engage with your audience. This will also be your dizee discovery category.",
  musician: "A Musician account on Dizee comes pre-loaded with features like music, touring info, merch, playlists, and more, all in one place for easy fan engagement. This will also be your dizee discovery category.",
  streamer: "A Streamer account on Dizee brings together your live streaming channels from platforms like Twitch, YouTube, and Discord. Integrate your podcast episodes from Spotify or Apple Podcasts, and share upcoming streaming schedules, merch, and exclusive content, all in one place. This will also be your dizee discovery category.",
  business: "A Business account on Dizee offers robust integration with platforms like LinkedIn, Shopify, and WooCommerce. Promote services, showcase your portfolio, and manage product sales or bookings directly from Dizee. With Google Analytics integration and CRM tools, it’s designed to streamline your business operations. This will also be your dizee discovery category.",
  athletic: "An Athletic account on Dizee allows athletes and fitness professionals to showcase training regimens, classes, and merchandise. Integrate your Instagram fitness posts, YouTube tutorials, and fitness apps like Strava or MyFitnessPal, giving your audience easy access to your workouts and events. This will also be your dizee discovery category.",
};

const Step6 = ({ setStep, setUser, user }) => {
  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-[300px]">
          <div className="font-default mb-9">What describes you best?</div>
          <div className="mb-5 flex flex-col items-start gap-[10px] sm:gap-[20px] font-default">
            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "brand" })}
            >
              Brand
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "brand" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>

            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "creator" })}
            >
              Creator
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "creator" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>
            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "musician" })}
            >
              Musician
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "musician" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>
            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "streamer" })}
            >
              Streamer
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "streamer" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>
            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "business" })}
            >
              Business
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "business" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>
            <div
              className="cursor-pointer flex justify-center items-center"
              onClick={() => setUser({ ...user, hobbyType: "athletic" })}
            >
              Athletic
              <div className="ml-2 mt-[2px] h-[12px] w-[18px] flex items-center justify-center">
                {user.hobbyType === "athletic" && <Check className="h-full w-full mt-[2px]" />}
              </div>
            </div>
          </div>
          <div className="font-default flex">
            <div
              className={`mr-[43px] cursor-pointer ${user.hobbyType !== undefined ? "font-default" : "font-gray"}`}
              onClick={() => {
                if (user.hobbyType !== undefined) {
                  setStep(9);
                }
              }}
            >
              Next
            </div>
            <div className="cursor-pointer" onClick={() => setStep(7)}>
              Go back
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 font-default  mb-4 w-[300px]">
        <div className="flex flex-col gap-y-[25px]">
          <p className=" ">Example</p>
          <p className=" ">{comment[user?.hobbyType]}</p>
          <p className="uppercase text-[10px] leading-[11.8px] tracking-[3px]">DIZEE</p>
        </div>
      </div>
    </div>

  );
};

export default Step6;
