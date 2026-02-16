import { useState, useEffect, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./LoginPage.css";

const LoginPage = () => {
    // States for user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Control user
    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [user]);

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await login({ username, password });
            navigate("/admin");

        } catch (error) {
            setError("Login failed.")
        }
    }

    return (
        <>
        <Navbar />
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Login</h1>
                    {error && <p className="error">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;