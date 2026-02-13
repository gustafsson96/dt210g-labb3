import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRoutesProps {
    children: ReactNode
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
    // Get logged in user from AuthContext
    const { user } = useAuth();

    // Redirect to login if no user is logged in
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Render protected content if user is logged in
    return (
        <>{children}</>
    )
}

export default ProtectedRoutes;