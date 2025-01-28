import { useState, useEffect } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import PasscodeOverlay from "./PasscodeOverlay";
import { isDateLocked } from "../utils/dateUtils";
import { verifyUser } from "../Pages/api/Api";
import { VALENTINE_DATES } from "../utils/dateUtils";
import { toast } from "sonner";

const ProtectedUserRoute = ({ children }) => {
  const { username } = useParams();
  const [showOverlay, setShowOverlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const dayType = location.pathname.split("/").pop();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await verifyUser(username);
        setUserData(response.user);
        console.log(response);

        const passcode = localStorage.getItem(`passcode_${username}`);
        if (passcode) {
          setShowOverlay(false);
        }
        if (!response.user.isPasswordProtected) {
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

  // Only check date lock for specific day routes, not the main WeekDays page
  if (dayType !== username && userData?.isLocked && isDateLocked(dayType)) {
    toast.error(
      `This page will be available on ${new Date(
        VALENTINE_DATES[dayType]
      ).toLocaleDateString()}`
    );
    return <Navigate to={`/${username}`} replace />;
  }

  return (
    <>
      {showOverlay && <PasscodeOverlay username={username} />}
      {children}
    </>
  );
};

export default ProtectedUserRoute;
