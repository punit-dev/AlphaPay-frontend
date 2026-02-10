import React from "react";

const ProfileForSend = ({ profilePic, fullname, id, onClick = () => {} }) => {
  return (
    <div className="flex py-3 px-5 items-center gap-4 bg-[#161B26] rounded-2xl mt-4">
      <img
        src={profilePic}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span className="text-white font-urbanist text-lg font-semibold">
          {fullname || "User Name"}
        </span>
        <span className="text-white font-urbanist text-sm">{id || "ID"}</span>
      </div>
      <button
        onClick={onClick}
        className="ml-auto bg-[#00AFFF] text-[#0B0F1A] px-4 py-2 rounded-lg font-urbanist font-bold text-sm">
        Send
      </button>
    </div>
  );
};

export default ProfileForSend;
