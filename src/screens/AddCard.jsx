import React, { useEffect, useRef, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import Button from "../components/Button";
import CardInput from "../components/CardInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, fetchCards, saveCard } from "../redux/cardSlice";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";
import UserCard from "../components/UserCard";
import { toSentenceCase } from "../utils/toSentenceCase";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/effect-cards";

const AddCard = () => {
  const formRef = useRef(null);
  const [isDisable, setIsDisable] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cardId, setCardId] = useState(null);
  const dispatch = useDispatch();

  const { cards, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const formHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const allValues = Object.fromEntries(formData.entries());
    dispatch(saveCard(allValues));
  };

  if (loading) return <Loading />;

  if (error && cards.length != 0) {
    return <ErrorScreen error={error} onRetry={() => location.reload()} />;
  }
  return (
    <div className="h-screen w-full bg-[#0B0F1A] relative">
      <SecondaryNav title={"Add Card"} />

      <div>
        <h2 className="mt-5 mb-3 ml-5 text-2xl font-urbanist font-semibold text-white">
          Your cards
        </h2>

        {cards.length != 0 ? (
          <div className="px-3 flex justify-center">
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards]}
              loop={cards.length > 3}
              className="w-87.5">
              {cards.map((card, idx) => (
                <SwiperSlide key={idx} className="px-4">
                  <UserCard
                    holderName={card.cardHolder}
                    cardNumber={card.cardNumber}
                    cvv={card.CVV}
                    expiry={card.expiryDate}
                    cardType={toSentenceCase(card.type)}
                    onClick={(e) => {
                      setIsDeleting(true);
                      setCardId(card?._id);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-lg text-center text-[#B0B8C3]">{error}</p>
        )}
      </div>

      <div className="mt-12 px-5">
        <h3 className="font-urbanist font-semibold text-white text-xl">
          Add Card details
        </h3>
        <form
          ref={formRef}
          onInput={() => {
            const isValid = formRef.current.checkValidity();
            setIsDisable(!isValid);
          }}
          onSubmit={formHandler}
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
                name={"CVV"}
                maxLen={3}
                minLen={3}
              />
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            <CardInput
              id={"ap-card-holder"}
              type={"text"}
              placeholder={"Card holder name"}
              name={"cardHolder"}
              minLen={3}
            />
            <div className="w-1/2">
              <CardInput
                id={"ap-card-holder"}
                type={"option"}
                placeholder={"Type"}
                name={"cardHolder"}
                minLen={3}
              />
            </div>
          </div>
          <div className="mt-5">
            <Button label={"Save"} disabled={isDisable} />
          </div>
        </form>
      </div>
      {isDeleting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isDeleting ? 1 : 0,
          }}
          transition={{
            type: "tween",
            duration: 0.5,
          }}
          className="absolute px-10 h-screen w-full top-0 left-0 backdrop-blur-lg z-10 flex items-center justify-center">
          <div className="w-full bg-[#161B26] px-5 py-10 rounded-2xl border-2 border-white">
            <p className="text-white text-center text-xl font-urbanist font-semibold">
              Are you sure you want to delete this card?
            </p>
            <div className="flex gap-3 mt-4">
              <Button
                label={"Cancel"}
                onClick={(e) => {
                  setIsDeleting(false);
                  setCardId(null);
                }}
              />
              <Button
                label={"Confirm"}
                background="#FF4C4C"
                onClick={(e) => {
                  dispatch(deleteCard(cardId));
                  setCardId(null);
                  setIsDeleting(false);
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddCard;
