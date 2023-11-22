import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export default function RedirectIfNotAdmin({ children }) {
  const { authUser } = useAuth();
  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return children;
}
