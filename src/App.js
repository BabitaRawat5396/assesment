import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Department from "./components/Department";
import Location from "./pages/Location";
import Users from "./pages/Users";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Dashboard />}>
          <Route path="/dashboard" element={<Department />} />
          <Route path="/location" element={<Location />} />
          <Route path="/users" element={<Users />} />
          {/* ..... */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
