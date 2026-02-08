import React, { useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useLocation } from "react-router";
import PinInput from "../components/PinInput";
import Button from "../components/Button";

const ConfirmPay = () => {
  const location = useLocation();
  const { upiId, name, amount, note, method } = location.state || {};
  const [upiPin, setUpiPin] = useState("");

  return (
    <div className="bg-[#0B0F1A] h-screen w-full relative">
      <SecondaryNav />
      <div>
        <div className="px-5 mt-5">
          <div className="text-white font-urbanist text-xl font-medium flex items-center justify-between px-3 py-2 border-2 border-[#00AFFF] rounded-2xl shadow-[0_0_20px_#00AFFF89]">
            <p>Payment Through: </p>
            <span className="font-semibold text-[28px]">{method}</span>
          </div>
        </div>
        <div className="px-5 mt-10">
          <div className="text-white font-urbanist text-xl font-medium flex flex-col items-center gap-4 px-3 py-2 border-2 border-[#00AFFF] rounded-2xl shadow-[0_0_20px_#00AFFF89]">
            <div className="flex items-center justify-between w-full">
              <p>To:</p>
              <span className="font-semibold text-2xl">{name}</span>
            </div>
            <div className="flex items-center justify-between w-full">
              <p>Amount:</p>
              <span className="font-semibold text-2xl">₹{amount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-10 gap-5">
        <label htmlFor="pin" className="text-white font-urbanist text-lg">
          Enter your PIN
        </label>
        <PinInput value={upiPin} setValue={setUpiPin} />
      </div>
      <div className="absolute bottom-15 w-full px-5">
        <Button
          label="Confirm Payment"
          onClick={() => console.log("Payment confirmed")}
        />
      </div>
    </div>
  );
};

export default ConfirmPay;
