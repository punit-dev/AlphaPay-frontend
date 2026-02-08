import { motion } from "motion/react";

const PaymentOption = ({ label, value, selected, onChange, onClick }) => {
  return (
    <motion.label
      layout
      whileTap={{ scale: 0.97 }}
      className="
        relative flex items-center justify-between
        rounded-xl bg-[#1f2937] px-5 py-3
        cursor-pointer
      "
      onClick={() => {
        onChange(value);
        if (onClick) onClick();
      }}>
      <span className="text-white font-medium">{label}</span>

      {/* Checkbox */}
      <span className="relative flex items-center justify-center">
        <span
          className={`
            h-5 w-5 rounded-full border-2
            transition-all duration-200
            ${
              selected
                ? "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                : "border-emerald-400/60"
            }
          `}>
          {selected && (
            <motion.span
              layoutId="active-dot"
              className="absolute h-2.5 w-2.5 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </span>
      </span>
    </motion.label>
  );
};

export default PaymentOption;
