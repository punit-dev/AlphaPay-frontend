import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../redux/transactionSlice";
import SectionDiv from "../components/SectionDiv";
import IconDiv from "../components/IconDiv";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import ProfileDiv from "../components/ProfileDiv";
import { useNavigate } from "react-router";
import ProfileView from "../components/ProfileView";
import ErrorScreen from "./ErrorScreen";
import Nav from "../components/Nav";

const Home = () => {
  const qrRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { transactions, loading, error } = useSelector(
    (state) => state.transactions,
  );
  const callRef = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (callRef.current) return;
    callRef.current = true;
    dispatch(fetchTransactions(3));
  }, []);

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
      qrOptions: {
        errorCorrectionLevel: "M",
        mode: "Byte",
        typeNumber: 0,
      },
    });
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  });

  const navigate = useNavigate();

  const moneyTransferIcons = [
    {
      label: "Scan",
      scr: "./icons/scan_qr.svg",
      onClick: (e) => {
        navigate("/scan-qr");
      },
    },
    {
      label: "UPI",
      scr: "./icons/upi.svg",
      onClick: (e) => {
        navigate("/upi-pay");
      },
    },
    {
      label: "Phone",
      scr: "./icons/mobile_pay.svg",
      onClick: (e) => {
        navigate("/phone-pay");
      },
    },
    {
      label: "Requests",
      scr: "./icons/request_money.svg",
      onClick: (e) => {
        navigate("/request-money");
      },
    },
    {
      label: "Balance & history",
      scr: "./icons/balance_hist.svg",
      onClick: (e) => {
        navigate("/balance-hist");
      },
    },
    {
      label: "Add a card",
      scr: "./icons/add_card.svg",
      onClick: (e) => {
        navigate("/add-card");
      },
    },
    {
      label: "Request history",
      scr: "./icons/request_money_hist.svg",
      onClick: (e) => {
        navigate("/request-hist");
      },
    },
  ];

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div className="w-full h-screen relative flex  flex-col">
      <Nav />
      <div className="py-10 flex flex-col gap-7 items-center">
        <motion.h3
          initial={{ translateY: 180 }}
          animate={{
            translateY: isOpen ? 180 : 0,
          }}
          transition={{ type: "tween", duration: 0.5 }}
          className="text-3xl font-semibold text-center text-white font-urbanist">
          Scan to pay
        </motion.h3>
        <ProfileView
          user={user}
          initial={{ translateY: 100 }}
          animate={{ translateY: isOpen ? 100 : 0 }}
          transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
        />
        <div
          ref={qrRef}
          className="w-70 h-70 bg-[#0B0F1A] flex items-center justify-center rounded-3xl z-1"></div>
      </div>
      <motion.div
        drag="y"
        dragConstraints={{ top: 70, bottom: 650 }}
        dragMomentum={true}
        initial={{ y: 70 }}
        animate={{ y: isOpen ? 70 : 650 }}
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
        className="absolute h-screen w-full bg-white/10 backdrop-blur-xl rounded-t-3xl px-5 top-0 z-1 flex flex-col items-center"
        style={{
          overflowY: isOpen ? "auto" : "hidden",
        }}>
        {!isOpen ? (
          <div className="h-2 w-30 rounded-full bg-black mx-auto mt-2"></div>
        ) : null}
        <SectionDiv
          label={"Money Transfer"}
          icons={moneyTransferIcons.map((item, idx) => (
            <IconDiv
              key={idx}
              label={item.label}
              src={item.scr}
              onClick={item.onClick}
            />
          ))}
        />
        <div className="mt-8">
          {loading && (
            <div className="h-60 w-full mt-8">
              <img src="./images/loading.svg" className="h-10 w-10 mx-auto" />
            </div>
          )}
          {error && (
            <p className="text-lg text-center text-[#B0B8C3]">
              Your transaction history is empty.
            </p>
          )}
          {transactions.length > 0 && !loading ? (
            <SecondarySectionDiv
              label={"Recent pays"}
              background={true}
              border={false}
              onClick={(e) => {
                navigate("/balance-hist");
              }}>
              <div className="flex gap-7 items-center px-3">
                {transactions.slice(0, 3).map((item, idx) => (
                  <ProfileDiv
                    key={idx}
                    name={
                      item.payer.userRef._id == user?._id
                        ? item.payee.name
                        : item.payer.userRef?.fullname
                    }
                    src={
                      item.payer.userRef._id == user?._id
                        ? item.payee.userRef?.profilePic
                        : item.payer.userRef?.profilePic
                    }
                    onClick={() => navigate(`/balance-hist/${item._id}`)}
                  />
                ))}
              </div>
            </SecondarySectionDiv>
          ) : null}
        </div>
      </motion.div>
      <motion.button
        initial={{ display: "block", opacity: 1 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          display: isOpen ? "block" : "none",
        }}
        onClick={() => navigate("/scan-qr")}
        className="z-10 left-1/2 -translate-1/2 bg-[#00AFFF] p-4 rounded-full absolute bottom-0">
        <img src="./icons/scan_qr_dark.svg" alt="" className="h-12 w-12" />
      </motion.button>
    </div>
  );
};

export default Home;
