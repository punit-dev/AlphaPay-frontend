import React from "react";

const ErrorScreen = ({ error }) => {
  return (
    <div className="bg-black text-white text-3xl h-screen flex items-center justify-center">
      {error}
    </div>
  );
};

export default ErrorScreen;
