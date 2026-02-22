import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import RequestInput from "../components/RequestInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import useSearchUser from "../hooks/useSearchUser";
import ProfileForSend from "../components/ProfileForSend";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import TransactionDiv from "../components/TransactionDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";
import { clearRequest, fetchReq, makeReq } from "../redux/requestSlice";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";
import { useNavigate } from "react-router";

const RequestMoney = () => {
  const { user } = useSelector((state) => state.user);
  const [searchVal, setSearchVal] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [userData, setUserData] = useState({});
  const { searchResults, loading, error } = useSearchUser(searchVal);
  const { request, isLoading, err, requests } = useSelector(
    (state) => state.request,
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const groupedRequests = groupTransactionsByDate(requests);

  const handleForm = async (e) => {
    e.preventDefault();

    dispatch(clearRequest());

    const data = { payerId: userData.id, amount, message: note };

    const resultAction = await dispatch(makeReq(data));

    if (makeReq.fulfilled.match(resultAction)) {
      const createdRequest = resultAction.payload;

      navigate("/request-money/done", {
        state: {
          amount,
          user: userData,
          message: note,
          reqId: createdRequest._id,
        },
        replace: true,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchReq());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (err) {
    return <ErrorScreen error={err} />;
  }

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      <SecondaryNav title={"Request money"} />
      <div className="px-5 w-full h-full">
        <form
          onSubmit={handleForm}
          className="w-full flex flex-col justify-between pt-7 pb-5">
          <div className="w-full h-70 relative py-5">
            <h5 className="px-3 py-1 rounded-lg bg-linear-120 from-[#00AFFF] to-[#A27EFF] left-1/2 -translate-1/2 w-fit absolute font-urbanist font-semibold text-xl">
              Request form
            </h5>
            <div className="bg-linear-150 from-[#00AFFF] to-[#A27EFF] p-0.5 w-full rounded-xl">
              <div className="w-full rounded-xl bg-[#0B0F1A] px-3 pt-10 pb-7 flex flex-col gap-3">
                <RequestInput
                  id={"ap-payer"}
                  label={"Payer: "}
                  placeholder={"UPI id/Phone no."}
                  name={"payer"}
                  type={"text"}
                  value={searchVal}
                  setValue={setSearchVal}
                  onChange={() => setIsShow(true)}
                />
                {isShow && (
                  <div className="absolute h-auto max-h-50 w-full left-0 top-27.5 p-0.5 ">
                    <div className="w-full bg-[#0B0F1A] transition-all duration-100 px-3 py-1">
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
                            id={
                              !isNaN(searchVal) && !isNaN(parseFloat(searchVal))
                                ? profile.phoneNumber
                                : profile.upiId
                            }
                            onClick={() => {
                              if (
                                !isNaN(searchVal) &&
                                !isNaN(parseFloat(searchVal))
                              ) {
                                setSearchVal(profile.phoneNumber);
                                setIsShow(false);
                              } else {
                                setSearchVal(profile.upiId);
                                setIsShow(false);
                              }
                              setUserData({
                                id: profile._id,
                                fullname: profile.fullname,
                                upiId: profile.upiId,
                                profilePic: profile.profilePic,
                              });
                            }}
                            showBtn={profile._id !== user._id}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )}
                <RequestInput
                  label={"Amount:"}
                  id={"ap-amount"}
                  name={"amount"}
                  placeholder={"₹ 0.00"}
                  type={"number"}
                  value={amount}
                  setValue={setAmount}
                />
                <RequestInput
                  label={"Note:"}
                  name={"amount"}
                  placeholder={"Describe reason"}
                  type={"text"}
                  id={"ap-note"}
                  value={note}
                  setValue={setNote}
                />
              </div>
            </div>
          </div>
          <Button label={"Send request"} />
        </form>
        <div className="overflow-y-auto w-full max-h-75 flex flex-col">
          {groupedRequests.map((group) => (
            <SecondarySectionDiv
              key={group.date}
              background={false}
              label={group.formattedDate}
              border={true}>
              {group.items.map((req, idx) => (
                <TransactionDiv
                  key={req._id || idx} // Use unique ID if available
                  amount={"₹" + req.amount}
                  createdAt={req.createdAt}
                  fullname={
                    req.senderId?._id === user._id
                      ? req.payerId?.fullname
                      : req.senderId?.fullname
                  }
                  profilePic={
                    req.senderId?._id === user._id
                      ? req.payerId?.profilePic
                      : req.senderId?.profilePic
                  }
                  status={req?.status || "pending"} // Provide a fallback
                  onClick={() => navigate(`/request-money/${req?._id}`)}
                />
              ))}
            </SecondarySectionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestMoney;
