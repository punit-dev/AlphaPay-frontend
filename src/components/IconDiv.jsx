import React from "react";

const IconDiv = ({ label, src, onClick }) => {
  return (
    <button className="w-12 flex items-center flex-col gap-1" onClick={onClick}>
      <div className="bg-[#202224] p-1 rounded-md border border-[#00AFFF]">
        <img src={src} className="w-7 h-7" />
      </div>
      <p className="text-white text-[11px] font-medium leading-2.5 text-center">
        {label}
      </p>
    </button>
  );
};

export default IconDiv;
