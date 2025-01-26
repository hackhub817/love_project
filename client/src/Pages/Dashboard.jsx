import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import TeddyDay from "../components/days/TeddyDay";
import DashboardHome from "../components/DashboardHome";

const Dashboard = () => {
  return (
    <div className="flex">
      <DashboardHome />
    </div>
  );
};

export default Dashboard;
