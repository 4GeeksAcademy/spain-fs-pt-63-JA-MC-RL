import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import './../../styles/footer.css';
import Modal from "../component/modal";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";
import creatutee2 from "./../../img/creatutee2.jpg";

export const Footer = () => {

    const { store, actions } = useContext(Context);

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return(
        <footer id="footer" className="footer-custom">
        <div className="line-separator1"></div>

        <div className="container-fluid logocrea">
            <div className="row">
                <div className="col-md-3 col-sm-6 mt-2">
                    <img src={creatutee2} alt="CreaTuTee" className="img-fluid small-img" />
                </div>

                <div className="col-md-3 col-sm-6 mt-3">
                    <u><strong><h4>Atención al cliente:</h4></strong></u>
                    <ul className="list-unstyled">

                        <li>Contáctanos:</li>
                        <div className="container">
                            <p className="pago me-3" style={{ marginBottom: '5px' }}>
                                <FaPhoneAlt size={15} style={{ color: 'gray', marginRight: '5px' }} />
                                <span style={{ color: "blue" }}>+0 55 555 55 55</span>
                            </p>
                            <p className="pago me-3" style={{ marginBottom: '5px' }}>
                                <MdEmail size={15} style={{ color: 'gray', marginRight: '5px' }} />
                                <span style={{ color: "blue" }}>contacto@creatutee.es</span>
                            </p>
                            <p className="pago me-3" style={{ marginBottom: '5px' }}>
                                <FaCalendarAlt size={15} style={{ color: 'gray', marginRight: '5px' }} />
                                <span style={{ color: "black" }}>L-V: 09:00h-17:00h S:09:00h-15:00h</span>
                            </p>
                        </div>
                    </ul>
                </div>
                <div className="col-md-3 col-sm-6 mt-3">
                    <u><strong><h4>Empresa:</h4></strong></u>
                    <ul className="list-unstyled">
                        <a href="#comofunciona" className="nav-link">Como funciona</a>
                        <a href="#ecofriendly" className="nav-link">EcoFriendly</a>
                        <a href="#acercadenosotros" className="nav-link">Acerca de nosotros</a>
                        <strong><li onClick={handleShow} style={{ cursor: "pointer", color: "gray" }}>Términos y Condiciones</li></strong>
                    </ul>
                </div>
                <div className="col-md-3 col-sm-6 mt-3">
                    <u><strong><h4>Síguenos:</h4></strong></u>
                    <ul className="list-unstyled">
                        <p className="pago me-3 mt-2">
                            <TiSocialTwitter size={27} style={{ color: 'gray' }} />
                        </p>
                        <p className="pago me-3 mt-2">
                            <TiSocialInstagram size={25} style={{ color: 'gray' }} />
                        </p>
                        <p className="pago me-3 mt-2">
                            <FaFacebookSquare size={23} style={{ color: 'gray' }} />
                        </p>
                    </ul>
                </div>
            </div>

        </div>
        <Modal show={showModal} handleClose={handleClose} />
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
                <p className="ms-3 me-3">Hecho con pasión por Jean Pool, Ricardo y Manuel © Primer proyecto colaborativo <strong>Crea Tu Tee</strong> 2024.</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-car-front-fill" viewBox="0 0 16 16">

                </svg>

            </div>
        </div>
    </footer>
    );
};