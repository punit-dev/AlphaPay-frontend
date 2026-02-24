import React, { useEffect, useRef, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import ProfileForSend from "../components/ProfileForSend";
import { useNavigate } from "react-router";
import useSearchUser from "../hooks/useSearchUser";

const PhonePay = () => {
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState(false);
  const { searchResults, loading, error } = useSearchUser(searchVal);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    setSelected(true);
  }, []);

  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Pay via Phone no."} />
      <div className="pt-20">
        <div className="px-5 mt-5">
          <motion.div
            initial={{ boxShadow: "none" }}
            animate={{ boxShadow: selected ? "0 0 20px #00AFFF89" : "none" }}
            className="text-white font-urbanist text-xl font-medium flex items-center justify-between px-3 py-4 border-2 border-[#00AFFF] rounded-2xl">
            <input
              ref={inputRef}
              placeholder="Enter phone number"
              className="bg-transparent w-full outline-none"
              type="number"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onSelect={() => setSelected(true)}
              onBlur={() => setSelected(false)}
            />
          </motion.div>
        </div>
        <div className="px-5">
          {loading ? (
            <p className="text-white font-urbanist text-center mt-10">
              Loading...
            </p>
          ) : error ? (
            <p className="text-white font-urbanist text-center mt-10">
              {error}
            </p>
          ) : (
            searchResults.map((profile) => (
              <ProfileForSend
                key={profile._id}
                profilePic={profile.profilePic}
                fullname={profile.fullname}
                id={profile.phoneNumber}
                onClick={(e) => {
                  navigate("/send-money", { state: { user: profile } });
                }}
                showBtn={profile._id !== user._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PhonePay;
