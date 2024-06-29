import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "./../../styles/register.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        // Validar que el valor ingresado solo contenga números
        if (/^\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    const validateForm = () => {
        // Validar correo electrónico
        if (!email.includes('@')) {
            alert('Ingrese un correo electrónico válido.');
            return false;
        }

        // Validar contraseña (mínimo 8 caracteres y al menos una mayúscula)
        if (password.length < 8 || !/[A-Z]/.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula.');
            return false;
        }

        // Puedes agregar más validaciones aquí según sea necesario

        return true; // Si todos los campos son válidos
    };

    const handleRegister = async () => {
        // Validar requisitos mínimos antes de enviar el registro
        if (!validateForm()) {
            return;
        }

        try {
            const registrationSuccess = await actions.register({
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                city,
                country,
                postalCode,
                address1,
                address2
            });

            // Si el registro es exitoso, redirige a la ruta "home"
            if (registrationSuccess) {
                navigate('/');
            } else {
                console.log("Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="register-container">
            <h1>Registro</h1>
            <div className="input-group">
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
            </div>
            <div className="input-group">
                <input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Apellido"
                    required
                />
            </div>
            <div className="input-group">
                <input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Teléfono"
                    type="tel"
                    required
                />
                <input
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ciudad"
                    required
                />
            </div>
            <div className="input-group">
                <input
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="País"
                    required
                />
                <input
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Código postal"
                    required
                />
            </div>
            <div className="input-group">
                <input
                    name="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Dirección 1"
                    required
                />
                <input
                    name="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Dirección 2"
                />
            </div>
            <button className="register-button" onClick={handleRegister}>Registrarse</button>
        </div>
    );
};

export default Register;
