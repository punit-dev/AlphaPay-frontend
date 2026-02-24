import React from "react";
import SecondaryNav from "../components/SecondaryNav";
import { RxCross2 } from "react-icons/rx";
import RequestAmountDiv from "../components/RequestAmountDiv";
import NoteDiv from "../components/NoteDiv";
import { useLocation, useNavigate } from "react-router";

const RequestCancel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, toUser, message, label, title } = location.state;

  return (
    <div className="h-screen w-full bg-[#0B0F1A] flex flex-col items-center">
      <SecondaryNav
        title={title || "Request Canceled"}
        onClick={() => navigate("/home")}
      />
      <div className="mt-10 px-5 pt-20">
        <div className="relative p-4 h-40 w-40 rounded-full bg-[#FF4C4C] mx-auto flex items-center justify-center">
          <RxCross2 className="mx-auto text-black w-30 h-30" />
        </div>
        <p className="text-2xl text-[#FF4C4C] font-semibold font-urbanist text-center mt-3">
          {label || "Request has been cancelled"}
        </p>
      </div>
      <div className="px-10 w-full mt-8">
        <RequestAmountDiv amount={amount || 0} />
        <p className="font-urbanist font-semibold text-[28px] text-[#B0B8C3] text-center mt-4">
          To: <span className="text-white">{toUser || "Unknown"}</span>
        </p>
        <NoteDiv message={message || "Empty"} />
      </div>
    </div>
  );
};

export default RequestCancel;
