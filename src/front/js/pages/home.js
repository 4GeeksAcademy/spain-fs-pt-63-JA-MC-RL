import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "./home.css"

export const Home = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirige al login si no hay token
        }
    }, [navigate]);

    return (
        <div className="home-container">
            {/* Sección de Video de YouTube */}
            <section className="section video-section">
                <div className="video-wrapper">
                    <iframe
                        width="100%"
                        height="100%"  // Ajustar altura y ancho al 100%
                        src="https://www.youtube.com/embed/B5ElvV5cyFg"
                        title="VIDEO PROMOCIONAL MARCA DE ROPA BADAYS"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* Sección de Cómo Funciona */}
            <section className="section how-it-works-section">
                <div className="text-center">
                    <h2>Cómo Funciona</h2>
                    <h2>¿Cómo funciona?</h2>
                <p>En CreaTuTee, diseñar tu propia camiseta es fácil y divertido. Sigue estos simples pasos:</p>
                <ol>
                    <li>Elige tu estilo y color favorito de camiseta.</li>
                    <li>Sube tus propios diseños o usa nuestras plantillas.</li>
                    <li>Personaliza el texto y los gráficos a tu gusto.</li>
                    <li>Revisa tu diseño y haz el pedido. ¡Listo!</li>
                </ol>
                <p>Te enviaremos tu camiseta personalizada directamente a tu puerta.</p>
                </div>
            </section>

            {/* Sección de Acerca de Nosotros */}
            <section className="section about-us-section">
                <div className="text-center">
                    <h2>Acerca de Nosotros</h2>
                    <p>
                        Breve descripción sobre tu empresa o proyecto.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </section>
        </div>
    );
};


