import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, verifyToken } from "../Pages/api/Api";
import { toast } from "sonner";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token) {
          navigate("/login");
          return;
        }

        await verifyToken();

        if (user?.fullName) {
          setUserName(user.fullName);
        }
      } catch (err) {
        console.error("Session validation error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    validateSession();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();
      if (response.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-gray-200 px-10 py-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome to Love Birds
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Hello, {userName || "Valued Customer"}! 👋
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-indigo-900 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <span>Logging out</span>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
      <div className="flex justify-end px-10">
        <button
          onClick={() => navigate("/upload")}
          className="bg-indigo-900 px-5 py-3 font-semibold text-white rounded-xl"
        >
          Make Your Own Website
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
