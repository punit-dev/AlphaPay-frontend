import React from "react";
import SecondaryNav from "../components/SecondaryNav";
import Button from "../components/Button";

const AddCard = () => {
  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      <SecondaryNav title={"Add Card"} />
      {/* card */}
      <div className="px-8 mt-15">
        <div className="h-45 w-full bg-amber-400 rounded-2xl"></div>
      </div>
      <div className="mt-20 px-5">
        <h3 className="font-urbanist font-semibold text-white text-xl">
          Card details
        </h3>
        <form className="text-white font-manrope mt-4">
          <input
            type="number"
            placeholder="Card number"
            className="w-full px-2 bg-[#161B26] border-2 border-[#1F2633] placeholder:text-[#B0B8C3] text-xl py-3 rounded-lg outline-none"
          />
          <div className="flex gap-3 mt-3">
            <input
              type="text"
              id="expiry-date"
              name="expiry-date"
              placeholder="Expiry date(MM-YY)"
              pattern="^(0[1-9]|1[0-2])\/\d{2}$"
              title="Enter a date in the format MM/YY"
              className="w-full px-2 bg-[#161B26] border-2 border-[#1F2633] placeholder:text-[#B0B8C3] text-xl py-3 rounded-lg outline-none"
            />
            <input
              placeholder="CVV"
              type="number"
              className="w-1/2 px-2 bg-[#161B26] border-2 border-[#1F2633] placeholder:text-[#B0B8C3] text-xl py-3 rounded-lg outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Card holder name"
            className="w-full px-2 bg-[#161B26] border-2 border-[#1F2633] placeholder:text-[#B0B8C3] text-xl py-3 rounded-lg outline-none mt-3"
          />
          <div className="mt-5">
            <Button label={"Save"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
