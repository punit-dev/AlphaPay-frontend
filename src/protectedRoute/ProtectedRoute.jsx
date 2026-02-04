import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!token) {
      navigate("/authentication");
    }
  }, [token, navigate]);
  return <>{token ? children : null}</>;
};

export default ProtectedRoute;
