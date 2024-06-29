import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "./../../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const isAuthenticated = await actions.login({ email, password });
            
            if (isAuthenticated) {
                navigate('/'); // Redirige a la página principal o a la ruta deseada después del login
            } else {
                console.log("Login failed"); // Manejar caso de login fallido si es necesario
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form">
    <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="login-input"
    />
    <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="login-input"
    />
    <button type="button" onClick={handleLogin} className="login-button">Entrar</button>
</form>

            <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;