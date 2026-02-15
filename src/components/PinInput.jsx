import React, { useState } from "react";
import { motion } from "motion/react";

const PinInput = ({ value, setValue }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="relative w-4/5">
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
        className="flex items-center justify-center gap-4 bg-[#0B0F1A] border-2 border-[#00AFFF] rounded-2xl px-4 py-6 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={`h-4 w-4 rounded-full transition-transform duration-150 ${value.length > i ? "bg-white scale-100" : "bg-white/20"}`}
          />
        ))}
      </motion.div>

      <input
        id="pin"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        onSelect={() => setIsSelected(true)}
        onBlur={() => setIsSelected(false)}
        value={value}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "");
          if (val.length <= 6) setValue(val);
        }}
        className="absolute inset-0 z-10 bg-transparent text-transparent caret-transparent outline-none rounded-2xl"
      />
    </div>
  );
};

export default PinInput;
