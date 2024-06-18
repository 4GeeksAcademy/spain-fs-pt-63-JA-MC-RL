import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-3">
            <div className="jumbotron bg-secondary text-white d-flex align-items-center" style={{height: '300px'}}>
                <div className="container">
                    <h1 className="display-4">VIDEO</h1>
                </div>
            </div>

            <div id="first_heading" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                This First Heading &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary"> Will Catch Your Eyes.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">El Piloto automático permite que su coche se conduzca, acelere y frene
                                automáticamente
                                dentro de su carril bajo su supervisión activa, asistiendo en las partes más aburridas de la conducción.
                                Con las actualizaciones de software inalámbricas, las últimas mejoras están disponibles al instante.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://www.experimenta.es/wp-content/uploads/2018/10/tesla-logo.jpg"
                             className="rounded-circle imagenredonda img-responsive" alt="Tesla Logo"/>
                    </div>
                </div>
            </div>

            <div id="services" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://images1.autocasion.com/actualidad/wp-content/uploads/2017/03/Qu%C3%A9-significa-el-logo-de-Tesla.jpg"
                             className="rounded-circle imagenredonda img-responsive" alt="Tesla Logo"/>
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                This Second Heading &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary">Is pretty cool too.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">El Model 3 se beneficia de las mismas características que hacen que
                                nuestros vehículos sean tan seguros: faldones laterales que absorben la energía, un paquete de
                                baterías
                                reforzado instalado en la parte baja del vehículo para reducir el riesgo de vuelco y una
                                estructura de
                                carrocería de metal que puede soportar un peso mucho mayor que el del propio coche.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="first_heading" className="container-fluid bg-white">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12 col-lg-8">
                        <div className="ps-5 pt-5 pe-5 mb-0 d-flex">
                            <p className="fs-2 fw-medium mb-1">
                                This First Heading &nbsp;
                            </p>
                            <p className="mb-1 fs-2 fw-medium text-body-tertiary"> Will Catch Your Eyes.</p>
                        </div>
                        <div className="ps-5 pe-5 mt-0">
                            <p className="fw-light">El Piloto automático permite que su coche se conduzca, acelere y frene
                                automáticamente
                                dentro de su carril bajo su supervisión activa, asistiendo en las partes más aburridas de la conducción.
                                Con las actualizaciones de software inalámbricas, las últimas mejoras están disponibles al instante.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 p-4 text-center">
                        <img src="https://www.experimenta.es/wp-content/uploads/2018/10/tesla-logo.jpg"
                             className="rounded-circle imagenredonda img-responsive" alt="Tesla Logo"/>
                    </div>
                </div>
            </div>

            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <p>
                This boilerplate comes with lots of documentation:{" "}
                <a href="https://start.4geeksacademy.com/starters/react-flask">Read more</a>
            </p>
        </div>
    );
};
