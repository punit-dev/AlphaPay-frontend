import React from "react";
import { motion } from "motion/react";

const Button = ({ label, background = "#00AFFF", border, color, onClick }) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.96 }}
      className="w-full py-2 text-xl font-semibold rounded-full font-manrope"
      style={{ backgroundColor: background, border, color }}
      onClick={onClick}>
      {label}
    </motion.button>
  );
};

export default Button;
