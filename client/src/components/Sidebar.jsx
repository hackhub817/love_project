import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const valentineDays = [
    { name: "Rose Day", path: "rose-day" },
    { name: "Propose Day", path: "propose-day" },
    { name: "Chocolate Day", path: "chocolate-day" },
    { name: "Teddy Day", path: "teddy-day" },
    { name: "Promise Day", path: "promise-day" },
    { name: "Hug Day", path: "hug-day" },
    { name: "Kiss Day", path: "kiss-day" },
    { name: "Valentine Day", path: "valentine-day" },
  ];

  return (
    <div
      className={`bg-white min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-700 px-4`}
    >
      <div className="py-3 flex justify-between items-center">
        <h1
          className={`whitespace-pre duration-500 ${
            !open && "opacity-0 translate-x-28 overflow-hidden"
          }`}
        >
          Fill the form for each day
        </h1>
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        <Link
          to="/dashboard"
          className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-indigo-100 rounded-md ${
            location.pathname === "/dashboard" ? "bg-indigo-100" : ""
          }`}
        >
          <div>
            <MdOutlineDashboard size={20} />
          </div>
          <h2
            style={{
              transitionDelay: `${0 + 3}00ms`,
            }}
            className={`whitespace-pre duration-500 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            Dashboard
          </h2>
        </Link>
        {valentineDays.map((day, idx) => (
          <Link
            key={day.name}
            to={day.path}
            className={`group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-indigo-100 rounded-md ${
              location.pathname === `/dashboard/${day.path}`
                ? "bg-indigo-100"
                : ""
            }`}
          >
            <div>{idx + 1}</div>
            <h2
              style={{
                transitionDelay: `${idx + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {day.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
