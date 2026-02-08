import React, { useState, useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";

const PaymentInput = ({ type, value, setValue }) => {
  const [isSelected, setIsSelected] = useState(false);

  const measureRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(40);

  useLayoutEffect(() => {
    if (type === "text") return;

    const text = value || "0.00";
    if (measureRef.current) {
      measureRef.current.textContent = text;
      setInputWidth(measureRef.current.offsetWidth + 8);
    }
  }, [value, type]);

  if (type === "text") {
    return (
      <motion.div
        initial={{
          border: "2px solid #2C3546",
          boxShadow: "none",
        }}
        animate={{
          border: isSelected ? "2px solid #00AFFF" : "2px solid #2C3546",
          boxShadow: isSelected ? "0 0 30px 0px #00aeff8f" : "none",
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className="w-full px-8 py-3 mt-14 rounded-2xl bg-[#161B26]">
        <textarea
          type={type || "text"}
          placeholder="Note (optional)"
          className="w-full h-20 outline-none text-white resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSelectCapture={() => setIsSelected(true)}
          onBlur={() => setIsSelected(false)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        border: "2px solid #2C3546",
        boxShadow: "none",
      }}
      animate={{
        border: isSelected ? "2px solid #00AFFF" : "2px solid #2C3546",
        boxShadow: isSelected ? "0 0 30px 0px #00aeff8f" : "none",
      }}
      transition={{ type: "tween", duration: 0.3 }}
      className="w-full px-8 mt-14 rounded-2xl bg-[#161B26]">
      <div className="relative text-5xl font-urbanist font-bold flex items-center gap-2 w-fit py-4 mx-auto">
        <p className="text-white">₹</p>

        {/* Hidden measurer */}
        <span
          ref={measureRef}
          className="absolute invisible whitespace-pre text-5xl font-urbanist font-bold"
        />

        <input
          type={type || "text"}
          placeholder="0.00"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSelectCapture={() => setIsSelected(true)}
          onBlur={() => setIsSelected(false)}
          style={{ width: inputWidth }}
          className="
            text-white bg-transparent outline-none
            placeholder:text-[#707A89]
            transition-[width] duration-150 ease-out
            min-w-10 max-w-30
          "
        />
      </div>
    </motion.div>
  );
};

export default PaymentInput;
