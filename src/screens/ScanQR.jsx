import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import Loading from "./Loading";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import useSearchUser from "../hooks/useSearchUser";

const ScanQR = () => {
  const qrRef = useRef(null);
  const [decodedTxt, setDecodedTxt] = useState("");
  const [camError, setCamError] = useState(null);
  const navigate = useNavigate();
  const hasScannedRef = useRef(false);

  const { searchResults, loading, error } = useSearchUser(decodedTxt);

  const startScanner = async () => {
    if (!qrRef.current) return;
    try {
      await qrRef.current.start(
        { facingMode: "environment" },
        { fps: 10 },
        async (decodedText) => {
          if (hasScannedRef.current) return;
          hasScannedRef.current = true;

          try {
            const state = qrRef.current.getState();
            if (state === 2 || state === 3) {
              await qrRef.current.stop();
            }
          } catch (err) {
            console.warn("Stop warning:", err);
          }
          setDecodedTxt(decodedText);
        },
        () => {},
      );
    } catch (err) {
      console.error("Scanner Start Error:", err);

      if (err?.name === "NotAllowedError") {
        setCamError("Camera permission denied. Please allow access.");
      } else {
        setCamError("Unable to access camera.");
      }
    }
  };

  const restartScanner = async () => {
    hasScannedRef.current = false;
    setDecodedTxt("");
    setCamError(null);

    try {
      const state = qrRef.current?.getState();
      if (state === 2 || state === 3) {
        await qrRef.current.stop();
      }
    } catch {}

    await startScanner();
  };

  useEffect(() => {
    if (!decodedTxt || loading) return;

    const foundUser = searchResults?.[0];

    if (!foundUser) {
      hasScannedRef.current = false;
      return;
    }

    navigate("/send-money", {
      state: { user: foundUser },
      replace: true,
    });
  }, [searchResults, loading, decodedTxt, navigate]);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("scanner");
    qrRef.current = html5QrCode;

    startScanner();

    return () => {
      const scannerInstance = qrRef.current;
      if (scannerInstance) {
        const state = scannerInstance.getState();
        if (state === 2 || state === 3) {
          scannerInstance
            .stop()
            .then(() => scannerInstance.clear())
            .catch((err) => console.warn("Cleanup error:", err));
        }
      }
    };
  }, []);

  if (camError) {
    return (
      <div className="bg-black flex flex-col items-center justify-center h-screen text-white gap-6 px-6">
        <h2 className="text-lg text-center">{camError}</h2>
        <Button label="Try Again" onClick={restartScanner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0B0F1A] flex flex-col items-center justify-center h-screen w-full px-5 gap-10">
        <h1 className="text-xl leading-6 text-white text-center font-urbanist font-medium">
          We encountered an issue processing your request. Kindly select an
          alternative option.
        </h1>
        <div className="gap-4 flex flex-col w-full">
          <Button
            label={"Via Phone Number"}
            onClick={() => navigate("/phone-pay", { replace: true })}
          />
          <Button
            label={"Via UPI ID"}
            onClick={() => navigate("/upi-pay", { replace: true })}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <SecondaryNav title={"Scan QR code"} />

      <div id="scanner" className="absolute inset-0 overflow-hidden h-[92%]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div id="scan-frame" className="h-75 w-75 mx-auto relative">
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-4xl border-l-8 border-t-8 border-[#00AFFF]" />
          <div className="absolute bottom-0 left-0 h-20 w-20 rounded-bl-4xl border-l-8 border-b-8 border-[#00AFFF]" />
          <div className="absolute top-0 right-0 h-20 w-20 rounded-tr-4xl border-r-8 border-t-8 border-[#00AFFF]" />
          <div className="absolute bottom-0 right-0 h-20 w-20 rounded-br-4xl border-r-8 border-b-8 border-[#00AFFF]" />
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 270 }}
            transition={{
              type: "tween",
              repeatType: "reverse",
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-2 w-[calc(100%-30px)] mx-auto bg-[#5AC8FA] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
