import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CreaTuTeeLogo from "../../img/creatutee.jpg";
import './../../styles/navbar.css';
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light w-100">
      <div className="container w-100">

        <div className="navbar-left ms-5">
          <Link to="/" className="navbar-brand">
            <img src={CreaTuTeeLogo} alt="CreaTuTee" className="navbar-logo" />
            <span className="navbar-title">CreaTuTee</span>
          </Link>
        </div>


        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto navbar-center">
            <button className="btn btn-success nav-link">
              <Link to="/home" className="nav-link">Inicio</Link>
            </button>
            <button className="nav-item btn btn-outline-success">
              <a href="./desing" className="nav-link">DiseñaTuTee</a>
            </button>
            <li className="nav-item btn btn-outline-success">
              <a href="#how-it-works" className="nav-link">Cómo funciona</a>
            </li>
            <li className="nav-item btn btn-outline-success">
              <a href="#eco-friendly" className="nav-link">EcoFriendly</a>
            </li>
            <li className="nav-item btn btn-outline-success">
              <a href="#about-us" className="nav-link">Acerca de nosotros</a>
            </li>
          </ul>


          <ul className="navbar-nav ml-auto navbar-right">
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <i className="fas fa-user"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-success nav-link">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-success nav-link">
                    Register
                  </Link>


                </li>
                <p className="pago mt-3 ms-2">
                  <FaShoppingCart size={30} />
                </p>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};