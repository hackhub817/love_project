import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyToken } from "../Pages/api/Api";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsValid(false);
          setIsVerifying(false);
          return;
        }

        await verifyToken();
        setIsValid(true);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    validateToken();
  }, []);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#281996] via-[#140A64] to-[#281996]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-indigo-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
