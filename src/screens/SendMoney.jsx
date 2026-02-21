import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import ProfileView from "../components/ProfileView";
import PaymentInput from "../components/PaymentInput";
import Button from "../components/Button";
import { m, motion } from "motion/react";
import PaymentOption from "../components/PaymentOption";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../redux/cardSlice";

const SendMoney = () => {
  const location = useLocation();
  const { user } = location.state;
  const { balance } = useSelector((state) => state.transactions);
  const { cards, loading, error } = useSelector((state) => state.card);
  const [cardId, setCardId] = useState(null);
  const dispatch = useDispatch();
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
            if (amount.length === 0 || amount == 0) {
              alert("Please enter an amount");
              return;
            }
            setShowOptions(true);
            if (cards.length == 0) dispatch(fetchCards());
          }}
        />
      </div>
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, display: "none" }}
          animate={{
            opacity: showOptions ? 1 : 0,
            display: showOptions ? "flex" : "none",
          }}
          className="absolute bottom-0 left-0 right-0 h-screen bg-[#0B0F1A]/50 backdrop-blur-sm flex items-end justify-center">
          <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            transition={{
              duration: 0.5,
              type: "tween",
            }}
            className="w-full flex items-center justify-center max-h-90 flex-col bg-[#0B0F1A] border-x-2 border-t-2 border-white rounded-t-2xl">
            <h2 className="text-2xl text-white mt-4 font-lexend">Options</h2>
            <div className="h-full w-full flex flex-col gap-5 mt-5 relative px-4 overflow-y-auto">
              <PaymentOption
                label={"Wallet"}
                value={"Wallet"}
                type={"Wallet"}
                selected={selected === "Wallet"}
                onChange={setSelected}
                amount={balance}
                onClick={() => setCardId(null)}
              />
              {cards.length != 0 ? (
                cards.map((card) => (
                  <PaymentOption
                    label={card.cardHolder + ` (${card.type})`}
                    type={"Card"}
                    cardNumber={card.cardNumber}
                    onChange={setSelected}
                    value={card._id}
                    selected={selected === card._id}
                    key={card._id}
                    onClick={() => {
                      setCardId(card._id);
                    }}
                  />
                ))
              ) : (
                <p className="text-lg text-center text-[#B0B8C3] mb-2">
                  {error || "Cards not available"}
                </p>
              )}
              {loading && (
                <img src="/images/loading.svg" alt="" className="h-10 w-10" />
              )}
            </div>
            <div className="px-5 w-full my-4">
              <Button
                label={"Proceed"}
                background="#00FEAE"
                onClick={() => {
                  if (selected == "Wallet") {
                    setTimeout(() => {
                      navigate("/confirm-pay", {
                        state: {
                          user,
                          amount,
                          method: "Wallet",
                          note,
                          cardId: cardId,
                        },
                      });
                    }, 600);
                  } else {
                    setTimeout(() => {
                      navigate("/confirm-pay", {
                        state: {
                          user,
                          amount,
                          method: "Card",
                          note,
                          cardId: cardId,
                        },
                      });
                    }, 600);
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SendMoney;
