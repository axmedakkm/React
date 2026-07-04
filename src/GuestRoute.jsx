import { Navigate } from "react-router";
import { getToken } from "./lib/token";

export const GuestRoute = ({ children }) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
