import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import carrusel from "./../../img/carrusel.jpg";
import carrusel2 from "../../img/carrusel2.0.jpg";
import carrusel3 from "../../img/carrusel3.jpg";
import creatutee from "./../../img/creatutee.jpg";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaUps } from "react-icons/fa";
import { FaDhl } from "react-icons/fa";
import { FaFedex } from "react-icons/fa";


export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-3">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carrusel} className="d-block w-100" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src={carrusel2} className="d-block w-100" alt="Second slide" />
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

            <div id="services" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/011/059/397/non_2x/team-work-text-button-speech-bubble-team-work-colorful-web-banner-illustration-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="Tesla Logo" />
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                TEAM WORK &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary">Es genial.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">"Un grupo se convierte en un equipo cuando cada miembro está lo suficientemente seguro de sí mismo y de su contribución como para alabar las habilidades de los demás"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line-separator"></div>

            <div id="first_heading" className="container bg-light-gray">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                ECO friendly &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary">100% Cuida tu planeta.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">" En un mundo donde la moda cambia constantemente, es importante recordar el impacto que nuestras decisiones tienen en el medio ambiente. Optar por materiales sostenibles, como el algodón orgánico o el poliéster reciclado,"
                            </p>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/002/694/750/non_2x/eco-friendly-seal-stamp-free-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="Eco Friendly" />
                    </div>
                </div>
            </div>

            <div className="line-separator"></div>

            <div id="services" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/007/933/018/non_2x/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg" className="rounded-circle imagenredonda img-responsive" alt="About Us" />
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                About us &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary">Esfuerzo y creacion.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">Nos comprometemos a aportar ideas originales y enfoques creativos en el diseño de nuestras camisetas. Queremos que cada camiseta refleje nuestra pasión y dedicación."Estamos emocionados de embarcarnos en este viaje juntos y confiamos en que, con nuestro esfuerzo combinado, lograremos grandes cosas. Gracias a todos por su dedicación y compromiso."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="line-separator"></div>

            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="container-fluid bg-white">
                            Payment methods
                            <p className="pago">
                            <FaCcMastercard />
                            </p>
                            <p className="pago">
                            <FaCcVisa />
                            </p>
                            <p className="pago">
                            <FaCcPaypal />
                            </p>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="container-fluid bg-white">
                            Our GuaranTee
                            ¿No te gusta cómo te queda?
                            Puedes devolverlo en 30 días...


                        </div>
                    </div>
                    <div className="col-4">
                        <div className="container-fluid bg-white">
                            Shipping Worldwide
                            <p className="pago">
                            <FaUps />
                            </p>
                            <p className="pago">
                            <FaDhl />
                            </p>
                            <p className="pago">
                            <FaFedex />
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            <div className="line-separator"></div>

            <div className="container-fluid bg-ligth">
                <div className="row">
                    <div className="col-3">
                        <img src="creatutee.jpg" alt="CreaTuTee" width="200" height="200" />
                    </div>
                    <div className="col-3">
                        <h1>Customer support</h1>
                        <ul>
                            <li>Need help?</li>
                            <li>Contac us</li>
                            <li>+0 55 555 5555</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h1>Company</h1>
                        <ul>
                            <li>How it Works</li>
                            <li>ECO friendly</li>
                            <li>About Us</li>
                            <li>Terms and Conditions</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h1>Follow us</h1>
                        <ul>
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Pinterest</li>
                            <li>YouTube</li>
                        </ul>
                        <div />

                    </div>

                </div>

            </div>
        </div>
    );
};



