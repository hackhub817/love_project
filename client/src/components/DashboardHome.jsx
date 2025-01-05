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

        // Verify token
        await verifyToken();

        if (user?.fullName) {
          setUserName(user.fullName);
        }
      } catch (error) {
        // If token verification fails, redirect to login
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
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome to Love Birds
          </h1>
          <p className="text-gray-600 mt-2">
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

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Your Selected Days
          </h2>
          <p className="text-gray-600">
            View and manage your special days here.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Messages
          </h2>
          <p className="text-gray-600">
            Check your romantic messages and updates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-900 mb-4">
            Profile
          </h2>
          <p className="text-gray-600">
            Update your personal information and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
