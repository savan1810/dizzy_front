import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBgColor } from "../store/user/userSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { bgColor } = useSelector((state) => state.user.setting);
  useEffect(() => {
    dispatch(updateBgColor("#000000")); // set the initial bg color
  }, [dispatch]);
  return (
    <div
      style={{ background: bgColor }}
      className={`bg-[${bgColor}] w-full h-screen justify-center text-white items-center flex`}
    >
      {children}
    </div>
  );
};

export default Layout;
