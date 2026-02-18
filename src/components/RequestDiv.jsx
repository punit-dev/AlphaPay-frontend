import React from "react";
import { toSentenceCase } from "../utils/toSentenceCase";

const RequestDiv = ({
  profilePic,
  fullname,
  amount,
  createdAt,
  status,
  onClick,
}) => {
  const statusObj = {
    pending: "#FFB100",
    denied: "#FF4C4C",
    approved: "#00FFAE",
  };

  return (
    <div
      onClick={onClick}
      className="w-full bg-[#161B26] flex justify-between items-center rounded-xl p-3">
      <div className="flex text-white text-xl gap-3 items-center">
        <img src={profilePic} alt="" className="h-17 w-17 rounded-full" />
        <div className="flex flex-col font-lexend">
          <h4>{fullname}</h4>
          <div className="flex justify-between w-28 gap-2 text-base">
            <p
              className="font-normal"
              style={{
                color: statusObj[status.toLowerCase()],
              }}>
              {toSentenceCase(status)}
            </p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <p className="text-xl font-medium font-lexend text-white">₹{amount}</p>
    </div>
  );
};

export default RequestDiv;
