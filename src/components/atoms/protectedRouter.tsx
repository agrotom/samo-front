import { useAuth } from "@/provider/authProvider";
import type React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProperties {
    invert?: boolean;
    children: React.ReactNode | React.ReactNode[];
}

export const ProtectedRoute = ({ children }: ProtectedRouteProperties) => {
    const { isLoggedIn } = useAuth();

    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            setAuthorized(import.meta.env.VITE_NO_AUTH_MODE === "true" || await isLoggedIn());
        })();
    }, []);

    if (authorized === null) {
        return <div>Loading...</div>;
    }
    
    if (authorized === false) {
        return <Navigate to="/signin" />;
    }

    return children;
};