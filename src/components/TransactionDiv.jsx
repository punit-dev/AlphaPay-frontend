import React from "react";
import { toSentenceCase } from "../utils/toSentenceCase";

const TransactionDiv = ({
  profilePic,
  fullname,
  amount,
  createdAt,
  status,
  onClick,
}) => {
  const statusObj = {
    pending: "#FFB100",
    failed: "#FF4C4C",
    success: "#00FFAE",
  };

  return (
    <div
      onClick={onClick}
      className="w-full bg-[#161B26] flex justify-between items-center rounded-xl p-3">
      <div className="flex text-white text-xl gap-3 items-center">
        <img src={profilePic} alt="" className="h-17 w-17 rounded-full" />
        <div className="flex flex-col font-lexend">
          <h4>{fullname}</h4>
          <div className="flex justify-between w-28 gap-2">
            <p className="font-semibold">{amount}</p>
            <p>
              {new Date(createdAt)
                .toLocaleTimeString()
                .split(":")
                .slice(0, 2)
                .join(":")}
            </p>
          </div>
        </div>
      </div>
      <p
        className="text-xl font-medium"
        style={{
          color: statusObj[status.toLowerCase()],
        }}>
        {toSentenceCase(status)}
      </p>
    </div>
  );
};

export default TransactionDiv;
