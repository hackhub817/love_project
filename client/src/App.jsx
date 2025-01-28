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
import { WeekDays } from "./Pages/WeekDays";
import { Rose } from "./components/days/Rose";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/week-day/:username/propose"
        element={
          <ProtectedUserRoute>
            <ProposeDay />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/chocolate"
        element={
          <ProtectedUserRoute>
            <ChocolateDay />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/hug"
        element={
          <ProtectedUserRoute>
            <HugDay />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/kiss"
        element={
          <ProtectedUserRoute>
            <Kiss />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/teddy"
        element={
          <ProtectedUserRoute>
            <Teddy />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/valentine"
        element={
          <ProtectedUserRoute>
            <Valintine />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/promise"
        element={
          <ProtectedUserRoute>
            <Promise />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username"
        element={
          <ProtectedUserRoute>
            <WeekDays />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/week-day/:username/rose"
        element={
          <ProtectedUserRoute>
            <Rose />
          </ProtectedUserRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/propose" element={<ProposeDay />} />
      <Route path="/chocolate" element={<ChocolateDay />} />
      <Route path="/rose" element={<Rose />} />
      <Route path="/hug" element={<HugDay />} />
      <Route path="/teddy" element={<Teddy />} />
      <Route path="/kiss" element={<Kiss />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <ImageUploadForm />
          </ProtectedRoute>
        }
      />

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
