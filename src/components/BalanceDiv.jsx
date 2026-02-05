import React from "react";
import { motion } from "motion/react";

const BalanceDiv = ({ total }) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0.2 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "tween", delay: 0.1 }}
      className="flex h-30 rounded-2xl p-3 w-full items-center justify-between bg-[#C3D6FF] shadow-[0px_0px_30px] shadow-[#c3d6ff8e]">
      <div className="h-20 flex flex-col gap-1">
        <h3 className="text-xl font-medium">Total money</h3>
        <h2 className="text-4xl font-medium">₹{total}</h2>
      </div>
      <img src="./images/wallet.png" alt="" className="h-25" />
    </motion.div>
  );
};

export default BalanceDiv;
