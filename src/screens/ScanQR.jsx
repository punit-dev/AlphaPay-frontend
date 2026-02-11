import React, { useEffect, useRef, useState } from "react";

import { Html5Qrcode } from "html5-qrcode";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";
import { useNavigate } from "react-router";

const ScanQR = () => {
  const qrRef = useRef(null);
  const isMountedRef = useRef(false);
  const [upiId, setUpiId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const callSearchApi = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/search?query=${upiId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setSearchResults(res.data.results);
    } catch (err) {
      setError(err.response?.data?.message || "Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMountedRef.current) return;

    isMountedRef.current = true;

    const qr = new Html5Qrcode("scanner");
    qrRef.current = qr;

    qr.start({ facingMode: "environment" }, { fps: 10 }, (decodedText) => {
      setUpiId(decodedText);
    }).catch((err) => console.log(err));

    return () => {
      if (qrRef.current?.isScanning) {
        qrRef.current
          .stop()
          .then(() =>
            navigate("/send-money", { state: { user: searchResults[0] } }),
          );
      }
    };
  }, []);

  useEffect(() => {
    if (upiId.length === 0) {
      setSearchResults([]);
      return;
    }
    callSearchApi();
  }, [upiId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
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
