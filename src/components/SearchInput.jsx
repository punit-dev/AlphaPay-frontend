import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchInput = () => {
  return (
    <div className="flex w-full py-3 px-4 gap-3 rounded-full items-center justify-between text-white  bg-[#0B0F1A] mt-4">
      <FaMagnifyingGlass className="h-7 w-7" />
      <input type="text" className="w-full h-8 outline-none text-lg" />
    </div>
  );
};

export default SearchInput;
