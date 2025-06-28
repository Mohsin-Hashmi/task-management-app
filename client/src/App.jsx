
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
