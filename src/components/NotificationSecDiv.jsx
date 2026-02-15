import React from "react";
import { motion } from "motion/react";

const NotificationSecDiv = ({ label, children, delay }) => {
  return (
    <motion.div
      initial={{
        y: 25,
        opacity: 0.2,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        type: "tween",
        delay,
      }}
      className="relative">
      <div className="py-1 px-4 text-[#707A89] bg-transparent text-left border-b border-[#2C3546]">
        <p className="text-xl font-medium font-urbanist">{label}</p>
      </div>
      <div className={`mt-3 min-h-30 w-full rounded-lg flex flex-col gap-2`}>
        {children}
      </div>
    </motion.div>
  );
};

export default NotificationSecDiv;
