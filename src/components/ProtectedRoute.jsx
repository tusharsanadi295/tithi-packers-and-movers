import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("customerToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check expiry
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("customerToken");
      return <Navigate to="/login" replace />;
    }

    return children;

  } catch (err) {
    localStorage.removeItem("customerToken");
    return <Navigate to="/login" replace />;
  }
}