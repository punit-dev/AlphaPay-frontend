import { Route, Routes, useLocation } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import Nav from "./components/Nav";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import BalanceHist from "./screens/BalanceHist";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasCalledRef = useRef(false);

  const checkApiHealth = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://alphapay.onrender.com/health", {
        withCredentials: true,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message || err?.message || "Health check failed",
      );
    }
  };

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    checkApiHealth();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white text-3xl h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white text-3xl h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% w-full h-screen overflow-hidden">
      {location.pathname == "/" && <Nav />}
      <Routes>
        <Route path="/authentication" element={<Authentication />} />
        <Route
          path="/"
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
      </Routes>
    </div>
  );
};

export default App;
