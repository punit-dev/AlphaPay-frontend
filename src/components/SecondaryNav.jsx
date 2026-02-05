import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const SecondaryNav = ({ onClick, title }) => {
  const navigate = useNavigate();
  const backward = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center w-full px-4 py-3 bg-[#0B0F1A] border border-[#1F2633]">
      <button
        className="bg-[#161B26] p-1 rounded-full"
        onClick={onClick || backward}>
        <IoArrowBackOutline className="text-white h-7 w-7" />
      </button>
      <div className="w-full">
        <h2 className="text-2xl text-white font-medium text-center">{title}</h2>
      </div>
    </div>
  );
};

export default SecondaryNav;
