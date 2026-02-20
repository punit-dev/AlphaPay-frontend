import React from "react";
import { motion } from "motion/react";

const Button = ({
  label,
  background = "#00AFFF",
  border,
  color,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.96 }}
      className="w-full py-2 text-xl font-semibold rounded-full font-manrope"
      style={{
        backgroundColor: background,
        border,
        color,
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </motion.button>
  );
};

export default Button;
