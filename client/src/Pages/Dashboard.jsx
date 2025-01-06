import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TeddyDay from "../components/days/TeddyDay";
import DashboardHome from "../components/DashboardHome";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="teddy-day" element={<TeddyDay />} />
          <Route path="rose-day" element={<div>Rose Day Component</div>} />
          <Route
            path="propose-day"
            element={<div>Propose Day Component</div>}
          />
          <Route
            path="chocolate-day"
            element={<div>Chocolate Day Component</div>}
          />
          <Route
            path="promise-day"
            element={<div>Promise Day Component</div>}
          />
          <Route path="hug-day" element={<div>Hug Day Component</div>} />
          <Route path="kiss-day" element={<div>Kiss Day Component</div>} />
          <Route
            path="valentine-day"
            element={<div>Valentine Day Component</div>}
          />
          {/* Catch all other paths and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
