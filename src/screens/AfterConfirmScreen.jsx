import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ProfileView from "../components/ProfileView";
import { RxCross2 } from "react-icons/rx";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const AfterConfirmScreen = ({ title, loading = false, user, amount }) => {
  const [isAnimates, setIsAnimates] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimates(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0B0F1A] h-screen w-full pt-20 relative flex flex-col overflow-hidden">
        <p className="text-white font-urbanist text-4xl mb-8 text-center font-bold">
          {title}
        </p>
        <div className="animate-spin h-30 w-30 border-4 border-t-[#00AFFF] border-r-[#00AFFF] border-b-transparent border-l-transparent rounded-full mx-auto mt-10" />
      </div>
    );
  }

  if (title?.toLowerCase() === "failed") {
    return (
      <div className="h-screen w-full bg-[#0B0F1A] relative">
        <motion.div
          initial={{ height: "100%" }}
          animate={{
            height: isAnimates ? "100%" : "35%",
            borderRadius: isAnimates ? "0" : "0 0 50% 50%",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4,
            type: "tween",
          }}
          className="bg-linear-120 from-[#C90000] to-[#FBA9A9] h-screen w-full pt-20 relative flex flex-col">
          <p className="text-white font-urbanist text-4xl mb-8 text-center font-bold">
            {title}
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: isAnimates ? 100 : 20 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.1,
              type: "tween",
            }}
            className="relative p-4 rounded-full bg-[#FF4C4C] mx-auto flex items-center justify-center">
            <RxCross2 className="mx-auto text-black w-30 h-30" />
          </motion.div>
        </motion.div>
        <div className="mt-25 flex flex-col ">
          <div className="text-center">
            <h3 className="font-urbanist text-xl font-semibold text-[#B0B8C3]">
              Amount
            </h3>
            <p className="font-urbanist text-4xl font-bold text-white mt-2">
              ₹ {amount || "0.00"}
            </p>
          </div>
          <div className="px-5 mt-10">
            <ProfileView user={user} />
          </div>
          <div className="px-5 mt-10">
            <Button label="Go Back to Home" onClick={() => navigate("/home")} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0B0F1A] relative">
      <motion.div
        initial={{ height: "100%" }}
        animate={{
          height: isAnimates ? "100%" : "35%",
          borderRadius: isAnimates ? "0" : "0 0 50% 50%",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
          type: "tween",
        }}
        className="bg-linear-120 from-[#00A571] to-[#00FEAE] h-screen w-full pt-20 relative flex flex-col">
        <p className="text-white font-urbanist text-4xl mb-8 text-center font-bold">
          {title}
        </p>
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: isAnimates ? 0 : -40 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.1,
              type: "tween",
            }}
            src="./images/success.svg"
            alt="Success"
            className="mx-auto w-70 h-70"
          />
        </div>
      </motion.div>
      <div className="mt-25 flex flex-col ">
        <div className="text-center">
          <h3 className="font-urbanist text-xl font-semibold text-[#B0B8C3]">
            Amount
          </h3>
          <p className="font-urbanist text-4xl font-bold text-white mt-2">
            ₹ {amount || "0.00"}
          </p>
        </div>
        <div className="px-5 mt-10">
          <ProfileView user={user} />
        </div>
        <div className="px-5 mt-10">
          <Button
            label="Go Back to Home"
            onClick={() => navigate("/home", { replace: true })}
          />
        </div>
      </div>
    </div>
  );
};

export default AfterConfirmScreen;
