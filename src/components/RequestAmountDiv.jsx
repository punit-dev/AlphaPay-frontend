import React from "react";

const RequestAmountDiv = ({ amount }) => {
  return (
    <div className="bg-[#161B26] py-1 max-w-70 mx-auto rounded-2xl border-2 border-[#2C3546] flex flex-col items-center justify-between">
      <p className="text-xl font-semibold font-urbanist text-[#B0B8C3]">
        Amount
      </p>
      <h3 className="text-[40px] font-urbanist font-semibold text-white">
        ₹ {amount}
      </h3>
    </div>
  );
};

export default RequestAmountDiv;
