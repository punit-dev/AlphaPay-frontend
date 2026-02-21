import React from "react";
import { IoNotificationsSharp, IoPersonSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearCount } from "../redux/notificationSlice";

const Nav = () => {
  const navigate = useNavigate();
  const { unread } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  return (
    <div className="px-5">
      <nav className="w-full flex items-center justify-between py-3 text-white">
        <IoPersonSharp
          className="h-8 w-8"
          onClick={() => navigate("/profile")}
        />
        <h1 className="text-3xl font-bold bg-clip-text bg-linear-140 from-[#00Afff] from-6% to-92% to-[#A27Eff] text-transparent font-space-grotesk">
          AlphaPay
        </h1>
        <div className="relative">
          <IoNotificationsSharp
            className="h-8 w-8"
            onClick={() => {
              navigate("/notifications");
              dispatch(clearCount());
            }}
          />
          {unread && (
            <div className="absolute top-0 right-0 bg-amber-300 h-4.5 w-4.5 rounded-full text-black flex items-center justify-center text-xs font-medium font-lexend" />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
