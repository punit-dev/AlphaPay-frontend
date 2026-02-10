import React, { useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import ProfileView from "../components/ProfileView";
import PaymentInput from "../components/PaymentInput";
import Button from "../components/Button";
import { m, motion } from "motion/react";
import PaymentOption from "../components/PaymentOption";
import { useLocation, useNavigate } from "react-router";

const options = ["Wallet", "Card"];

const SendMoney = () => {
  const location = useLocation();
  const { user } = location.state;

  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [selected, setSelected] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="h-screen w-full bg-[#0B0F1A] relative">
      <SecondaryNav title={"Send money"} />
      <div className="w-full px-8 mt-14">
        <ProfileView user={user} />
      </div>
      <div className="px-10">
        <PaymentInput type={"number"} value={amount} setValue={setAmount} />
        <PaymentInput type={"text"} value={note} setValue={setNote} />
      </div>
      <div className="w-full px-10 absolute bottom-10">
        <Button
          label={"Pay"}
          onClick={() => {
            if (amount.length == 0) {
              alert("Please enter an amount");
              return;
            }
            setShowOptions(true);
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, display: "none" }}
        animate={{
          opacity: showOptions ? 1 : 0,
          display: showOptions ? "flex" : "none",
        }}
        className="absolute bottom-0 left-0 right-0 h-screen bg-[#0B0F1A]/50 backdrop-blur-sm flex items-center justify-center px-5">
        <div className="w-full flex items-center justify-center h-60 flex-col">
          <motion.div
            initial={{ y: 35 }}
            animate={{ y: -40 }}
            className="border-4 rounded-tl-4xl border-t-[#00AFFF] border-l-[#00aeff] border-r-transparent border-b-transparent w-full h-20"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            className="h-full w-full flex flex-col gap-5 relative px-4 overflow-hidden justify-center">
            {options.map((option) => (
              <PaymentOption
                key={option}
                label={option}
                value={option}
                selected={selected === option}
                onChange={setSelected}
                onClick={() => {
                  setShowOptions(false);
                  if (option === "Wallet") {
                    navigate("/confirm-pay", {
                      state: {
                        user,
                        amount,
                        method: "Wallet",
                        note,
                      },
                    });
                  } else if (option === "Card") {
                    navigate("/confirm-pay", {
                      state: {
                        user,
                        amount,
                        method: "Card",
                        note,
                      },
                    });
                  }
                }}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ y: -35 }}
            animate={{ y: 40 }}
            className="border-4 rounded-br-4xl border-b-[#00AFFF] border-r-[#00aeff] border-t-transparent border-l-transparent w-full h-20"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SendMoney;
