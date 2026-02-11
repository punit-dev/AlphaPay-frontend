import { Navigate, Route, Routes, useLocation } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import Nav from "./components/Nav";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import BalanceHist from "./screens/BalanceHist";
import TransactionDetail from "./screens/TransactionDetail";
import SendMoney from "./screens/SendMoney";
import ConfirmPay from "./screens/ConfirmPay";
import SplashScreen from "./screens/SplashScreen";
import PhonePay from "./screens/PhonePay";
import UpiPay from "./screens/UpiPay";
import ScanQR from "./screens/ScanQR";

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% w-full h-screen overflow-hidden">
      {location.pathname == "/home" && <Nav />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/home" element={<ProtectedRoute children={<Home />} />} />
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
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </div>
  );
};

export default App;
