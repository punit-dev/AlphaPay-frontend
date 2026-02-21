import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchReqById, deniedReq, deleteReq } from "../redux/requestSlice";
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
import ErrorScreen from "./ErrorScreen";

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

const RequestDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const { reqId } = useParams();
  const { request, isLoading, err } = useSelector((state) => state.request);
  const { balance } = useSelector((state) => state.transactions);
  const { cards, loading, error } = useSelector((state) => state.card);
  const [cardId, setCardId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (reqId) {
      dispatch(fetchReqById(reqId));
    }
  }, [reqId, dispatch]);

  if (isLoading) return <Loading />;
  if (err) return <ErrorScreen>Error: {err}</ErrorScreen>;
  if (!request)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0B0F1A] text-white px-5 text-center">
        <h2 className="text-2xl font-semibold mb-3">Request Not Found</h2>
        <p className="text-[#B0B8C3] mb-6">
          The payment request you are looking for does not exist or may have
          been removed.
        </p>
        <Button label="Go Back" onClick={() => navigate(-1)} />
      </div>
    );

  const currentStatus = statusObj[request?.status] || statusObj.PENDING;
  const reqDate = new Date(request?.createdAt);

  const deleteRequest = async () => {
    const resultAction = await dispatch(deleteReq(reqId));
    if (deleteReq.fulfilled.match(resultAction)) {
      navigate(`/request-money/${reqId}/canceled`, {
        state: {
          amount: request?.amount,
          toUser: request?.payerId.fullname,
          message: request?.message,
          title: "Request Deleted",
          label: "Request has been deleted",
        },
      });
    }
  };

  const deniedRequest = async () => {
    const resultAction = await dispatch(deniedReq(reqId));
    if (deniedReq.fulfilled.match(resultAction)) {
      navigate(`/request-money/${reqId}/canceled`, {
        state: {
          amount: request?.amount,
          toUser: request?.senderId.fullname,
          message: request?.message,
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
            request?.senderId?._id == user._id
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
                {reqDate.getDate() +
                  " " +
                  month[reqDate.getMonth()] +
                  ", " +
                  reqDate.toLocaleTimeString().split(":").slice(0, 2).join(":")}
              </p>
            </div>
          </div>
        </SecondarySectionDiv>
      </div>

      {!["approved", "denied"].includes(request?.status?.toLowerCase()) && (
        <div className="px-5 mt-10 flex gap-5">
          <Button
            label={request?.senderId?._id == user._id ? "Delete" : "Cancel"}
            background="transparent"
            border={"2px solid #FF4C4C"}
            color={"#FF4C4C"}
            onClick={() => {
              if (request?.senderId?._id == user._id) {
                deleteRequest();
              } else {
                deniedRequest();
              }
            }}
          />
          {request?.payerId?._id == user._id && (
            <Button
              label={"Pay now"}
              onClick={() => {
                if (request.amount === 0) {
                  alert("Please enter an amount");
                  return;
                }
                setShowOptions(true);
                if (cards.length == 0) dispatch(fetchCards());
              }}
            />
          )}
        </div>
      )}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, display: "none" }}
          animate={{
            opacity: showOptions ? 1 : 0,
            display: showOptions ? "flex" : "none",
          }}
          className="absolute bottom-0 left-0 right-0 h-screen bg-[#0B0F1A]/50 backdrop-blur-sm flex items-end justify-center">
          <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            transition={{
              duration: 0.5,
              type: "tween",
            }}
            className="w-full flex items-center justify-center max-h-90 flex-col bg-[#0B0F1A] border-x-2 border-t-2 border-white rounded-t-2xl">
            <h2 className="text-2xl text-white mt-4 font-lexend">Options</h2>
            <div className="h-full w-full flex flex-col gap-5 mt-5 relative px-4 overflow-y-auto">
              <PaymentOption
                label={"Wallet"}
                value={"Wallet"}
                type={"Wallet"}
                selected={selected === "Wallet"}
                onChange={setSelected}
                amount={balance}
                onClick={() => setCardId(null)}
              />
              {cards.length != 0 ? (
                cards.map((card) => (
                  <PaymentOption
                    label={card.cardHolder + ` (${card.type})`}
                    type={"Card"}
                    cardNumber={card.cardNumber}
                    onChange={setSelected}
                    value={card._id}
                    selected={selected === card._id}
                    key={card._id}
                    onClick={() => {
                      setCardId(card._id);
                    }}
                  />
                ))
              ) : (
                <p className="text-lg text-center text-[#B0B8C3] mb-2">
                  {error || "Cards not available"}
                </p>
              )}
              {loading && (
                <img src="/images/loading.svg" alt="" className="h-10 w-10" />
              )}
            </div>
            <div className="px-5 w-full my-4">
              <Button
                label={"Proceed"}
                background="#00FEAE"
                disabled={selected.length == 0}
                onClick={() => {
                  if (selected == "Wallet") {
                    setTimeout(() => {
                      navigate("/confirm-pay", {
                        state: {
                          user: request?.senderId,
                          amount: request?.amount,
                          method: "Wallet",
                          note: request?.message,
                          reqId,
                        },
                      });
                    }, 600);
                  } else {
                    setTimeout(() => {
                      navigate("/confirm-pay", {
                        state: {
                          user: request?.senderId,
                          amount: request?.amount,
                          method: "Card",
                          note: request?.message,
                          reqId,
                          cardId: cardId,
                        },
                      });
                    }, 600);
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RequestDetail;
