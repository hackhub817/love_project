import { useState } from "react";
import { verifyPasscode } from "../Pages/api/Api";
import { useNavigate } from "react-router-dom";

const PasscodeOverlay = ({ username }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyPasscode({ username, passcode });
      if (response.success) {
        localStorage.setItem(`passcode_${username}`, passcode);
        // Force a re-render by updating state in parent
        window.location.reload();
      }
    } catch (error) {
      setError("Invalid passcode. Please try again.");
      setPasscode("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Enter Passcode
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter passcode"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasscodeOverlay;
