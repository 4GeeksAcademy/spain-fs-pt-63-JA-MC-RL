import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Estado para el precio total
  const navigate = useNavigate();

  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setCartItems([JSON.parse(storedProduct)]);
      calculateTotalPrice(storedProduct); // Calcular el precio total basado en la talla
    }
  }, []);

  const calculateTotalPrice = (product) => {
    if (product && product.size && product.quantity) {
        const sizePrice = parseFloat(product.sizes[product.size].price); // Obtener el precio de la talla seleccionada
        const total = (sizePrice * product.quantity).toFixed(2);
        setTotalPrice(total);
    }
};

  const handleCheckout = () => {
    // Lógica para realizar la compra
    navigate('/checkout');
  };

  return (
    <div className="cart-view">
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image_urls[item.color]} alt={item.name} className="cart-item-image" />
              {item.customImage && (
                <img src={item.customImage} alt="Custom Design" className="cart-custom-image" />
              )}
              <div className="cart-item-details">
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
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Realizar Compra</button>
      )}
    </div>
  );
};

export default Cart;