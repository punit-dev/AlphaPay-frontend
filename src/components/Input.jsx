import React, { useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Input = ({
  type,
  label,
  placeholder,
  name,
  maxLen = 255,
  minLen = 3,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempType, setTempType] = useState(type);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLen) {
      setValue(inputValue);
    }
  };

  if (type == "password") {
    return (
      <div className="text-lg text-white flex flex-col gap-1 ">
        <label htmlFor={name}>{label}</label>
        <div className="w-full flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-xl">
          <input
            ref={inputRef}
            autoComplete="off"
            value={value}
            type={tempType}
            name={name}
            id={name}
            minLength={minLen}
            maxLength={maxLen}
            placeholder={placeholder}
            onChange={onChangeHandler}
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
        ref={inputRef}
        autoComplete="off"
        value={value}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        minLength={minLen}
        maxLength={maxLen}
        onChange={onChangeHandler}
        className="bg-zinc-800 px-3 py-2.5 rounded-xl outline-none"
        required
      />
    </div>
  );
};

export default Input;
