import Register from "./Pages/Auth/Register";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Auth/Login";

function App() {
  return (
    <>
      <Routes>
        {/* Add other routes here */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<>Coming Soon</>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
