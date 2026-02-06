import React from "react";

const Button = ({ label, background = "#00AFFF", border, color, onClick }) => {
  return (
    <button
      className="w-full py-2 text-xl font-semibold rounded-full font-manrope"
      style={{ backgroundColor: background, border, color }}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
