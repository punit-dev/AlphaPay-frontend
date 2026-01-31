import React from "react";
import { Route, Routes } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";

const App = () => {
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
