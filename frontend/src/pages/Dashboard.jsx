import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./users/UserDashboard"; // optional (or reuse old layout)

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </>
  );
}
