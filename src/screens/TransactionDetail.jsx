import React, { useEffect } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Detail from "../components/Detail";
import { fetchTxn } from "../redux/transactionSlice";
import SecondarySectionDiv from "../components/SecondarySectionDiv";
import SuccessSVG from "/images/success.svg";
import FailedSVG from "/images/failed.svg";
import Loading from "./Loading";

const TransactionDetail = () => {
  const { txnId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { txn, loading, error } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (txnId) {
      dispatch(fetchTxn(txnId));
    }
  }, [txnId]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      {txn && (
        <SecondaryNav
          title={
            txn?.payer.userRef._id == user._id
              ? txn.payee.name
              : txn.payer.userRef.fullname
          }
        />
      )}
      <div className="mx-auto mt-10 w-fit flex flex-col text-center">
        <p className="text-[#B0B8C3] font-urbanist font-semibold text-xl">
          Amount
        </p>
        <h2 className="text-white font-urbanist font-semibold text-[40px]">
          ₹{txn?.amount}
        </h2>
        <div className="flex items-center justify-center">
          <img src={txn?.status == "SUCCESS" ? SuccessSVG : FailedSVG} />
          <p
            className="font-urbanist text-xl font-semibold"
            style={{
              color: txn?.status == "SUCCESS" ? "#00FFAE" : "#FF4C4C",
            }}>
            {txn?.status == "SUCCESS" ? "Successful" : "Failed"}
          </p>
        </div>
      </div>

      <div className="mt-7 px-5">
        <div className="bg-[#161B26] w-full rounded-xl px-4 py-3">
          <Detail
            key={0}
            createdAt={txn?.createdAt}
            name={txn?.payer.userRef.fullname}
            title={"Sander"}
            upiId={txn?.payee.upiId}
          />
          <Detail
            key={1}
            createdAt={txn?.createdAt}
            name={txn?.payee.userRef.fullname}
            title={"Receiver"}
            upiId={txn?.payer.upiId}
          />
        </div>
      </div>

      <div className="mt-10 px-5">
        <SecondarySectionDiv
          label={"Transaction Details"}
          background={false}
          border={true}>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 flex-col">
              <p className="text-[#B0B8C3] font-urbanist text-xl font-semibold">
                Transaction ID
              </p>
              <p className="text-white font-urbanist text-xl font-bold -mt-4">
                {txn?._id}
              </p>
            </div>

            <div className="px-3 pb-4 pt-2 bg-[#161B26] rounded-xl flex flex-col gap-2 mt-3">
              <p className="text-[#B0B8C3] font-urbanist text-sm font-semibold">
                Note
              </p>
              <p className="text-white font-lexend text-base font-medium ">
                {txn?.message}
              </p>
            </div>
          </div>
        </SecondarySectionDiv>
      </div>
    </div>
  );
};

export default TransactionDetail;
