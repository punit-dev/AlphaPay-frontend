import { Navigate, Route, Routes } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import BalanceHist from "./screens/BalanceHist";
import TransactionDetail from "./screens/TransactionDetail";
import SendMoney from "./screens/SendMoney";
import ConfirmPay from "./screens/ConfirmPay";
import SplashScreen from "./screens/SplashScreen";
import PhonePay from "./screens/PhonePay";
import UpiPay from "./screens/UpiPay";
import ScanQR from "./screens/ScanQR";
import Profile from "./screens/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import socket from "./socket";
import Notification from "./screens/Notification";
import RequestMoney from "./screens/RequestMoney";
import ErrorScreen from "./screens/ErrorScreen";
import AfterRequestSent from "./screens/AfterRequestSent";
import RequestHist from "./screens/RequestHist";
import RequestDetail from "./screens/RequestDetail";
import RequestCancel from "./screens/RequestCancel";
import { appendNotification } from "./redux/notificationSlice";
import { appendTransaction } from "./redux/transactionSlice";
import { appendRequest } from "./redux/requestSlice";
import AddCard from "./screens/AddCard";
import { fetchProfile } from "./redux/userSlice";
import EditProfilePic from "./screens/EditProfilePic";

const App = () => {
  const [isTooWide, setIsTooWide] = useState(window.innerWidth > 425);

  const { user } = useSelector((state) => state.auth);
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsTooWide(window.innerWidth > 425);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchProfile());
      setIsFetched(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user?._id) return;

    socket.on("connect", () => {
      socket.emit("add", user._id);
    });

    return () => {
      socket.off("connect");
    };
  }, [user]);

  useEffect(() => {
    socket.on("tran", (data) => {
      dispatch(appendNotification(data));
      dispatch(appendTransaction(data.data.transaction));
    });
    socket.on("request", (data) => {
      dispatch(appendNotification(data));
      dispatch(appendRequest(data.data.request));
    });

    return () => {
      socket.off("tran");
      socket.off("request");
    };
  }, []);

  if (isTooWide) {
    return (
      <ErrorScreen error="Screen Size Unsupported. To ensure a seamless experience, this app is only accessible via mobile devices." />
    );
  }

  return (
    <div className="bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% w-full h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/home" element={<ProtectedRoute children={<Home />} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path="/balance-hist"
          element={<ProtectedRoute children={<BalanceHist />} />}
        />
        <Route
          path="/balance-hist/:txnId"
          element={<ProtectedRoute children={<TransactionDetail />} />}
        />
        <Route
          path="/phone-pay"
          element={<ProtectedRoute children={<PhonePay />} />}
        />
        <Route
          path="/upi-pay"
          element={<ProtectedRoute children={<UpiPay />} />}
        />
        <Route
          path="/scan-qr"
          element={<ProtectedRoute children={<ScanQR />} />}
        />
        <Route
          path="/send-money"
          element={<ProtectedRoute children={<SendMoney />} />}
        />
        <Route
          path="/confirm-pay"
          element={<ProtectedRoute children={<ConfirmPay />} />}
        />
        <Route
          path="/notifications"
          element={<ProtectedRoute children={<Notification />} />}
        />
        <Route
          path="/request-money"
          element={<ProtectedRoute children={<RequestMoney />} />}
        />
        <Route
          path="/request-money/done"
          element={<ProtectedRoute children={<AfterRequestSent />} />}
        />
        <Route
          path="/request-hist"
          element={<ProtectedRoute children={<RequestHist />} />}
        />
        <Route
          path="/request-money/:reqId"
          element={<ProtectedRoute children={<RequestDetail />} />}
        />
        <Route
          path="/request-money/:reqId/canceled"
          element={<ProtectedRoute children={<RequestCancel />} />}
        />
        <Route
          path="/add-card"
          element={<ProtectedRoute children={<AddCard />} />}
        />
        <Route
          path="/profile/edit-profile-pic"
          element={<ProtectedRoute children={<EditProfilePic />} />}
        />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </div>
  );
};

export default App;
