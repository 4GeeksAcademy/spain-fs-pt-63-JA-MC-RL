// Design.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../../styles/desing.css"
import { Logo } from "./../component/logos.js";

const Design = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState('GREEN'); // Estado para el color seleccionado
    const [selectedSize, setSelectedSize] = useState('MEDIUM'); // Estado para la talla seleccionada
    const [selectedQuantity, setSelectedQuantity] = useState(1); // Estado para la cantidad seleccionada
    const [selectedDescription, setSelectedDescription] = useState('fuerte astuto'); // Estado para la descripción seleccionada
    const [selectedPrice, setSelectedPrice] = useState('74.00'); // Estado para el precio seleccionado
    const navigate = useNavigate();

    useEffect(() => {
        // Simulando la carga de productos desde la API (en este caso, solo hay un producto)
        const initialProducts = [
            {
                id: 1,
                name: 'camiseta',
                price: '74.00',
                description: 'fuerte astuto',
                image_urls: {
                    GREEN: 'https://www.markamania.es/75317-medium_default/camiseta-roly-atomic-100-algodon-150-basica-promocional.jpg',
                    RED: 'https://www.ahorraentinta.es/6254-large_default/camiseta-100-algodon-jhk-color-155-gr-hombre.jpg', // Ejemplo de URL para camiseta roja
                    BLUE: 'https://naisa.es/11236-large_default/camiseta-basica-algodon-atomic-.jpg' // Ejemplo de URL para camiseta azul
                    // Añadir más URLs según los colores disponibles
                },
                descriptions: {
                    GREEN: 'green',
                    RED: 'red',
                    BLUE: 'blue'
                    // Añadir más descripciones según los colores disponibles
                },
                sizes: {
                    MEDIUM: {
                        price: '74.00',
                        stock: 20
                    },
                    LARGE: {
                        price: '76.00',
                        stock: 15
                    },
                    // Añadir más tamaños según los disponibles
                }
            }
        ];
        setProducts(initialProducts);
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedDescription(products[0].descriptions[color]);
        setSelectedPrice(products[0].sizes[selectedSize].price); // Actualizar precio al cambiar color
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setSelectedPrice(products[0].sizes[size].price); // Actualizar precio al cambiar talla
    };

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10);
        setSelectedQuantity(quantity);
    };

    const addToCart = () => {
        if (selectedProduct) {
            // Guardar el producto seleccionado en localStorage para usarlo en la vista de cart.js
            const productToAdd = {
                ...selectedProduct,
                color: selectedColor,
                size: selectedSize,
                quantity: selectedQuantity
            };
            localStorage.setItem('selectedProduct', JSON.stringify(productToAdd));
            navigate('/cart');
        }
    };

    return (
        <div className="design-view">
            <h1>Selecciona un Producto para el Diseño</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_urls[selectedColor]} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{selectedDescription}</p> {/* Mostrar la descripción del color seleccionado */}
                        <p>Precio: ${selectedPrice}</p> {/* Mostrar el precio actualizado */}
                        <p>
                            Talla:
                            <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                                {Object.keys(product.sizes).map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </p>
                        <p>
                            Color:
                            <button
                                className={`color-option ${selectedColor === 'GREEN' ? 'active' : ''}`}
                                onClick={() => handleColorChange('GREEN')}
                            >
                                Verde
                            </button>
                            <button
                                className={`color-option ${selectedColor === 'RED' ? 'active' : ''}`}
                                onClick={() => handleColorChange('RED')}
                            >
                                Rojo
                            </button>
                            <button
                                className={`color-option ${selectedColor === 'BLUE' ? 'active' : ''}`}
                                onClick={() => handleColorChange('BLUE')}
                            >
                                Azul
                            </button>
                            {/* Agregar más botones según los colores disponibles */}
                        </p>
                        <p>
                            Cantidad:
                            <input
                                type="number"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={products[0].sizes[selectedSize].stock} // Limitar a la cantidad disponible
                            />
                        </p>

                        <button onClick={() => handleProductSelect(product)}>Seleccionar</button>
                    </div>
                ))}
            </div>
            <button onClick={addToCart} disabled={!selectedProduct}>
                Agregar al Carrito
            </button>
            <Logo />
        </div>
    );
};

export default Design;
