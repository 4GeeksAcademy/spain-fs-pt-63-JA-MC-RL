import React from "react";
import './../../styles/modal.css';


const Modal = ({ show, handleClose }) => {
    return (
        <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <strong><h5 className="modal-title">Terminos y condiciones</h5></strong>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>
                            <strong>1.

                                Bienvenido a "CreaTuTee".</strong> Al acceder y utilizar nuestro sitio web y servicios, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios.
                            <strong> 2. Productos:</strong>

                            Vendemos camisetas de diseño exclusivo, creadas con materiales de alta calidad. Las imágenes de los productos en nuestro sitio web son representaciones precisas, pero los colores pueden variar ligeramente debido a la configuración de pantalla.
                            . Pedidos y Pagos <strong> 3

                                Pedidos:</strong> Todos los pedidos están sujetos a disponibilidad. Nos reservamos el derecho de rechazar cualquier pedido por cualquier motivo.
                            Pagos: Aceptamos pagos a través de tarjetas de crédito, PayPal y otras plataformas de pago seguras.

                            <strong>4. Envíos:</strong>

                            Zonas de Envío: Realizamos envíos a nivel mundial. Los costos y tiempos de envío varían según la ubicación.
                            Tiempos de Entrega: Los tiempos de entrega son estimados y pueden variar.

                            <strong> 5. Devoluciones y Reembolsos:</strong>

                            Política de Devolución: Si no estás satisfecho con tu compra, puedes devolverla dentro de los 30 días posteriores a la recepción.


                            <strong> 6. Contacto:</strong>

                            Si tienes preguntas o inquietudes sobre estos términos y condiciones, por favor contacta a nuestro servicio al cliente en <strong>creatutee.com</strong> o <strong>+055 555 55 55</strong></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>

                    </div>
                </div>
            </div>
        </div>


    );
};



export default Modal