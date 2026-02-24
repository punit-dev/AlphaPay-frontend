import React, { useEffect, useRef } from "react";
import { motion, animate } from "motion/react";

const BalanceDiv = ({ from = 0, to = 10, label, src, bgColor, shadow }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const controls = animate(from, to, {
      duration: 0.6,
      delay: 0.3,
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = "₹" + Math.floor(value);
        }
      },
    });

    return () => {
      controls.stop();
    };
  }, [from, to]);

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
      className="flex h-30 rounded-2xl p-3 w-full items-center justify-between"
      style={{
        backgroundColor: bgColor || "#C3D6FF",
        boxShadow: `0 4px 20px ${shadow || "#c3d6ff8e"}`,
      }}>
      <div className="h-20 flex flex-col gap-1 font-urbanist font-semibold">
        <h3 className="text-[22px] font-semibold">{label}</h3>
        <h2 ref={ref} className="text-4xl">
          ₹{from}
        </h2>
      </div>
      <img src={src} alt="" className="h-25" />
    </motion.div>
  );
};

export default BalanceDiv;
