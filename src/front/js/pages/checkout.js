import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../styles/checkout.css'; // Asegúrate de importar los estilos adecuadamente

const Checkout = () => {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // Estado para el precio total
    const navigate = useNavigate();

    useEffect(() => {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
            const product = JSON.parse(storedProduct);
            setCheckoutItems([product]);
            calculateTotalPrice([product]); // Calcular el precio total basado en la talla y cantidad
        }
    }, []);

    const calculateTotalPrice = (products) => {
        let total = 0;
        products.forEach(product => {
            if (product && product.size && product.quantity) {
                const sizePrice = parseFloat(product.sizes[product.size].price); // Obtener el precio de la talla seleccionada
                total += sizePrice * product.quantity; // Sumar al total el precio multiplicado por la cantidad
            }
        });
        setTotalPrice(total.toFixed(2));
    };

    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert('Pago completado por ' + details.payer.name.given_name);
            // Lógica adicional después del pago
            localStorage.removeItem('selectedProduct'); // Eliminar el producto del localStorage después de la compra
            navigate('/confirmation'); // Navegar a la página de confirmación o a donde necesites
        });
    };

    const handleCheckoutCancel = (data) => {
        console.log('Pago cancelado:', data);
        // Manejar cancelación del pago si es necesario
    };

    const handleCheckout = () => {
        navigate('/checkout'); // Navegar a la página de checkout
    };

    return (
        <div className="checkout-view">
            <h1>Checkout</h1>
            {checkoutItems.length === 0 ? (
                <p>No hay productos en el carrito</p>
            ) : (
                <div className="checkout-list">
                    {checkoutItems.map((item, index) => (
                        <div key={index} className="checkout-item">
                            <div className="checkout-item-image-wrapper">
                                <img src={item.image_urls[item.color]} alt={item.name} className="checkout-item-image" />
                                {item.customImage && (
                                    <img src={item.customImage} alt="Custom Design" className="checkout-custom-image" />
                                )}
                            </div>
                            <div className="checkout-item-details">
                                <h2>{item.name}</h2>
                                <p>Color: {item.color}</p>
                                <p>Talla: {item.size}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Precio: ${item.sizes[item.size].price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {checkoutItems.length > 0 && (
                <>
                    <div className="checkout-total">
                        <h3>Total a Pagar: ${totalPrice}</h3>
                        <button onClick={handleCheckout}>Comprar</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
