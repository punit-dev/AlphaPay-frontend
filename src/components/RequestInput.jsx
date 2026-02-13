import React, { useState } from "react";
import { motion } from "motion/react";

const RequestInput = ({ type, placeholder, label, name, id }) => {
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState("");

  return (
    <motion.div
      initial={{
        border: "2px solid #2C3546",
        boxShadow: "none",
      }}
      animate={{
        borderColor: selected ? "#00afff" : "#2C3546",
        boxShadow: selected ? "0 0 20px #00afff89" : "none",
      }}
      transition={{
        type: "tween",
        duration: 0.4,
      }}
      className="flex gap-3 bg-[#161B26] border-2 rounded-lg px-5 py-2.5 text-white font-lexend items-center">
      <label htmlFor={id} className="font-medium text-base">
        {label}{" "}
      </label>
      <input
        type={type || "text"}
        name={name}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSelect={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        placeholder={placeholder}
        className="bg-transparent w-full text-right text-white outline-none font-urbanist font-semibold text-base"
      />
    </motion.div>
  );
};

export default RequestInput;
