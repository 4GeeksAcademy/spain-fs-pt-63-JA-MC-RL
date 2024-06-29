const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: localStorage.getItem('token') || null,
            user: JSON.parse(localStorage.getItem('user')) || null,
            products: [],
            cart: [],
            customImages: [],
            isLoggedIn: localStorage.getItem('token') ? true : false,
        },
        actions: {
            // Obtener mensaje desde el backend
            getMessage: async () => {
                try {
                    const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/hello`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!resp.ok) {
                        throw new Error("Failed to fetch message");
                    }
                    const data = await resp.json();
                    console.log(data.message);
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            // Iniciar sesión
            login: async ({ email, password }) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    if (!resp.ok) {
                        throw new Error("Login failed");
                    }

                    const data = await resp.json();
                    const token = data.token;
                    const user = data.user;

                    if (!token || !user) {
                        throw new Error("Login response missing token or user data");
                    }

                    setStore({ token, user });
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    return true;
                } catch (error) {
                    console.error("Error during login:", error);
                    return false;
                }
            },

            // Registrar nuevo usuario
            register: async ({ email, password, firstName, lastName, phoneNumber, city, country, postalCode, address1, address2 }) => {
                try {
                    // Validación básica de datos
                    if (!email || !password || !firstName || !lastName || !phoneNumber || !city || !country || !postalCode || !address1) {
                        throw new Error('Todos los campos son obligatorios');
                    }
            
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password,
                            first_name: firstName,
                            last_name: lastName,
                            phone_number: phoneNumber,
                            city,
                            country,
                            postal_code: postalCode,
                            address1,
                            address2
                        })
                    });
            
                    if (!resp.ok) {
                        throw new Error('La registración falló');
                    }
            
                    const data = await resp.json();
                    const token = data.token;
            
                    // Actualizar el estado global y localStorage con el token
                    setStore({ token });
                    localStorage.setItem('token', token);
            
                    return true;
                } catch (error) {
                    console.error('Error durante el registro:', error);
                    return false;
                }
            },
            

            // Actualizar perfil del usuario
            updateProfile: async (userData) => {
                try {
                    const store = getStore();
                    const userId = store.user?.id;

                    if (!userId) {
                        throw new Error('User ID is not defined.');
                    }

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        },
                        body: JSON.stringify(userData)
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json();
                        console.error('Server response:', errorData);
                        throw new Error('Failed to update profile');
                    }

                    const updatedUserData = await resp.json();

                    setStore(prevState => ({
                        ...prevState,
                        user: {
                            ...prevState.user,
                            ...updatedUserData
                        }
                    }));

                    localStorage.setItem('user', JSON.stringify({
                        ...store.user,
                        ...updatedUserData
                    }));

                    return true;
                } catch (error) {
                    console.error('Error updating profile:', error.message || error);
                    alert(`Error updating profile: ${error.message || 'Unknown error'}`);
                    throw error;
                }
            },

            // Cerrar sesión
            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null, user: null });
            },

            // Crear nuevo elemento de pedido
            createOrderItem: async ({ user_id, order_id, product_id, design_id, quantity, price }) => {
                try {
                    const token = getStore().token;
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/order-item`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            user_id,
                            order_id,
                            product_id,
                            design_id,
                            quantity,
                            price
                        })
                    });

                    if (!resp.ok) {
                        throw new Error("Failed to create order item");
                    }

                    const data = await resp.json();
                    console.log("Order item created:", data);
                    return true;
                } catch (error) {
                    console.log("Error creating order item:", error);
                    return false;
                }
            },

            // Obtener productos
            getProducts: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/products`);
                    if (!resp.ok) {
                        throw new Error("Failed to fetch products");
                    }
                    const data = await resp.json();
                    setStore({ products: data });
                    return data;
                } catch (error) {
                    console.log("Error fetching products:", error);
                    return [];
                }
            },

            // Agregar producto al carrito
            addToCart: (product) => {
                const store = getStore();
                if (store.isLoggedIn) {
                    setStore({ cart: [...store.cart, product] });
                } else {
                    alert('Debes iniciar sesión para agregar productos al carrito.');
                    // Puedes redirigir a la página de login u otra acción aquí
                }
            },

            // Eliminar producto del carrito
            removeFromCart: (productId) => {
                const store = getStore();
                const updatedCart = store.cart.filter(item => item.id !== productId);
                setStore({ cart: updatedCart });
            },

            // Crear pedido
            createOrder: async (orderData) => {
                try {
                    const store = getStore();
                    if (!store.isLoggedIn) {
                        throw new Error('Debes iniciar sesión para proceder con la compra.');
                    }

                    const token = store.token;
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/order`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(orderData)
                    });

                    if (!resp.ok) {
                        throw new Error("Failed to create order");
                    }

                    const data = await resp.json();
                    console.log("Order created:", data);
                    return true;
                } catch (error) {
                    console.log("Error creating order:", error);
                    return false;
                }
            },

            // Obtener imágenes personalizadas
            fetchCustomImages: async () => {
                try {
                    const response = await fetch('https://picsum.photos/v2/list?limit=100');
                    if (!response.ok) {
                        throw new Error("Failed to fetch images");
                    }
                    const images = await response.json();
                    const imageUrls = images.map(img => `https://picsum.photos/id/${img.id}/200/200`);
                    setStore({ customImages: imageUrls });
                } catch (error) {
                    console.error("Error fetching images:", error);
                }
            },
        }
    };
};

export default getState;
