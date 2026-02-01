import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import axios from "axios";
import Button from "./components/Button";

const App = () => {
  const [status, setStatus] = useState("loading");
  const checkApiHealth = async () => {
    setStatus("loading");

    try {
      const res = await axios.get(`https://alphapay.onrender.com/health`);

      if (res.status == 200) {
        setStatus("healthy");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  if (status == "loading") {
    return <div>loading...</div>;
  }

  if (status == "error") {
    return (
      <Button onClick={() => window.location.reload()} label={"restart"} />
    );
  }

  return (
    <div className="bg-linear-140 from-purple-400 via-black to-blue-400 w-full h-screen px-7 overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </div>
  );
};

export default App;
