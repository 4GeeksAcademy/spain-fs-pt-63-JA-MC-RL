import React from "react";


const Modal = ({ show, handleClose }) => {
    return (
        <div className={`modal ${show ? "show" : ""}`} tabIndex="-1" style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white bg-black">
                        <strong><h4 className="modal-title">Terminos y condiciones</h4></strong>
                        <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body bg-secondary text-white">
                        <p>
                            <strong>1.</strong>

                            Bienvenido a <strong>"CreaTuTee".</strong> Al acceder y utilizar nuestro sitio web y servicios, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios.
                            <strong> 2. Productos:</strong>
                            Vendemos camisetas de diseño exclusivo, creadas con materiales de alta calidad. Las imágenes de los productos en nuestro sitio web son representaciones precisas, pero los colores pueden variar ligeramente debido a la configuración de pantalla.
                            . Pedidos y Pagos <strong> 3
                                Pedidos:</strong> Todos los pedidos están sujetos a disponibilidad. Nos reservamos el derecho de rechazar cualquier pedido por cualquier motivo.
                            Pagos: Aceptamos pagos a través de tarjetas de crédito, PayPal y otras plataformas de pago seguras.


                            <strong>4. Envíos:</strong>

                            Zonas de Envío: Realizamos envíos a nivel mundial. Los costos y tiempos de envío varían según la ubicación.
                            Tiempos de Entrega: Los tiempos de entrega son estimados y pueden variar.
                            <strong> 5. Devoluciones y Reembolsos:</strong>

                            Política de Devolución: Si no estás satisfecho con tu compra, puedes devolverla dentro de los 30 días posteriores a la recepción. Los artículos deben estar en su estado original, sin usar y con todas las etiquetas adjuntas.
                            <strong> 6. Propiedad Intelectual:</strong>

                            Todos los diseños, imágenes, textos y otros contenidos del sitio web son propiedad de <strong>CreaTuTee</strong> o de sus respectivos propietarios.

                            <strong> 7. Contacto:</strong>

                            Si tienes preguntas o inquietudes sobre estos términos y condiciones, por favor contacta a nuestro servicio al cliente en <strong>creatutee.com</strong> o <strong>+055 555 55 55</strong></p>
                    </div>
                    <div className="modal-footer bg-black">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>

                    </div>
                </div>
            </div>
        </div>


    );
};



export default Modal