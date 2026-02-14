import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import RequestInput from "../components/RequestInput";
import Button from "../components/Button";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import TransactionDiv from "../components/TransactionDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";
import { useSelector } from "react-redux";
import AfterRequestSent from "./AfterRequestSent";
import useSearchUser from "../hooks/useSearchUser";
import ProfileForSend from "../components/ProfileForSend";

const RequestMoney = () => {
  const { user } = useSelector((state) => state.auth);
  const [searchVal, setSearchVal] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isShow, setIsShow] = useState(true);
  const { searchResults, loading, error } = useSearchUser(searchVal);

  const groupedTransactions = groupTransactionsByDate([
    {
      _id: "1",
      payer: {
        userRef: {
          _id: "user123",
          fullname: "John Doe",
          profilePic: "https://alphapay.onrender.com/assets/avatar/male3.png",
        },
        name: "John",
      },
      payee: {
        userRef: {
          _id: "user456",
          profilePic: "https://alphapay.onrender.com/assets/avatar/female3.png",
        },
        name: "Alice Smith",
      },
      amount: 500,
      status: "success",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      payer: {
        userRef: {
          _id: "user456",
          fullname: "Alice Smith",
          profilePic: "https://alphapay.onrender.com/assets/avatar/female3.png",
        },
        name: "Alice",
      },
      payee: {
        userRef: {
          _id: "user123",
          profilePic: "https://alphapay.onrender.com/assets/avatar/male3.png",
        },
        name: "John Doe",
      },
      amount: 1200,
      status: "pending",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: "3",
      payer: {
        userRef: {
          _id: "user456",
          fullname: "Alice Smith",
          profilePic: "https://alphapay.onrender.com/assets/avatar/female3.png",
        },
        name: "Alice",
      },
      payee: {
        userRef: {
          _id: "user123",
          profilePic: "https://alphapay.onrender.com/assets/avatar/male3.png",
        },
        name: "John Doe",
      },
      amount: 1200,
      status: "Failed",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  const handleForm = (e) => {
    e.preventDefault();
  };

  if (false) {
    return <AfterRequestSent />;
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
          <Button
            label={"Send request"}
            onClick={(e) => console.log("clicked")}
          />
        </form>
        <div className="overflow-y-auto w-full max-h-75 flex flex-col">
          {groupedTransactions.map((group) => (
            <SecondarySectionDiv
              key={group.date}
              background={false}
              label={group.formattedDate}
              border={true}>
              {group.transactions.map((transaction) => (
                <TransactionDiv
                  key={transaction._id}
                  amount={"₹" + transaction.amount}
                  createdAt={transaction.createdAt}
                  fullname={
                    transaction.payer.userRef._id == user._id
                      ? transaction.payee.name
                      : transaction.payer.userRef.fullname
                  }
                  profilePic={
                    transaction.payer.userRef._id == user._id
                      ? transaction.payee.userRef.profilePic
                      : transaction.payer.userRef.profilePic
                  }
                  status={transaction.status}
                  onClick={() => {
                    navigate(`/balance-hist/${transaction._id}`);
                  }}
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
