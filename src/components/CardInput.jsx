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

  if (type == "option") {
    return (
      <div className="relative w-full">
        <select
          name="type"
          className="w-full px-2 bg-[#161B26] border-2 border-[#1F2633] text-xl py-3 rounded-lg outline-none text-[#B0B8C3] appearance-none"
          onChange={onChangeHandler}
          required>
          <option value="" disabled selected>
            Type
          </option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>

        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#B0B8C3]">
          ▼
        </div>
      </div>
    );
  }

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
