import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import ErrorScreen from "./ErrorScreen";
import axios from "axios";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDelay, setIsDelay] = useState(false);

  const hasCalledRef = useRef(false);

  const checkApiHealth = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://alphapay.onrender.com/health", {
        withCredentials: true,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong",
      );
    }
  };

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    checkApiHealth();
    setTimeout(() => setIsDelay(true), 3000);
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const timer = setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [loading, error]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% relative">
      <div>
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          src="/icons/icon.svg"
          alt=""
          className="h-40 w-40 mx-auto"
        />
        <h1 className="text-4xl text-center font-bold bg-clip-text bg-linear-140 from-[#00Afff] from-6% to-92% to-[#A27Eff] text-transparent font-space-grotesk">
          {"AlphaPay".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                type: "tween",
              }}>
              {char}
            </motion.span>
          ))}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Your Ultimate Payment Solution
        </p>
      </div>
      <div className="absolute bottom-10">
        {isDelay && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-500 mt-2 text-center">
            <span className="font-bold text-xl">⏳ Getting things ready…</span>{" "}
            <br />
            Our server is waking up from a short nap. Everything will be ready
            in a few seconds.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
