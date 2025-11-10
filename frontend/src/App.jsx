import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./pages/admin/CreateTask";
import UpdateTask from "./pages/admin/UpdateTask";

function PrivateRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);


  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-task"
          element={
            <PrivateRoute role="admin">
              <CreateTask />
            </PrivateRoute>
          }
        />
<Route path="/update-task/:id" element={<UpdateTask />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
