import React, { useEffect, useRef } from "react";
import SecondaryNav from "../components/SecondaryNav";
import BalanceDiv from "../components/BalanceDiv";
import { useDispatch, useSelector } from "react-redux";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";
import { fetchTransactions } from "../redux/transactionSlice";
import TransactionDiv from "../components/TransactionDiv";
import { useNavigate } from "react-router";
import Loading from "./Loading";

const BalanceHist = () => {
  const { user } = useSelector((state) => state.auth);
  const { transactions, loading, error, balance, expenses } = useSelector(
    (state) => state.transactions,
  );

  const navigate = useNavigate();

  const callRef = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (callRef.current) return;
    callRef.current = true;
    dispatch(fetchTransactions(50));
  }, []);

  if (loading) return <Loading />;

  const groupedTransactions = groupTransactionsByDate(transactions);
  return (
    <div className="bg-[#0B0F1A] h-screen w-full">
      <SecondaryNav title={"Balance & history"} />
      <div className="px-5 pt-20">
        <BalanceDiv
          from={0}
          to={balance}
          label={"Total money"}
          src={"./images/wallet.png"}
        />
        <div className="mt-5">
          <BalanceDiv
            from={0}
            to={expenses}
            bgColor={"#B6FFC7"}
            shadow={"#B6FFC78e"}
            label={"Today expenses"}
            src={"./images/expenses.svg"}
          />
        </div>
        <div className="overflow-y-auto w-full max-h-85 flex flex-col mt-8">
          {groupedTransactions.map((group) => (
            <SecondarySectionDiv
              key={group.date}
              background={false}
              label={group.formattedDate}
              border={true}>
              {group.items.map((transaction) => (
                <TransactionDiv
                  key={transaction._id}
                  amount={
                    transaction.payee.userRef._id === user._id
                      ? "+" + transaction.amount
                      : "-" + transaction.amount
                  }
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

export default BalanceHist;
