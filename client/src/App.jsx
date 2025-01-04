import Register from "./Pages/Auth/Register";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        {/* Add other routes here */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<>Coming Soon</>} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
