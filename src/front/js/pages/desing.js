import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './../store/appContext';
import "./../../styles/desing.css";

const Design = () => {
  const { store, actions } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('GREEN');
  const [selectedSize, setSelectedSize] = useState('MEDIUM');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedDescription, setSelectedDescription] = useState('Description default');
  const [selectedPrice, setSelectedPrice] = useState('00.00');
  const [selectedCustomImage, setSelectedCustomImage] = useState(null);
  const navigate = useNavigate();

  const initialProducts = [
    {
      id: 1,
      name: 'Camiseta deportiva',
      price: '15,99',
      description: 'Fabricada en algodón 100% ecológico, resistente y fresca.',
      image_urls: {
        GREEN: 'https://assets.wordans.es/files/model_specifications/2016/6/16/278058/278058_big.jpg?1673455515',
        RED: 'https://assets.wordans.es/files/model_specifications/2016/6/16/278022/278022_big.jpg?1673455520',
        BLUE: 'https://assets.wordans.es/files/model_specifications/2016/6/16/278016/278016_big.jpg?1673455527',
        WHITE: 'https://assets.wordans.es/files/model_specifications/2016/6/16/277995/277995_big.jpg?1673455570',
        PURPLE: 'https://assets.wordans.es/files/model_specifications/2016/6/16/278079/278079_big.jpg?1673455560',
        BLACK: 'https://assets.wordans.es/files/model_specifications/2011/6/29/6825/6825_big.jpg?1674148335'
      },
      descriptions: {
        GREEN: 'green',
        RED: 'red',
        BLUE: 'blue',
        WHITE: 'white',
        PURPLE: 'purple',
        BLACK: 'black',
      },
      sizes: {
        SMALL: {
          price: '15.99',
          stock: 20
        },
        MEDIUM: {
          price: '16.99',
          stock: 20
        },
        LARGE: {
          price: '17.99',
          stock: 20
        }
      }
    }
  ];

  useEffect(() => {
    setProducts(initialProducts);
    setSelectedPrice(initialProducts[0].sizes[selectedSize].price);
    actions.fetchCustomImages();
  }, [actions, selectedSize]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedDescription(products[0].descriptions[color]);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedPrice(products[0].sizes[size].price);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setSelectedQuantity(quantity);
  };

  const handleCustomImage = (url) => {
    setSelectedCustomImage(url);
  };

  const addToCart = () => {
    if (selectedProduct) {
      const productToAdd = {
        ...selectedProduct,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQuantity,
        customImage: selectedCustomImage
      };
      localStorage.setItem('selectedProduct', JSON.stringify(productToAdd));
      navigate('/cart');
    }
  };

  return (
    <div className="design-view">
      <div className='d-flex'>
        <h1 className='title'>Diseña tu camiseta</h1>
      </div>
      <div className="product-list">
        {products.map(product => (
          <React.Fragment key={product.id}>
            <div className="product-card">
              <div className='cont-product'>
                <div className='cont-product-images'>
                  <div className="image-container">
                    {selectedCustomImage && (
                      <img className="custom-img-detail" src={selectedCustomImage} alt="Custom Design" />
                    )}
                    <img className="product-img-detail" src={product.image_urls[selectedColor]} alt={product.name} />
                  </div>
                </div>
              </div>
              <div className='cont-prod-details-box'>
                <div className='cont-prod-details'>
                  <h1>{product.name}</h1>
                  <p>Descripción: {product.description}</p>
                  <p>Precio: <span className='price'>${selectedPrice}</span></p>
                  <p>
                    Talla:
                    <select className='mx-2' value={selectedSize} onChange={(e) => handleSizeChange(e.target.value)}>
                      {Object.keys(product.sizes).map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </p>
                  <p>
                    Cantidad:
                    <input className='mx-2'
                      type="number"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={products[0].sizes[selectedSize].stock}
                    />
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
                      <button
                        className={`color-option ${selectedColor === 'WHITE' ? 'active' : ''}`}
                        style={{ backgroundColor: 'white', border: '1px solid black' }}
                        onClick={() => handleColorChange('WHITE')}

                      >
                      </button>
                      <button
                        className={`color-option ${selectedColor === 'PURPLE' ? 'active' : ''}`}
                        style={{ backgroundColor: 'purple' }}
                        onClick={() => handleColorChange('PURPLE')}
                      >
                      </button>
                      <button
                        className={`color-option ${selectedColor === 'BLACK' ? 'active' : ''}`}
                        style={{ backgroundColor: 'black' }}
                        onClick={() => handleColorChange('BLACK')}
                      >
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 d-flex align-items-center justify-content-center">
  <button
    className="btn btn-primary mx-1"
    onClick={() => handleProductSelect(product)}
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Diseña AQUI
  </button>
  <button
    className="btn btn-secondary mx-1"
    onClick={addToCart}
    disabled={!selectedProduct}
  >
    Agregar al Carrito
  </button>
</div>


                </div>
              </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Selecciona una imagen personalizada</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="custom-image-list">
                      {store.customImages.map((url, index) => (
                        <button key={index} onClick={() => handleCustomImage(url)} className='btn-select-custom-img'>
                          <img src={url} alt={`Custom ${index}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;