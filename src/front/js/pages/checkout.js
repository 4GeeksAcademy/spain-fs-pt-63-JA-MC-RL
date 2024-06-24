import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../../styles/cart.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Estado para el precio total
  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setCartItems([JSON.parse(storedProduct)]);
      calculateTotalPrice(JSON.parse(storedProduct)); // Calcular el precio total basado en la talla
    }
  }, []);

  const calculateTotalPrice = (product) => {
    if (product && product.size && product.quantity) {
      const sizePrice = parseFloat(product.sizes[product.size].price); // Obtener el precio de la talla seleccionada
      const total = (sizePrice * product.quantity).toFixed(2);
      setTotalPrice(total);
    }
  };

  const handleConfirmPurchase = () => {
    // Lógica para confirmar la compra (puedes implementar lógica adicional aquí)
    // Aquí puedes realizar acciones adicionales antes de navegar a la página de confirmación
    localStorage.removeItem('selectedProduct'); // Eliminar el producto del localStorage después de la compra
    navigate('/confirmation'); // Navegar a la página de confirmación o a donde necesites
  };

  return (
    <div className="checkout-view">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div className="checkout-list">
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image_urls[item.color]} alt={item.name} className="checkout-item-image" />
              {item.customImage && (
                <img src={item.customImage} alt="Custom Design" className="checkout-custom-image" />
              )}
              <div className="checkout-item-details">
                <h2>{item.name}</h2>
                <p>Color: {item.color}</p>
                <p>Talla: {item.size}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="checkout-total">
        <h3>Total a Pagar: ${totalPrice}</h3>
        <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
      </div>
    </div>
  );
};

export default Checkout;
