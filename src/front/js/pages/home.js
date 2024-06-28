import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import carrusell from "./../../img/carrusell.jpg";
import carrusel2 from "../../img/carrusel2.0.jpg";
import carrusel3 from "../../img/carrusel3.jpg";
import creatutee2 from "./../../img/creatutee2.jpg";
import { FaCcMastercard, FaCcVisa, FaCcPaypal, FaUps, FaDhl, FaFedex } from "react-icons/fa";
import Modal from "../component/modal";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookSquare } from "react-icons/fa";

export const Home = () => {
    const { store, actions } = useContext(Context);

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="text-center">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carrusel2} className="d-block w-100" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src={carrusell} className="d-block w-100" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img src={carrusel3} className="d-block w-100" alt="Third slide" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div id="comofunciona" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://img.freepik.com/vector-gratis/ropa-sostenible-moda-lenta-composicion-isometrica-riel-prenda-rollos-tela-ilustracion-vectorial-costura-maquina-coser_1284-84863.jpg" className="rounded-circle imagenredonda img-responsive" alt="Como funciona" />
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex justify-content-center align-items-center">
                            <p className="mb-3 fs-1 fw-medium text-body-tertiary desplazado text-justify">Como funciona CreaTuTEE?</p>
                        </div>

                        <div className="ps-1 pe-5 mt-0">
                            <p className="fw-light text-center custom-paragraph text-justify">
                                "Bienvenido a <strong>CreaTuTEE</strong>, tu destino para crear camisetas personalizadas y únicas. Nuestro proceso es sencillo y está diseñado para que cualquier persona, desde diseñadores profesionales hasta aficionados, pueda crear camisetas de alta calidad con sus propios diseños. Usa nuestro intuitivo editor en línea para crear tu diseño. Puedes cargar tus propias imágenes, añadir texto con diversas tipografías y colores, y usar nuestras herramientas de diseño para ajustar todo a tu gusto. No necesitas ser un experto en diseño gráfico; nuestro editor es fácil de usar y ofrece muchas opciones de personalización."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="line-separator"></div>

            <div id="ecofriendly" className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex justify-content-center align-items-center">
                            <p className="mb-3 fs-1 fw-medium text-body-tertiary desplazado">100% Cuida tu planeta.</p>

                        </div>
                        <div className="ps-1 pe-5 mt-0">
                            <p className="fw-light text-center custom-paragraph">
                                "En un mundo donde la moda cambia constantemente, es importante recordar el impacto que nuestras decisiones tienen en el medio ambiente. Optar por materiales sostenibles, como el algodón orgánico o el poliéster reciclado. Es por eso que, en <strong>CreaTuTEE</strong>, creemos que cada camiseta cuenta una historia, y queremos ayudarte a contar la tuya mientras cuidamos de nuestro planeta. Únete a nuestra misión de moda responsable y haz una elección consciente sin sacrificar el estilo. ¡Empieza a diseñar hoy y sé parte del cambio!"
                            </p>
                        </div>

                    </div>
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/002/694/750/non_2x/eco-friendly-seal-stamp-free-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="Eco Friendly" />
                    </div>
                </div>
            </div>

            <div className="line-separator"></div>

            <div id="acercadenosotros" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/007/933/018/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="About Us" />
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex justify-content-center align-items-center">
                            <p className="mb-3 fs-1 fw-medium text-body-tertiary desplazado">Esfuerzo y creación.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light text-center custom-paragraph">
                                Nos comprometemos a aportar ideas originales y enfoques creativos en el diseño de nuestras camisetas. Queremos que cada camiseta refleje nuestra pasión y dedicación. "Estamos emocionados de embarcarnos en este viaje juntos y confiamos en que, con nuestro esfuerzo combinado, lograremos grandes cosas. Gracias a todos por su dedicación y compromiso.  Cada camiseta es fabricada con materiales de primera calidad, seleccionados cuidadosamente para garantizar comodidad y durabilidad.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="line-separator"></div>

            <div id="eco" className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex justify-content-center align-items-center">
                            <p className="mb-3 fs-1 fw-medium text-body-tertiary desplazado">Es genial.</p>

                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light text-center custom-paragraph">
                                "En <strong>CreaTuTEE</strong>, creemos que el poder de la unión transforma cada desafío en una oportunidad. Somos más que una empresa de camisetas; somos una familia que comparte una visión común y trabaja junta para hacer realidad nuestros sueños. Esta pasión es el motor que impulsa nuestro trabajo diario y nos motiva a superar nuestras propias expectativas."
                            </p>
                        </div>

                    </div>
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/011/059/397/non_2x/team-work-text-button-speech-bubble-team-work-colorful-web-banner-illustration-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="Eco Friendly" />
                    </div>
                </div>
            </div>


            <div className="line-separator"></div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4" style={{ borderRight: '2px solid #ccc' }}>
                        <div className="container-fluid">
                            <u><strong>Métodos de pago:</strong></u>
                            <div className="d-flex justify-content-center">
                                <p className="pago me-3 mt-2">
                                    <FaCcMastercard size={30} style={{ color: 'gray' }} />
                                </p>
                                <p className="pago me-3 mt-2">
                                    <FaCcVisa size={30} style={{ color: 'gray' }} />
                                </p>
                                <p className="pago mt-2">
                                    <FaCcPaypal size={30} style={{ color: 'gray' }} />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ borderRight: '2px solid #ccc' }}>
                        <div className="container-fluid">
                            <u><strong>Nuestra garantía:</strong></u>
                            <br style={{ marginBottom: '10px' }} />
                            ¿No te gusta cómo te queda? <br />
                            Puedes devolverlo en 30 días...
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="container-fluid">
                            <u><strong>Envío a nivel mundial:</strong></u>
                            <div className="d-flex justify-content-center">
                                <p className="pago me-3 mt-2">
                                    <FaUps size={30} style={{ color: 'gray' }} />
                                </p>
                                <p className="pago me-3 mt-2">
                                    <FaDhl size={35} style={{ color: 'gray' }} />
                                </p>
                                <p className="pago mt-2">
                                    <FaFedex size={30} style={{ color: 'gray' }} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                <span style={{ color: "blue" }}>www.creatutee.com</span>
            </p>
            <p className="pago me-3" style={{ marginBottom: '5px' }}>
                <FaCalendarAlt size={15} style={{ color: 'gray', marginRight: '5px' }} />
                <span style={{ color: "blue" }}>L-V: 09:00h-17:00h S:09:00h-15:00h</span>
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
        </div>
    );
};
