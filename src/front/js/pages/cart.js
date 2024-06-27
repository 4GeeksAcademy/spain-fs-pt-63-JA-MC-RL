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
      const product = JSON.parse(storedProduct);
      setCartItems([product]);
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

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = parseInt(newQuantity, 10);
    setCartItems(updatedCartItems);
    localStorage.setItem('selectedProduct', JSON.stringify(updatedCartItems[0]));
    calculateTotalPrice(updatedCartItems);
  };

  const handleColorChange = (index, newColor) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].color = newColor;
    setCartItems(updatedCartItems);
    localStorage.setItem('selectedProduct', JSON.stringify(updatedCartItems[0]));
  };

  const handleSizeChange = (index, newSize) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].size = newSize;
    setCartItems(updatedCartItems);
    localStorage.setItem('selectedProduct', JSON.stringify(updatedCartItems[0]));
    calculateTotalPrice(updatedCartItems);
  };

  const handleCheckout = () => {
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

                {/* Formulario para editar la cantidad */}
                <div className="cart-edit">
                  <label htmlFor={`quantity-${index}`}>Cantidad:</label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </div>

                {/* Formulario para editar el color */}
                <div className="cart-edit">
                  <label htmlFor={`color-${index}`}>Color:</label>
                  <select
                    id={`color-${index}`}
                    value={item.color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  >
                    {Object.keys(item.image_urls).map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Formulario para editar la talla */}
                <div className="cart-edit">
                  <label htmlFor={`size-${index}`}>Talla:</label>
                  <select
                    id={`size-${index}`}
                    value={item.size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                  >
                    {Object.keys(item.sizes).map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <p>Precio: ${item.sizes[item.size].price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="total-price">
            Precio Total: ${totalPrice}
          </div>
          <button onClick={handleCheckout} className="checkout-button">Realizar Compra</button>
        </>
      )}
    </div>
  );
};

export default Cart;
