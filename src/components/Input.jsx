import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Input = ({ type, label, placeholder, name }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempType, setTempType] = useState(type);
  const [value, setValue] = useState("");
  if (type == "password") {
    return (
      <div className="text-lg text-white flex flex-col gap-1 ">
        <label htmlFor={name}>{label}</label>
        <div className="w-full flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-xl">
          <input
            autoComplete="off"
            value={value}
            type={tempType}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            className="outline-none"
            required
          />
          {isVisible ? (
            <IoEyeOff
              className="w-10 h-10"
              onClick={() => {
                setIsVisible((prev) => !prev);
                setTempType("password");
              }}
            />
          ) : (
            <IoEye
              className="h-10 w-10"
              onClick={() => {
                setIsVisible((prev) => !prev);
                setTempType("text");
              }}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="text-lg text-white flex flex-col gap-1 ">
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete="off"
        value={value}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="bg-zinc-800 px-3 py-2.5 rounded-xl outline-none"
        required
      />
    </div>
  );
};

export default Input;
