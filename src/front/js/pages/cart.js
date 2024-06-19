import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './../../styles/cart.css'; // Ajusta la ruta según la ubicación real de cart.css

const Cart = () => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Obtener el producto seleccionado desde localStorage (simulando la navegación desde Design.js)
        const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (storedProduct) {
            setSelectedProduct(storedProduct);
            setSelectedColor(storedProduct.color);
            setSelectedSize(storedProduct.size);
            setQuantity(storedProduct.quantity);
        }
    }, []); // Vacío para que se ejecute solo una vez al montar el componente

    // Función para actualizar la cantidad del producto
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };

    // Función para actualizar el color seleccionado del producto
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    // Función para actualizar la talla seleccionada del producto
    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    // Función para guardar los cambios realizados en el producto
    const updateProduct = () => {
        const updatedProduct = {
            ...selectedProduct,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize
        };

        localStorage.setItem('selectedProduct', JSON.stringify(updatedProduct));
        alert('Producto actualizado correctamente.');
        setSelectedProduct(updatedProduct); // Actualizar estado local también si es necesario
    };

    return (
        <div className="cart-view">
            <h1>Carrito de Compras</h1>
            {selectedProduct ? (
                <div className="selected-product">
                    <img src={selectedProduct.image_urls[selectedColor]} alt={selectedProduct.name} />
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>Precio: ${selectedProduct.price}</p>

                    {/* Selector de cantidad */}
                    <label htmlFor="quantity">Cantidad:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />

                    {/* Selector de color */}
                    <label htmlFor="color">Color:</label>
                    <select id="color" name="color" value={selectedColor} onChange={handleColorChange}>
                        <option value="GREEN">Verde</option>
                        <option value="BLUE">Azul</option>
                        <option value="RED">Rojo</option>
                    </select>

                    {/* Selector de talla */}
                    <label htmlFor="size">Talla:</label>
                    <select id="size" name="size" value={selectedSize} onChange={handleSizeChange}>
                        <option value="SMALL">S</option>
                        <option value="MEDIUM">M</option>
                        <option value="LARGE">L</option>
                    </select>

                    {/* Botón para actualizar el producto */}
                    <button className="update-button" onClick={updateProduct}>
                        Actualizar Producto
                    </button>
                </div>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}

            {/* Botón para ir a Checkout */}
            {selectedProduct && (
                <Link to="/checkout">
                    <button className="checkout-button">Ir a Checkout</button>
                </Link>
            )}
        </div>
    );
};

export default Cart;
