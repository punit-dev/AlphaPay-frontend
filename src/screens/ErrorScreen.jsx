import React from "react";

const ErrorScreen = ({ error }) => {
  return (
    <div className="bg-[#0B0F1A] text-center text-white text-3xl h-screen flex items-center justify-center px-10">
      {error}
    </div>
  );
};

export default ErrorScreen;
