import React, { useEffect, useRef } from "react";
import { motion, animate } from "motion/react";

const BalanceDiv = ({ from = 0, to = 10 }) => {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 0.6,
      delay: 0.3,
      onUpdate(value) {
        ref.current.textContent = "₹" + Math.floor(value);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <motion.div
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
      className="flex h-30 rounded-2xl p-3 w-full items-center justify-between bg-[#C3D6FF] shadow-[0px_0px_30px] shadow-[#c3d6ff8e]">
      <div className="h-20 flex flex-col gap-1 font-urbanist font-semibold">
        <h3 className="text-[22px] font-semibold">Total money</h3>
        <h2 ref={ref} className="text-4xl" />
      </div>
      <img src="./images/wallet.png" alt="" className="h-25" />
    </motion.div>
  );
};

export default BalanceDiv;
