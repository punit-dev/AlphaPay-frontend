import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchReqById, deniedReq } from "../redux/requestSlice";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import SuccessSVG from "/images/success.svg";
import FailedSVG from "/images/failed.svg";
import PendingSVG from "/images/pending.svg";
import Loading from "./Loading";
import ProfileView from "../components/ProfileView";
import Button from "../components/Button";
import NoteDiv from "../components/NoteDiv";
import PaymentOption from "../components/PaymentOption";
import { motion } from "motion/react";

const statusObj = {
  DENIED: { src: FailedSVG, label: "Denied", color: "#FF4C4C" },
  APPROVED: { src: SuccessSVG, label: "Approved", color: "#00FFAE" },
  PENDING: { src: PendingSVG, label: "Pending", color: "#FFB100" },
};

const month = [
  "Jan",
  "Fab",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const options = ["Wallet", "Card"];

const RequestDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { reqId } = useParams();
  const {
    request,
    isLoading: loading,
    err: error,
  } = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (reqId) {
      dispatch(fetchReqById(reqId));
    }
  }, [reqId, dispatch]);

  if (loading || !request) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const currentStatus = statusObj[request.status] || statusObj.PENDING;
  const reqData = new Date(request.createdAt);

  const deleteReq = () => {
    dispatch(deleteReq(reqId));
    if (!loading && !error) {
      navigate(`/request-money/${reqId}/canceled`, {
        state: {
          amount: request.amount,
          toUser: request.payerId.fullname,
          message: request.message,
        },
      });
    }
  };

  const deniedReq = () => {
    dispatch(deniedReq(reqId));
    if (!loading && !error) {
      navigate(`/request-money/${reqId}/canceled`, {
        state: {
          amount: request.amount,
          toUser: request.payerId.fullname,
          message: request.message,
        },
      });
    }
  };

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      <SecondaryNav title={"Request Detail"} />
      <div className="px-10 mt-3">
        <ProfileView
          user={
            request.senderId._id == user._id
              ? request.payerId
              : request.senderId
          }
        />
      </div>

      <div className="mx-auto mt-4 w-fit flex flex-col text-center">
        <p className="text-[#B0B8C3] font-urbanist font-semibold text-xl">
          Amount
        </p>
        <h2 className="text-white font-urbanist font-semibold text-[40px]">
          ₹{request?.amount}
        </h2>
        <div className="flex items-center justify-center">
          <img src={currentStatus.src} alt={currentStatus.label} />
          <p
            className="font-urbanist text-xl font-semibold"
            style={{ color: currentStatus.color }}>
            {currentStatus.label}
          </p>
        </div>
      </div>

      <div className="px-5">
        <NoteDiv message={request?.message} />
      </div>

      <div className="mt-7 px-5">
        <SecondarySectionDiv
          label={"Request Details"}
          background={false}
          border={true}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 flex-col">
              <p className="text-[#B0B8C3] font-urbanist text-xl font-semibold">
                Request ID
              </p>
              <p className="text-white font-urbanist text-xl font-bold -mt-4">
                {request?._id}
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <p className="text-[#B0B8C3] font-urbanist text-xl font-semibold">
                Requested on
              </p>
              <p className="text-white font-urbanist text-xl font-bold -mt-4">
                {reqData.getDate() +
                  " " +
                  month[reqData.getMonth()] +
                  ", " +
                  reqData.toLocaleTimeString().split(":").slice(0, 2).join(":")}
              </p>
            </div>
          </div>
        </SecondarySectionDiv>
      </div>

      {!["approved", "denied"].includes(request?.status.toLowerCase()) && (
        <div className="px-5 mt-10 flex gap-5">
          <Button
            label={request.senderId._id == user._id ? "Delete" : "Cancel"}
            background="transparent"
            border={"2px solid #FF4C4C"}
            color={"#FF4C4C"}
            onClick={request.senderId._id == user._id ? deleteReq : deniedReq}
          />
          {request.payerId._id == user._id && (
            <Button
              label={"Pay now"}
              onClick={() => {
                if (request.amount === 0) {
                  alert("Please enter an amount");
                  return;
                }
                setShowOptions(true);
              }}
            />
          )}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, display: "none" }}
        animate={{
          opacity: showOptions ? 1 : 0,
          display: showOptions ? "flex" : "none",
        }}
        className="absolute bottom-0 left-0 right-0 h-screen bg-[#0B0F1A]/50 backdrop-blur-sm flex items-center justify-center px-5">
        <div className="w-full flex items-center justify-center h-60 flex-col">
          <motion.div
            initial={{ y: 35 }}
            animate={{ y: -40 }}
            className="border-4 rounded-tl-4xl border-t-[#00AFFF] border-l-[#00aeff] border-r-transparent border-b-transparent w-full h-20"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            className="h-full w-full flex flex-col gap-5 relative px-4 overflow-hidden justify-center">
            {options.map((option) => (
              <PaymentOption
                key={option}
                label={option}
                value={option}
                selected={selected === option}
                onChange={setSelected}
                onClick={() => {
                  setShowOptions(false);
                  if (option === "Wallet") {
                    navigate("/confirm-pay", {
                      state: {
                        user: request?.senderId,
                        amount: request?.amount,
                        method: "Wallet",
                        note: request?.message,
                        reqId,
                      },
                    });
                  } else if (option === "Card") {
                    navigate("/confirm-pay", {
                      state: {
                        user: request?.senderId,
                        amount: request?.amount,
                        method: "Card",
                        note: request?.message,
                        reqId,
                      },
                    });
                  }
                }}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ y: -35 }}
            animate={{ y: 40 }}
            className="border-4 rounded-br-4xl border-b-[#00AFFF] border-r-[#00aeff] border-t-transparent border-l-transparent w-full h-20"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default RequestDetail;
