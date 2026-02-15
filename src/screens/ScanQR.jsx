import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const ScanQR = () => {
  const qrRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const callSearchApi = async (decodedText) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search?query=${decodedText}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const foundUser = res.data.results?.[0];

      if (!foundUser) {
        setError("User Not Found");
        return;
      }

      navigate("/send-money", { state: { user: foundUser } });
    } catch (err) {
      console.error("API Error:", err);
      setError(err.response?.data?.message || "User Search Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("scanner");
    qrRef.current = html5QrCode;

    const startScanner = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" },
          { fps: 10 },
          async (decodedText) => {
            // Success! Stop scanner first to avoid double-calls
            try {
              await qrRef.current.stop();
            } catch (stopErr) {
              console.warn("Scanner stop warning:", stopErr);
            }
            callSearchApi(decodedText);
          },
          (errorMessage) => {
            console.error(errorMessage);
          },
        );
      } catch (err) {
        console.error("Scanner Start Error:", err);
        setError("Camera permission denied or not found.");
      }
    };

    startScanner();

    // Cleanup: Stop scanner when component unmounts
    return () => {
      if (qrRef.current && qrRef.current.isScanning) {
        qrRef.current.stop().catch((e) => console.error("Cleanup error", e));
      }
    };
  }, []);

  if (loading) return <Loading />;

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
