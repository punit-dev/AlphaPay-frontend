import React from "react";
import { useSelector } from "react-redux";

const ProfileDiv = ({ onClick, src, name }) => {
  return (
    <button
      onClick={onClick}
      className="h-fit w-20 flex flex-col items-center gap-1">
      <div className="h-15 w-15 flex items-center overflow-hidden justify-center rounded-full">
        <img src={src} className="w-full h-full" />
      </div>
      <p className="text-white text-center">{name?.split(" ")[0]}</p>
    </button>
  );
};

export default ProfileDiv;
