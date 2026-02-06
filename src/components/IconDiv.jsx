import React from "react";

const IconDiv = ({ label, src, onClick }) => {
  return (
    <button className="w-12 flex items-center flex-col gap-1" onClick={onClick}>
      <div className="bg-[#202224] p-2 rounded-md border border-[#00AFFF]">
        <img src={src} className="w-8 h-8" />
      </div>
      <p className="text-white text-[10px] font-medium leading-3 text-center">
        {label}
      </p>
    </button>
  );
};

export default IconDiv;
