// Design.js
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./../../styles/desing.css"
import { Logo } from "./../component/logos.js"

const Design = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedColor, setSelectedColor] = useState('GREEN') // Estado para el color seleccionado
    const [selectedSize, setSelectedSize] = useState('MEDIUM') // Estado para la talla seleccionada
    const [selectedQuantity, setSelectedQuantity] = useState(1) // Estado para la cantidad seleccionada
    const [selectedDescription, setSelectedDescription] = useState('Description default') // Estado para la descripción seleccionada
    const [selectedPrice, setSelectedPrice] = useState('00.00') // Estado para el precio seleccionado
    const [selectedCustomImage, setSelectedCustomImage] = useState(null) // Estado para el precio seleccionado
    const navigate = useNavigate()
    const initialProducts = [
        {
            id: 1,
            name: 'Camiseta deportiva ',
            price: '74.00',
            description: 'Tela 100% algodon ecologico, resistente y fresca.',
            image_urls: {
                GREEN: 'https://www.markamania.es/75317-medium_default/camiseta-roly-atomic-100-algodon-150-basica-promocional.jpg',
                RED: 'https://www.ahorraentinta.es/6254-large_default/camiseta-100-algodon-jhk-color-155-gr-hombre.jpg', // Ejemplo de URL para camiseta roja
                BLUE: 'https://naisa.es/11236-large_default/camiseta-basica-algodon-atomic-.jpg' // Ejemplo de URL para camiseta azul
            },
            descriptions: {
                GREEN: 'green',
                RED: 'red',
                BLUE: 'blue'
                // Añadir más descripciones según los colores disponibles
            },
            sizes: {
                SMALL: {
                    price: '10.00',
                    stock: 20
                },
                MEDIUM: {
                    price: '10.00',
                    stock: 20
                },
                LARGE: {
                    price: '10.00',
                    stock: 20
                }
                // Añadir más tamaños según los disponibles
            }
        }
    ]
    useEffect(() => {
        // Simulando la carga de productos desde la API (en este caso, solo hay un producto)
        setProducts(initialProducts)
    }, [])

    const getCustomImages = () => {
        console.log("Haces un estado, que sea un [], y cuando la peticion te devuelva un response, le haces un setCustomImage(response)")
    }
    const handleProductSelect = (product) => {
        setSelectedProduct(product)
    }

    const handleColorChange = (color) => {
        setSelectedColor(color)
        setSelectedDescription(products[0].descriptions[color])
        setSelectedPrice(products[0].sizes[selectedSize].price) // Actualizar precio al cambiar color
    }

    const handleSizeChange = (size) => {
        setSelectedSize(size)
        setSelectedPrice(products[0].sizes[size].price) // Actualizar precio al cambiar talla
    }

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10)
        setSelectedQuantity(quantity)
    }
    const handleCustomImage = (url) => {
        setSelectedCustomImage(url)
    }

    const addToCart = () => {
        if (selectedProduct) {
            // Guardar el producto seleccionado en localStorage para usarlo en la vista de cart.js
            const productToAdd = {
                ...selectedProduct,
                color: selectedColor,
                size: selectedSize,
                quantity: selectedQuantity
            }
            localStorage.setItem('selectedProduct', JSON.stringify(productToAdd))
            navigate('/cart')
        }
    }

    return (
        <div className="design-view">
            <h1>Selecciona un Producto para el Diseño</h1>
            <div className="product-list">
                {products.map(product => (
                    <>
                        <div key={product.id} className="product-card">
                            <div className='cont-custom'>
                                <button onClick={() => handleCustomImage('https://picsum.photos/200')} className='btn-select-custom-img'>
                                    <img src="https://picsum.photos/200" />
                                </button>
                                <button onClick={() => handleCustomImage('https://picsum.photos/200')} className='btn-select-custom-img'>
                                    <img src="https://picsum.photos/200" />
                                </button>
                                <button onClick={() => handleCustomImage('https://picsum.photos/200')} className='btn-select-custom-img'>
                                    <img src="https://picsum.photos/200" />
                                </button>
                                <button onClick={() => handleCustomImage('https://picsum.photos/200')} className='btn-select-custom-img'>
                                    <img src="https://picsum.photos/200" />
                                </button>
                                <button onClick={() => handleCustomImage('https://picsum.photos/200')} className='btn-select-custom-img'>
                                    <img src="https://picsum.photos/200" />
                                </button>
                            </div>
                            <div className='cont-product'>
                                {selectedCustomImage &&
                                    <img className="custom-img-detail" src={selectedCustomImage} alt={product.name} />
                                }
                                <img src={product.image_urls[selectedColor]} alt={product.name} />
                            </div>
                            <div className='cont-prod-details-box'>
                                <div className='cont-prod-details'>
                                    <h1>{product.name}</h1>
                                    <p>Descripción: {product.description}</p> {/* Mostrar la descripción del color seleccionado */}
                                    <p>Precio: <span className='price'>${selectedPrice}</span></p> {/* Mostrar el precio actualizado */}
                                    <p>
                                        Talla:
                                        <select value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                                            {Object.keys(product.sizes).map(size => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </p>
                                    <div className='cont-select-color'>
                                        <p>Selecciona el color:</p>
                                        <div className='cont-color-picker'>
                                            <button
                                                className={`color-option ${selectedColor === 'GREEN' ? 'active' : ''}`}
                                                style={{ backgroundColor: 'green' }}
                                                onClick={() => handleColorChange('GREEN')}
                                            >
                                            </button>
                                            <button
                                                className={`color-option ${selectedColor === 'RED' ? 'active' : ''}`}
                                                style={{ backgroundColor: 'red' }}
                                                onClick={() => handleColorChange('RED')}
                                            >
                                            </button>
                                            <button
                                                className={`color-option ${selectedColor === 'BLUE' ? 'active' : ''}`}
                                                style={{ backgroundColor: 'blue' }}
                                                onClick={() => handleColorChange('BLUE')}
                                            >
                                            </button>
                                        </div>

                                    </div>
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
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <button onClick={addToCart} disabled={!selectedProduct}>
                Agregar al Carrito
            </button>
            <Logo />
        </div>
    )
}

export default Design