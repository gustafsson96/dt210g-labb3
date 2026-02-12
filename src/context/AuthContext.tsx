import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { User, LoginCredentials, AuthRes, AuthContext } from '../interfaces/Auth';

const api = "http://localhost:3000";

// Create context for authentication
const AuthContext = createContext<AuthContext | null>(null);

// Type for AuthProvider props
interface AuthProviderProps {
    children: ReactNode
}

// Provider for authentication
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    // State for logged in user (null if no one is logged in)
    const [user, setUser] = useState<User | null>(null);

    // Login function that fetches login route from api
    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) throw new Error("Inloggning misslyckades.");

            const data = await response.json() as AuthRes;

            // Save JWT-token to localStorage
            localStorage.setItem("token", data.token);

            // Update state with user data
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    // Logout function that removes token from localStorage
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use AuthContext in components
export const useAuth = (): AuthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste kopplas till en AuthProvider")
    }

    return context;
}