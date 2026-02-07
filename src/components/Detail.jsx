import React from "react";
import { formatDate } from "../utils/transactionUtils";

const Detail = ({ title, name, upiId, day, createdAt }) => {
  const formattedDate = createdAt
    ? formatDate(new Date(createdAt).toISOString().split("T")[0])
    : "";
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-[#707A89] font-lexend font-medium text-xs">
          {title}
        </p>
        <h4 className="text-[#B0B8C3] font-lexend font-medium text-base">
          {name}
        </h4>
        <p className="font-urbanist font-semibold text-white text-xl">
          {upiId}
        </p>
      </div>
      <div className="font-urbanist font-semibold text-[14px] text-[#B0B8C3]">
        <p>{formattedDate}</p>
        <p>
          {new Date(createdAt)
            .toLocaleTimeString()
            .split(":")
            .slice(0, 2)
            .join(":")}
        </p>
      </div>
    </div>
  );
};

export default Detail;
