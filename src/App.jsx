import { Route, Routes, useLocation } from "react-router";
import Authentication from "./screens/Authentication";
import Home from "./screens/Home";
import Nav from "./components/Nav";

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-linear-140 from-[#342952] via-[#0B0F1A] via-40% to-[#00AFFF] to-300% w-full h-screen overflow-hidden">
      {location.pathname != "/authentication" && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </div>
  );
};

export default App;
