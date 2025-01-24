import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ChocolateDay } from "./components/days/Chocolate";
import { Teddy } from "./components/days/Teddy";
import { ProposeDay } from "./components/days/Propose";
import { Kiss } from "./components/days/Kiss";
import { HugDay } from "./components/days/Hug";
import Promise from "./components/days/Promise";
import { Valintine } from "./components/days/Valinetine";
import { Home } from "./Pages/Home";
import ImageUploadForm from "./components/ImageUploadForm";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/propose" element={<ProposeDay />} />
      <Route path="/propose/:username" element={<ProposeDay />} />
      <Route path="/chocolate/:username" element={<ChocolateDay />} />
      <Route path="/chocolate" element={<ChocolateDay />} />
      <Route path="/hug/:username" element={<HugDay />} />
      <Route path="/hug" element={<HugDay />} />
      <Route path="/teddy/:username" element={<Teddy />} />
      <Route path="/teddy" element={<Teddy />} />
      <Route path="/kiss/:username" element={<Kiss />} />
      <Route path="/kiss" element={<Kiss />} />
      <Route path="/promise" element={<Promise />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/valintine" element={<Valintine />} />
      <Route path="/upload" element={<ImageUploadForm />} />
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
