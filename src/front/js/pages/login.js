import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const isAuthenticated = await actions.login({ email: email, password: password });

        // Si la autenticación es exitosa, redirige a la ruta "home"
        if (isAuthenticated) {
            navigate('/home'); // Reemplaza "/home" con la ruta adecuada en tu aplicación
        } else {
            // Manejar el error, mostrar mensaje, etc.
            console.log("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;