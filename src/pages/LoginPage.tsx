import { useState, useEffect, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "./LoginPage.css";

const LoginPage = () => {
    // States for user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

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

        // Reset errors
        setUsernameError("");
        setPasswordError("");
        setGeneralError("");

        let hasError = false;

        // Feedback username
        if (!username.trim()) {
            setUsernameError("Username is required");
            hasError = true;
        }

        // Feedback password
        if (!password.trim()) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (hasError) return;

        // Login and navigate to admin page
        try {
            setLoading(true);
            await login({ username, password });
            navigate("/admin");
            // General feedback
        } catch {
            setGeneralError("Incorrect username or password.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />
            <main className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Login</h1>
                    {generalError && (
                        <p className="error-message">{generalError}</p>
                    )}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError("");
                                }}
                                placeholder="Enter username"
                            />
                            {usernameError && (
                                <span className="error-message">{usernameError}</span>
                            )}

                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                placeholder="Enter password"
                            />
                            {passwordError && (
                                <span className="error-message">{passwordError}</span>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className="login-button">
                            {loading ? (
                                <PulseLoader size={8} color="#ffffff" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LoginPage;