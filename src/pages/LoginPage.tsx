import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
    // States for user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        // Login form and container
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Login</h1>
                <form className="login-form">
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
    );
};

export default LoginPage;