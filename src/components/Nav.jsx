import React from "react";
import { IoNotificationsSharp, IoPersonSharp } from "react-icons/io5";

const Nav = () => {
  return (
    <div className="px-7">
      <nav className="w-full flex items-center justify-between py-3 text-white">
        <IoPersonSharp className="h-8 w-8" />
        <h1 className="text-3xl font-bold bg-clip-text bg-linear-140 from-[#00Afff] from-6% to-92% to-[#A27Eff] text-transparent">
          AlphaPay
        </h1>
        <IoNotificationsSharp className="h-8 w-8" />
      </nav>
    </div>
  );
};

export default Nav;
