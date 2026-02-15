import React from "react";

const NotificationDiv = ({ isRead = true, src, message, heading, onClick }) => {
  return (
    <div
      style={{ opacity: isRead ? 0.6 : 1 }}
      className="bg-[#161B26] px-4 py-3 rounded-xl flex gap-5 items-center text-white border-2 border-[#2C3546]"
      onClick={isRead ? () => {} : onClick}>
      <img src={src} className="w-10 h-10" />
      <div className="font-semibold font-urbanist">
        <h4 className="text-lg">{heading}</h4>
        <p className="text-base">{message}</p>
      </div>
    </div>
  );
};

export default NotificationDiv;
