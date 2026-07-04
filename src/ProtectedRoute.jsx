import { Navigate } from "react-router";
import { getToken } from "./lib/token";

export const ProtectedRoute = ({ children }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
