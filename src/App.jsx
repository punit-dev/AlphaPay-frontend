import { Navigate, Route, Routes, useLocation } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import Nav from "./components/Nav";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import BalanceHist from "./screens/BalanceHist";
import TransactionDetail from "./screens/TransactionDetail";
import SendMoney from "./screens/SendMoney";
import ConfirmPay from "./screens/ConfirmPay";
import SplashScreen from "./screens/SplashScreen";

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% w-full h-screen overflow-hidden">
      {location.pathname == "/home" && <Nav />}
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/balance-hist"
          element={
            <ProtectedRoute>
              <BalanceHist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/balance-hist/:txnId"
          element={
            <ProtectedRoute>
              <TransactionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-money"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirm-pay"
          element={
            <ProtectedRoute>
              <ConfirmPay />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="/splash" replace />} /> */}
      </Routes>
    </div>
  );
};

export default App;
