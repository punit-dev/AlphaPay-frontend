import React from "react";
import { motion } from "motion/react";

const SecondarySectionDiv = ({
  label,
  children,
  border = false,
  background = true,
  onClick,
  delay,
}) => {
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
      <div
        className={`bg-linear-90 w-fit ${border ? "from-[#00AFFF] to-[#A27EFF] px-0.5 pt-0.5" : "bg-transparent"} rounded-t-lg`}>
        <div className="py-1 px-4 text-white bg-[#202224] rounded-t-lg">
          <p className="text-center text-xl font-medium font-urbanist">
            {label}
          </p>
        </div>
      </div>
      <div
        className={`min-h-30 w-full max-w-80 border-2 border-b-transparent border-x-transparent ${border ? "border-t-[#00AFFF]" : "border-t-[#202224]"} border-t-[#00AFFF] p-0.5 font-lexend`}>
        <div
          className={`mt-3 ${background ? "bg-[#0B0F1A]" : "bg-transparent"} min-h-30 w-full min-w-75 max-w-80 rounded-lg flex flex-col gap-2`}>
          {background ? (
            <button
              onClick={onClick}
              className={"text-[#5AC8FA] text-right text-xs mt-1 mr-2"}>
              See all
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default SecondarySectionDiv;
