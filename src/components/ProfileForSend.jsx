import React from "react";
import { useSelector } from "react-redux";

const ProfileForSend = ({
  profilePic,
  fullname,
  id,
  onClick = () => {},
  showBtn = true,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      onClick={() => {
        if (id == user.phoneNumber || id == user.upiId) {
          alert(
            "Looks like you selected yourself — please choose another user.",
          );
        }
      }}
      className="flex py-3 px-5 items-center gap-4 bg-[#161B26] rounded-2xl mt-4">
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
      {showBtn && (
        <button
          onClick={onClick}
          className="ml-auto bg-[#00AFFF] text-[#0B0F1A] px-4 py-2 rounded-lg font-urbanist font-bold text-sm">
          Send
        </button>
      )}
    </div>
  );
};

export default ProfileForSend;
