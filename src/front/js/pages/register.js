import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "./register.css"

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleRegister = async () => {
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
            navigate('/home'); // Reemplaza "/home" con la ruta adecuada en tu aplicación
        } else {
            // Manejar el error, mostrar mensaje, etc.
            console.log("Registration failed");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <input 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required
            />
            <input 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required
            />
            <input 
                name="firstName" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="First Name" 
                required
            />
            <input 
                name="lastName" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Last Name" 
                required
            />
            <input 
                name="phoneNumber" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                placeholder="Phone Number" 
                required
            />
            <input 
                name="city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="City" 
                required
            />
            <input 
                name="country" 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
                placeholder="Country" 
                required
            />
            <input 
                name="postalCode" 
                value={postalCode} 
                onChange={(e) => setPostalCode(e.target.value)} 
                placeholder="Postal Code" 
                required
            />
            <input 
                name="address1" 
                value={address1} 
                onChange={(e) => setAddress1(e.target.value)} 
                placeholder="Address 1" 
                required
            />
            <input 
                name="address2" 
                value={address2} 
                onChange={(e) => setAddress2(e.target.value)} 
                placeholder="Address 2" 
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;