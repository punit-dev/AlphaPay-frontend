import React, { useEffect, useRef } from "react";
import SecondaryNav from "../components/SecondaryNav";
import BalanceDiv from "../components/BalanceDiv";
import { useDispatch, useSelector } from "react-redux";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";
import { fetchTransactions } from "../redux/transactionSlice";

const BalanceHist = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions, loading, error } = useSelector(
    (state) => state.transactions,
  );
  const callRef = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (callRef.current) return;
    callRef.current = true;
    dispatch(fetchTransactions());
  }, []);

  const groupedTransactions = groupTransactionsByDate(transactions);
  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Balance & history"} />
      <div className="px-5 pt-10">
        <BalanceDiv total={user?.walletBalance} />
        <div className="overflow-y-auto w-full max-h-125 bg-amber-400">
          {groupedTransactions.map((group) => (
            <SecondarySectionDiv
              key={group.date}
              background={false}
              label={group.formattedDate}
              border={true}>
              {group.transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="h-20 w-full bg-black flex justify-between items-center">
                  <img
                    src={
                      transaction.payer.userRef._id == user._id
                        ? transaction.payee.userRef.profilePic
                        : transaction.payer.userRef.profilePic
                    }
                    alt=""
                    className="h-20 w-20"
                  />
                  <p className="text-white">
                    {transaction.payer.userRef._id === user._id
                      ? "+" + transaction.amount
                      : "-" + transaction.amount}
                  </p>
                </div>
              ))}
            </SecondarySectionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceHist;
