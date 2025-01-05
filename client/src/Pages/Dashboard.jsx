import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TeddyDay from "../components/days/TeddyDay";
import DashboardHome from "../components/DashboardHome";
// Import other day components as needed

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-7">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="teddy-day" element={<TeddyDay />} />
          {/* Add routes for other days */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
