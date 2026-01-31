import React from "react";

const Button = ({ label, background = "#00AFFF", border, color, onClick }) => {
  return (
    <button
      className="w-full py-2 text-xl font-medium rounded-full"
      style={{ backgroundColor: background, border, color }}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
