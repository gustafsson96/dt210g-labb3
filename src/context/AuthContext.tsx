import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { User, LoginCredentials, AuthRes, AuthContext } from '../interfaces/Auth';

const api = "http://localhost:3000";

// Create context
const AuthContext = createContext<AuthContext | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Contect-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) throw new Error("Inloggning misslyckades.");

            const data = await response.json() as AuthRes;

            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
}
