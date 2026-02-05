import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion } from "motion/react";
import SearchInput from "../components/SearchInput";
import { useSelector } from "react-redux";
import SectionDiv from "../components/SectionDiv";
import IconDiv from "../components/IconDiv";

const moneyTransferIcons = [
  {
    label: "Scan to pay",
    scr: "./icons/scan_qr.svg",
  },
  {
    label: "UPI pay",
    scr: "./icons/upi.svg",
  },
  {
    label: "Wallet",
    scr: "./icons/wallet.svg",
  },
  {
    label: "Requests",
    scr: "./icons/request_money.svg",
  },
  {
    label: "Balance & history",
    scr: "./icons/balance_hist.svg",
  },
  {
    label: "Add a card",
    scr: "./icons/add_card.svg",
  },
];

const Home = () => {
  const qrRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: user?.upiId,
      dotsOptions: {
        type: "rounded",
        color: "white",
      },
      backgroundOptions: {
        color: "#0B0F1A",
      },
      cornersSquareOptions: {
        type: "rounded",
      },
      cornersDotOptions: {
        type: "rounded",
      },
    });
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  });

  return (
    <div className="w-full h-screen relative flex items-center flex-col">
      <div className="py-10 flex flex-col gap-7 items-center">
        <motion.h3
          initial={{ translateY: 180 }}
          animate={{ translateY: isOpen ? 180 : 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="text-3xl font-medium text-center text-white">
          Scan to pay
        </motion.h3>
        <motion.div
          initial={{ translateY: 100 }}
          animate={{ translateY: isOpen ? 100 : 0 }}
          transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
          className="flex gap-5 px-2 py-3">
          <div className="h-15 w-15 flex items-center overflow-hidden justify-center rounded-full">
            <img src={user?.profilePic} alt="" className="w-full h-full" />
          </div>
          <div className="font-medium text-white">
            <p className="text-base text-[#B0B8C3]">{user?.fullname}</p>
            <p className="text-lg">{user?.upiId}</p>
          </div>
        </motion.div>
        <div
          ref={qrRef}
          className="w-70 h-70 bg-[#0B0F1A] flex items-center justify-center rounded-3xl z-1"></div>
      </div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 550 }}
        dragMomentum={true}
        initial={{ y: 0 }}
        animate={{ y: isOpen ? 0 : 550 }}
        transition={{
          type: "tween",
          stiffness: 120,
          damping: 20,
        }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 10) {
            setIsOpen(false);
          } else if (info.offset.y < -10) {
            setIsOpen(true);
          }
        }}
        className="absolute h-screen w-full bg-white/10 backdrop-blur-xl rounded-t-3xl px-7 top-0 z-1"
        style={{
          overflowY: isOpen ? "auto" : "hidden",
        }}>
        {!isOpen ? (
          <div className="h-2 w-30 rounded-full bg-black mx-auto mt-2"></div>
        ) : null}
        <SearchInput />
        <SectionDiv
          label={"Money Transfer"}
          icons={moneyTransferIcons.map((item, idx) => (
            <IconDiv key={idx} label={item.label} src={item.scr} />
          ))}
        />
      </motion.div>
      {isOpen ? (
        <button className="z-10 mx-auto bg-[#00AFFF] p-4 rounded-full absolute bottom-30">
          <img src="./icons/scan_qr_dark.svg" alt="" className="h-12 w-12" />
        </button>
      ) : null}
    </div>
  );
};

export default Home;
