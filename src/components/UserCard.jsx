import React, { useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const UserCard = ({
  cardNumber,
  cvv,
  expiry,
  holderName,
  cardType,
  onClick = () => {
    console.log("deleted");
  },
}) => {
  const [type, setType] = useState("password");

  return (
    <div className="h-50 w-full bg-[#161B26] text-white rounded-2xl py-2.5 px-3 border-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            src="/images/alphapay-contactless.svg"
            alt=""
            className="w-8 h-8"
          />
          <p className="text-white font-lexend text-lg">alphaPay</p>
        </div>
        <MdDelete className="h-7 w-7 text-[#ff3c3c]" onClick={onClick} />
      </div>
      <div className="h-10 w-13 bg-amber-600 rounded-lg mt-2 ml-5"></div>
      <div className="px-5">
        <h2 className="text-[23px] font-semibold font-manrope">
          {cardNumber.replace(/(.{4})/g, "$1 ").trim()}
        </h2>
        <div className="flex gap-5">
          <div className="flex items-center bg-amber-800 h-fit w-fit px-1 py-0.5 rounded-lg">
            <p>CVV:</p>
            <div className="w-9 overflow-hidden px-2">
              <input
                type={type}
                value={cvv}
                onSelect={() => {
                  setType("text");
                  setTimeout(() => {
                    setType("password");
                  }, 3000);
                }}
                readOnly
                className="outline-none text-center w-7"
              />
            </div>
          </div>
          <div className="flex items-center bg-amber-800 h-fit w-fit px-1 py-0.5 rounded-lg">
            <p>
              VALID TILL: <span>{expiry}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 pl-0.5 flex justify-between items-center font-manrope font-semibold">
        <h4>{holderName}</h4>
        <div className="flex items-center gap-2">
          <p>{cardType}</p>
          <CiCreditCard1 className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
