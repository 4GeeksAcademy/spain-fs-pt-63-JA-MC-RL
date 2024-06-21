import React from "react";
import { Link } from "react-router-dom";
import creatutee from "./../../img/creatutee.jpg";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid bg-ligth ms-4">
        <a className="navbar-brand" href="#">
          <img src="creatutee.jpg" alt="CreaTuTee" width="75" height="75"/>
          <span className="ms-3 text-dark fw-bold">CreaTuTee</span>


        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
  <ul className="navbar-nav mb-2 mb-lg-0">
    <li className="nav-item me-4">
      <a className="nav-link active text-dark" aria-current="page" href="#">Desing your shirt</a>
    </li>
    <li className="nav-item me-4">
      <a className="nav-link active text-dark" aria-current="page" href="#">How it Works</a>
    </li>
    <li className="nav-item me-4">
      <a className="nav-link active text-dark" aria-current="page" href="#">ECO Friendly</a>
    </li>
    <li className="nav-item me-4">
      <a className="nav-link text-dark" href="#">About us</a>
    </li>
    <li className="nav-item dropdown me-3">
      {/* Dropdown items here */}
    </li>
    <li className="nav-item">
      {/* Other items here */}
    </li>
  </ul>
</div>

		<form className="d-flex" role="search">
        
        <button className="btn btn-outline-success" type="submit">Login</button>
      </form>
      </div>
    </nav>
  );
};