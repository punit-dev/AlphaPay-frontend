import React from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";

const ErrorScreen = ({ error, onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-[#0B0F1A] flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h2 className="text-white text-2xl font-urbanist font-semibold mb-3">
        Something went wrong
      </h2>

      <p className="text-[#B0B8C3] font-urbanist text-lg mb-8 max-w-md">
        {error || "An unexpected error occurred. Please try again."}
      </p>

      <div className="flex gap-4">
        {onRetry && <Button label="Retry" onClick={onRetry} />}

        <div className="w-40">
          <Button
            label="Go Back"
            background="transparent"
            border="2px solid #00AFFF"
            color="#00AFFF"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
