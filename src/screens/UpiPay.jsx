import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import ProfileForSend from "../components/ProfileForSend";
import axios from "axios";
import { useNavigate } from "react-router";

const UpiPay = () => {
  const [searchVal, setSearchVal] = useState("");
  const [selected, setSelected] = useState(false);
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
        `${import.meta.env.VITE_BASE_URL}/search?query=${searchVal}`,
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
    if (searchVal.length === 0 || searchVal.length < 3) {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      callSearchApi();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Pay via UPI"} />
      <div>
        <div className="px-5 mt-5">
          <motion.div
            initial={{ boxShadow: "none" }}
            animate={{ boxShadow: selected ? "0 0 20px #00AFFF89" : "none" }}
            className="text-white font-urbanist text-xl font-medium flex items-center justify-between px-3 py-4 border-2 border-[#00AFFF] rounded-2xl">
            <input
              placeholder="Enter UPI ID"
              className="bg-transparent w-full outline-none"
              type="text"
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
            searchResults.map((profile) =>
              profile._id === user._id ? null : (
                <ProfileForSend
                  key={profile._id}
                  profilePic={profile.profilePic}
                  fullname={profile.fullname}
                  id={profile.upiId}
                  onClick={(e) => {
                    navigate("/send-money", { state: { user: profile } });
                  }}
                />
              ),
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default UpiPay;
