import React from "react";

const NoteDiv = ({ message }) => {
  return (
    <div className="bg-[#161B26] border-2 border-[#2C3546] py-2.5 px-5 rounded-2xl font-semibold font-urbanist flex flex-col gap-3 mt-5">
      <h4 className="text-[#B0B8C3] text-sm ">Notes</h4>
      <p className="text-base text-white">{message}</p>
    </div>
  );
};

export default NoteDiv;
