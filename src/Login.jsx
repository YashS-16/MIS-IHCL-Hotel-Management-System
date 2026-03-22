import './Styles/login.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {

        // Basic validation
        if (!username || !email || !password || !role) {
            setError("Please fill all fields");
            return;
        }

        if (!email.includes("@")) {
            setError("Enter valid email");
            return;
        }

        // Security Code Logic
        if (role === "admin" && securityCode !== "1234") {
            setError("Invalid Admin Security Code");
            return;
        }

        if (role === "reception" && securityCode !== "5678") {
            setError("Invalid Reception Security Code");
            return;
        }

        setError("");

        // Save user data
        localStorage.setItem("role", role);
        localStorage.setItem("user", username);

        navigate("/");
    };

    return (
        <div className="login-container">
            <div className="Login-Card">
                <h2>TAJ Login</h2>
                <p className="subtitle">Welcome to Taj Management System</p>

                <div className="login-inputs">

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <select
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value);
                            setSecurityCode("");
                        }}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="reception">Reception</option>
                        <option value="customer">Customer</option>
                    </select>

                    {/* SHOW ONLY FOR ADMIN & RECEPTION */}
                    {(role === "admin" || role === "reception") && (
                        <input
                            type="password"
                            placeholder="Enter Security Code"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                        />
                    )}

                </div>

                {error && <p className="error-text">{error}</p>}

                <button
                    className="submit-btn"
                    onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;