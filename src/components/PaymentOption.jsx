import { motion } from "motion/react";

const PaymentOption = ({
  label,
  value,
  selected,
  onChange,
  onClick,
  amount,
  cardNumber,
  type,
}) => {
  const lastFour = cardNumber ? cardNumber.replace(/\s/g, "").slice(-4) : "";

  const handleClick = () => {
    onChange?.(value);
    onClick?.();
  };

  return (
    <motion.label
      layout
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className={`
        relative flex items-center justify-between
        rounded-xl px-5 py-3 cursor-pointer
        transition-all duration-200
        ${
          selected
            ? "bg-[#111827] border border-emerald-400"
            : "bg-[#1f2937] hover:bg-[#111827]"
        }
      `}>
      <div className="flex flex-col">
        <span className="text-white font-medium">{label}</span>

        {type == "Wallet" ? (
          <p className="text-base text-white">Balance: ₹{amount}</p>
        ) : (
          <p className="text-base text-white">
            Card no.: ************{lastFour}
          </p>
        )}
      </div>

      {/* Radio Circle */}
      <span className="relative flex items-center justify-center">
        <span
          className={`
            h-5 w-5 rounded-full border-2 transition-all duration-200
            ${
              selected
                ? "border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                : "border-emerald-400/60"
            }
          `}>
          {selected && (
            <motion.span
              layoutId="active-dot"
              className="absolute h-2.5 w-2.5 left-1/2 top-1/2 
              -translate-x-1/2 -translate-y-1/2 
              rounded-full bg-emerald-400"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </span>
      </span>
    </motion.label>
  );
};

export default PaymentOption;
