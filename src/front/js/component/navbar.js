import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.replace('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">React Boilerplate</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {token ? (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/login" className="btn btn-primary nav-link">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

