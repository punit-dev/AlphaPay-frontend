import React, { useEffect, useState, useMemo } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReq } from "../redux/requestSlice";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";
import RequestDiv from "../components/RequestDiv";
import { groupRequestsByStatus } from "../utils/requestUtils";
import SecondarySectionDiv from "../components/SecondarySectionDiv";

const RequestHist = () => {
  const [selected, setSelected] = useState("receive");
  const dispatch = useDispatch();
  const { requests, isLoading, err } = useSelector((state) => state.request);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchReq());
  }, [dispatch]);

  const groupedRequests = useMemo(() => {
    if (!requests) return [];

    const filtered = requests.filter((req) =>
      selected === "receive"
        ? req.payerId._id === user._id
        : req.senderId._id === user._id,
    );

    return groupRequestsByStatus(filtered);
  }, [requests, selected, user._id]);

  if (isLoading) return <Loading />;
  if (err) return <ErrorScreen error={err} />;

  return (
    <div className="h-screen w-full bg-[#0B0F1A] overflow-y-auto">
      <SecondaryNav title={"Request history"} />

      <div className="flex justify-center gap-10 items-center px-5 mt-5 font-urbanist font-semibold text-xl">
        {["receive", "sent"].map((tab) => (
          <motion.button
            key={tab}
            animate={{
              boxShadow: selected === tab ? "0 0 10px #00AFFF99" : "none",
              border:
                selected === tab ? "1px solid #00AFFF" : "1px solid #2C3546",
              color: selected === tab ? "white" : "#707A89",
            }}
            onClick={() => setSelected(tab)}
            className="py-2 w-30 bg-[#161B26] rounded-xl capitalize">
            {tab}
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-8 px-5 pb-10">
        {groupedRequests.length > 0 ? (
          groupedRequests.map((group) => (
            <SecondarySectionDiv
              key={group.status}
              label={group.label}
              background={false}
              border={true}>
              {group.items.map((item) => (
                <RequestDiv
                  key={item._id}
                  amount={item.amount}
                  createdAt={item.createdAt}
                  fullname={
                    selected === "receive"
                      ? item.senderId.fullname
                      : item.payerId.fullname
                  }
                  profilePic={
                    selected === "receive"
                      ? item.senderId.profilePic
                      : item.payerId.profilePic
                  }
                  status={item.status}
                />
              ))}
            </SecondarySectionDiv>
          ))
        ) : (
          <div className="text-center text-[#707A89] mt-10">
            No requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestHist;
