import React from "react";
import { Link, useNavigate } from "react-router-dom";
import creatutee2 from "../../img/creatutee2.jpg";
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
    <nav className="navbar navbar-expand-lg navbar-light w-100 fixed-top">
      <div className="container w-100">
        <div className="navbar-left ms-5">
          <Link to="/" className="navbar-brand">
            <img src={creatutee2} alt="CreaTuTee" className="navbar-logo" />
            <span className="navbar-title">CreaTuTee</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto navbar-center">
            <li className="nav-item cuadro">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <a href="./desing" className="nav-link">DiseñaTuTee</a>
            </li>
            <li className="nav-item">
            <Link to="/" className="nav-link">Como funciona</Link>
            </li>
            <li className="nav-item">
            <Link to="/" className="nav-link">EcoFriendly</Link>
            </li>
            <li className="nav-item">
            <Link to="/" className="nav-link">Acerca de nosotros</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto navbar-right">
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <i className="fas fa-user"></i> Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">
                    <i className="fas fa-shopping-cart"></i> Carrito
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">
                    Cerrar sesion
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn- nav-link">
                    <i className="fas fa-sign-in-alt"></i> Iniciar sesion
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-nav-link">
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline carrito-button mt-1 ms-2">
                    <FaShoppingCart size={25} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};