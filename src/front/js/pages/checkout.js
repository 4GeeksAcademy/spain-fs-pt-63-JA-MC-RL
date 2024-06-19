import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const Checkout = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Obtener el producto seleccionado desde localStorage (simulando la navegación desde cart.js)
        const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (storedProduct) {
            setSelectedProduct(storedProduct);
        }
    }, []);

    return (
        <div className="checkout-view">
            <h1>Checkout</h1>
            {selectedProduct ? (
                <div className="selected-product">
                    <img src={selectedProduct.image_urls[selectedProduct.color]} alt={selectedProduct.name} />
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>Precio: ${selectedProduct.price}</p>
                    <p>Talla: {selectedProduct.size}</p>
                    <p>Color: {selectedProduct.color}</p>
                    <p>Cantidad: {selectedProduct.quantity}</p>
                    <p>Stock: {selectedProduct.stock}</p>
                    {/* Aquí podrías añadir más detalles del producto, como cantidad, opciones de personalización, etc. */}
                    <Link to="/payment">
                        <button className="pay-button">Pagar</button>
                    </Link>
                </div>
            ) : (
                <p>No hay productos seleccionados en el carrito.</p>
            )}
        </div>
    );
};

export default Checkout;