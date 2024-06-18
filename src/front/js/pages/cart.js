import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom"; // Importa useNavigate para navegación programática
import "./cart.css";

const Cart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook para navegar programáticamente

    // Estados para manejar los campos del formulario
    const [userId, setUserId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [designId, setDesignId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos a enviar
        const data = {
            user_id: parseInt(userId),
            order_id: parseInt(orderId),
            product_id: parseInt(productId),
            design_id: parseInt(designId),
            quantity: parseInt(quantity),
            price: parseFloat(price),
        };

        // Llamada a la acción para crear el order item
        const success = await actions.createOrderItem(data);

        if (success) {
            setMessage("Order item created successfully!");
            // Redirige a la página de Checkout después de crear el item del pedido
            navigate("/checkout");
        } else {
            setMessage("Failed to create order item.");
        }
    };

    return (
        <div className="cart-form">
            <h2>Cart</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="user_id">User ID</label>
                    <input
                        type="number"
                        id="user_id"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="order_id">Order ID</label>
                    <input
                        type="number"
                        id="order_id"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        type="number"
                        id="product_id"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="design_id">Design ID</label>
                    <input
                        type="number"
                        id="design_id"
                        value={designId}
                        onChange={(e) => setDesignId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                <button type="submit">Create Order Item</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Cart;