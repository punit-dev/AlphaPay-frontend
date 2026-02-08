import React from "react";
import { motion } from "motion/react";

const ProfileView = ({ user, initial, animate, transition }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className="flex gap-5 px-2 py-3 items-center">
      <div className="h-15 w-15 flex items-center overflow-hidden justify-center rounded-full">
        <img src={user?.profilePic} alt="" className="w-full h-full" />
      </div>
      <div className="font-medium text-white">
        <p className="text-base text-[#B0B8C3] font-lexend">{user?.fullname}</p>
        <p className="text-lg font-urbanist">{user?.upiId}</p>
      </div>
    </motion.div>
  );
};

export default ProfileView;
