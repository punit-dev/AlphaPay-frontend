import React, { useRef, useState } from "react";

const CardInput = ({
  name,
  type,
  placeholder,
  pattern,
  maxLen = 255,
  id,
  minLen = 3,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLen) {
      setValue(inputValue);
    }
    if (inputValue.length < minLen && inputValue.length != 0) {
      inputRef.current.style.border = "2px solid red";
    } else {
      inputRef.current.style.border = "2px solid #1F2633";
    }
  };

  return (
    <input
      autoComplete="off"
      id={id}
      ref={inputRef}
      type={type || "text"}
      name={name}
      maxLength={maxLen}
      minLength={minLen}
      pattern={pattern}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
      className="w-full px-2 bg-[#161B26] border-2 border-[#1F2633] placeholder:text-[#B0B8C3] text-xl py-3 rounded-lg outline-none"
      required
      onBlur={() => {
        if (value.length < minLen && value.length != 0) {
          inputRef.current.style.border = "2px solid red";
        } else {
          inputRef.current.style.border = "2px solid #1F2633";
        }
      }}
    />
  );
};

export default CardInput;
