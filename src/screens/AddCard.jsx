import React, { useEffect, useRef, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import Button from "../components/Button";
import CardInput from "../components/CardInput";

const AddCard = () => {
  const formRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    formRef.current.addEventListener("input", () => {
      const isValid = formRef.current.checkValidity();
      if (isValid) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    });
  }, []);

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
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          className="text-white font-manrope mt-4">
          <CardInput
            id={"ap-card-number"}
            type={"number"}
            name={"cardNumber"}
            placeholder={"Card number"}
            maxLen={16}
            minLen={16}
          />
          <div className="flex gap-3 mt-3">
            <CardInput
              id={"ap-card-expiry"}
              type={"text"}
              name={"expiryDate"}
              placeholder={"Expiry date(MM-YY)"}
              maxLen={5}
              minLen={5}
            />
            <div className="w-1/2">
              <CardInput
                id={"ap-card-cvv"}
                type={"password"}
                pattern={"[0-9]*"}
                placeholder={"CVV"}
                name={"cvv"}
                maxLen={3}
                minLen={3}
              />
            </div>
          </div>
          <div className="mt-3">
            <CardInput
              id={"ap-card-holder"}
              type={"text"}
              placeholder={"Card holder name"}
              name={"cardHolder"}
              minLen={3}
            />
          </div>
          <div className="mt-5">
            <Button label={"Save"} disabled={isDisable} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
