import { useState, useEffect } from "react";
import { getUserDetails, toggleUserLock, logout } from "./api/Api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

//Dashboard.jsx

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      setUserData(response.user);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch user details");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleToggleLock = async () => {
    try {
      const response = await toggleUserLock(userId);
      setUserData((prev) => ({
        ...prev,
        isLocked: response.isLocked,
      }));
      toast.success(
        `Page ${response.isLocked ? "locked" : "unlocked"} successfully`
      );
    } catch (error) {
      toast.error("Failed to toggle lock status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const userPageUrl = `${window.location.origin}/${userData?.userName}`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-pink-600">
                  Welcome to LoveBirds
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/upload")}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Make Your Own Website
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dashboard
              </h2>

              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    User Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="mt-1">{userData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Username
                      </p>
                      <p className="mt-1">{userData.userName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{userData.userEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1">
                        {userData.phoneNumber || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Page Access
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Your Page URL
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={userPageUrl}
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(userPageUrl);
                            toast.success("URL copied to clipboard!");
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Passcode
                      </p>
                      <p className="mt-1">{userData.passcode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Page Status
                      </p>
                      <div className="mt-2">
                        <button
                          onClick={handleToggleLock}
                          className={`px-4 py-2 rounded ${
                            userData.isLocked
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white`}
                        >
                          {userData.isLocked ? "Unlock Page" : "Lock Page"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
