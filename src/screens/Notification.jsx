import React, { useEffect, useRef } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification, markAsRead } from "../redux/notificationSlice";
import Loading from "./Loading";
import NotificationDiv from "../components/NotificationDiv";
import { groupTransactionsByDate } from "../utils/transactionUtils";
import NotificationSecDiv from "../components/NotificationSecDiv";
import { toSentenceCase } from "../utils/toSentenceCase";
import { useNavigate } from "react-router";

const Notification = () => {
  const navigate = useNavigate();
  const { notifications, loading, error } = useSelector(
    (state) => state.notification,
  );
  const dispatch = useDispatch();

  const callRef = useRef(false);

  useEffect(() => {
    if (callRef.current) return;
    callRef.current = true;
    dispatch(fetchNotification());
  }, []);

  if (loading) {
    return <Loading />;
  }

  const groupedNotification = groupTransactionsByDate(notifications);

  const notifyAccess = {
    transaction: {
      src: "./icons/transaction.svg",
      onClick: (txnId, notifyId) => {
        navigate(`/balance-hist/${txnId}`);
        dispatch(markAsRead(notifyId));
      },
    },
    request: {
      src: "./icons/request_money.svg",
      onClick: (reqId, notifyId) => {
        navigate(`/request-money/${reqId}`);
        dispatch(markAsRead(notifyId));
      },
    },
  };

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      <SecondaryNav title={"Notifications"} />
      {notifications.length == 0 ? (
        <p className="text-lg text-center text-[#B0B8C3]">Empty</p>
      ) : (
        <div className="h-[calc(100vh-65px)] w-full overflow-y-auto px-5 py-3 flex flex-col gap-5 pt-20">
          {groupedNotification.map((group, idx) => (
            <NotificationSecDiv
              key={idx}
              label={group.formattedDate}
              delay={idx / 60}>
              {group.items.map((item, id) => (
                <NotificationDiv
                  key={id}
                  isRead={item.isRead}
                  message={item.message}
                  heading={toSentenceCase(item.type)}
                  src={notifyAccess[item.type].src}
                  onClick={(e) => {
                    if (item.type == "transaction") {
                      notifyAccess[item.type]?.onClick(
                        item.data.transactionId,
                        item._id,
                      );
                    } else {
                      notifyAccess[item.type]?.onClick(
                        item.data?.request?._id,
                        item._id,
                      );
                    }
                  }}
                />
              ))}
            </NotificationSecDiv>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
