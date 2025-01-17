import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { HugDay } from "./components/days/HugDay";
import { ChocolateDay } from "./components/days/Chocolate";
import { Teddy } from "./components/days/Teddy";
import { Demo } from "./components/ui/Demo";
import { KissDay } from "./components/days/KissDay";
import { Kiss } from "./components/days/Kiss";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hug" element={<HugDay />} />
      <Route path="/chocolate" element={<ChocolateDay />} />
      <Route path="/teddy" element={<Teddy />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/kiss" element={<KissDay />} />
      <Route path="/kissDay" element={<Kiss />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
