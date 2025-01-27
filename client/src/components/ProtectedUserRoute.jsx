import { useState, useEffect } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import PasscodeOverlay from "./PasscodeOverlay";
import { isDateLocked } from "../utils/dateUtils";
import { verifyUser } from "../Pages/api/Api";
import { VALENTINE_DATES } from "../utils/dateUtils";

const ProtectedUserRoute = ({ children }) => {
  const { username } = useParams();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // Extract the day type from the URL
  const dayType = location.pathname.split("/").pop();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await verifyUser(username);
        setUserData(response.user);

        const passcode = localStorage.getItem(`passcode_${username}`);
        if (passcode) {
          setShowOverlay(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    checkAccess();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the day is locked based on date
  const isDayLocked = userData?.isLocked && isDateLocked(dayType);

  if (isDayLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            This page is locked
          </h2>
          <p className="text-gray-600">
            This content will be available on{" "}
            {new Date(VALENTINE_DATES[dayType]).toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showOverlay && <PasscodeOverlay username={username} />}
      {children}
    </>
  );
};

export default ProtectedUserRoute;
