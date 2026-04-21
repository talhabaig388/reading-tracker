import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔥 ALLOW ONLY ADMIN
  if (user.role !== "admin") {
    console.log("Blocked user:", user);
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;