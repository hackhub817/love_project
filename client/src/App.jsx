import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChocolateDay } from "./components/days/Chocolate";
import { Teddy } from "./components/days/Teddy";
import { Demo } from "./components/ui/Demo";
import { ProposeDay } from "./components/days/Propose";
import { Kiss } from "./components/days/Kiss";
import { HugDay } from "./components/days/Hug";
import Promise from "./components/days/Promise";
import { Valintine } from "./components/days/Valinetine";
import { Home } from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hug" element={<HugDay />} />
      <Route path="/chocolate" element={<ChocolateDay />} />
      <Route path="/teddy" element={<Teddy />} />
      <Route path="/promise" element={<Promise />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/propose" element={<ProposeDay />} />
      <Route path="/kiss/:username" element={<Kiss />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/valintine" element={<Valintine />} />
      <Route path="/propose/:username" element={<ProposeDay />} />
      <Route path="/teddy/:username" element={<Teddy />} />
      {/* Redirect root to dashboard if logged in, otherwise to login */}
      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
