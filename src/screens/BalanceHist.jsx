import React from "react";
import SecondaryNav from "../components/SecondaryNav";
import BalanceDiv from "../components/BalanceDiv";
import { useSelector } from "react-redux";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";

const BalanceHist = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transactions);
  const groupedTransactions = groupTransactionsByDate(transactions);
  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Balance & history"} />
      <div className="px-5 pt-10">
        <BalanceDiv total={user?.walletBalance} />
        <div>
          {groupedTransactions.map((group) => (
            <SecondarySectionDiv
              key={group.date}
              background={false}
              label={group.formattedDate}
              border={true}>
              {group.transactions.map((transaction) => (
                <div key={transaction.id}></div>
              ))}
            </SecondarySectionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceHist;
