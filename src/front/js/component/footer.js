// Footer.js

// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css"

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                {/* Información de Contacto */}
                <div className="footer-section">
                    <h2>Contacto</h2>
                    <p>Dirección: Calle Ejemplo 123, Ciudad, País</p>
                    <p>Teléfono: +123 456 7890</p>
                    <p>Email: <a href="mailto:soporte@camisetaspersonalizadas.com">soporte@camisetaspersonalizadas.com</a></p>
                </div>

                {/* Enlaces Rápidos */}
                <div className="footer-section">
                    <h2>Enlaces Rápidos</h2>
                    <ul>
                        <li><Link to="/design">Diseña tu Camiseta</Link></li>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/profile">Perfil</Link></li>
                        <li><Link to="/inspiration">Inspiración de Diseños</Link></li>
                        <li><Link to="/help">Ayuda</Link></li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="footer-section">
                    <h2>Redes Sociales</h2>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>

                {/* Suscripción al Boletín */}
                <div className="footer-section">
                    <h2>Suscríbete a nuestro Boletín</h2>
                    <form action="/subscribe" method="post">
                        <input type="email" name="email" placeholder="Tu email" required />
                        <button type="submit">Suscribirse</button>
                    </form>
                </div>

                {/* Información de la Empresa */}
                <div className="footer-section">
                    <h2>Sobre Nosotros</h2>
                    <p>En Camisetas Personalizadas, creemos en la creatividad y la individualidad. Ofrecemos herramientas fáciles de usar para que puedas diseñar tu camiseta perfecta.</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Camisetas Personalizadas. Todos los derechos reservados.</p>
                <p>Desarrollado por TuEquipo</p>
                <div className="footer-links">
                    <Link to="/terms">Términos y Condiciones</Link>
                    <Link to="/privacy">Política de Privacidad</Link>
                    <Link to="/returns">Política de Devoluciones</Link>
                </div>
            </div>
        </footer>
    );
};

