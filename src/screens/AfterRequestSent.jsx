import ProfileView from "../components/ProfileView";
import Button from "../components/Button";

import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import SecondaryNav from "../components/SecondaryNav";
import NoteDiv from "../components/NoteDiv";

const AfterRequestSent = () => {
  const location = useLocation();
  const { amount, user, message, reqId } = location.state;
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Request Sent"} />
      <div className="px-5 pt-10">
        <motion.img
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.3,
          }}
          src={"/images/success.svg"}
          className="h-55 w-55 mx-auto"
        />
        <p className="text-[#00FFAE] text-center font-urbanist font-medium text-[28px] -mt-7">
          {"Request sent successfully".split("").map((char, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "tween",
                duration: 0.6,
                delay: idx / 30,
              }}>
              {char}
            </motion.span>
          ))}
        </p>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.7,
          }}
          className="bg-[#161B26] border-2 border-[#2C3546] p-2.5 rounded-2xl font-semibold font-urbanist text-center mt-7 flex flex-col gap-2">
          <h4 className="text-[#B0B8C3] text-xl ">Amount</h4>
          <p className="text-4xl text-white">₹ {amount}</p>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.7,
            delay: 0.2,
          }}
          className="flex items-center mt-5 gap-4">
          <p className="text-[28px] text-[#B0B8C3] font-urbanist font-semibold">
            To:
          </p>
          <ProfileView user={user} />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.7,
            delay: 0.4,
          }}>
          <NoteDiv message={message} />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.7,
            delay: 0.6,
          }}
          className="mt-8">
          <Button
            label={"View request details"}
            onClick={(e) => navigate(`/request-money/${reqId}`)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AfterRequestSent;
