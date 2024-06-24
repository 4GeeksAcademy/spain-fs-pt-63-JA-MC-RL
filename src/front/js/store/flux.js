const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: localStorage.getItem('token') || null,
            user: null,
            products: [],
            cart: [],
            customImages: []
        },
        actions: {
            // Obtener mensaje desde el backend
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    if (!resp.ok) {
                        throw new Error("Failed to fetch message from backend");
                    }
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
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
        
                    setStore({ token, user }); // Actualiza el estado global con el token y el usuario
                    localStorage.setItem('token', token);
        
                    return true;
                } catch (error) {
                    console.error("Error during login:", error);
                    return false;
                }
            },
            

            // Registrar nuevo usuario
            register: async ({ email, password, firstName, lastName, phoneNumber, city, country, postalCode, address1, address2 }) => {
                try {
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
                        throw new Error("Registration failed");
                    }

                    const data = await resp.json();
                    const token = data.token;

                    setStore({ token });
                    localStorage.setItem('token', token);

                    return true;
                } catch (error) {
                    console.log("Error during registration:", error);
                    return false;
                }
            },

            // Actualizar perfil del usuario
            updateProfile: async (userData) => {
                try {
                    const store = getStore();
                    const userId = store.user.id;  // Asegúrate de que estás obteniendo el id del usuario de manera correcta
            
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`  // Asegúrate de que el token es correcto
                        },
                        body: JSON.stringify(userData)
                    });
            
                    if (!resp.ok) {
                        throw new Error('Failed to update profile');
                    }
            
                    const updatedUserData = await resp.json();
            
                    setStore(prevState => ({
                        ...prevState,
                        user: {
                            ...prevState.user,
                            ...updatedUserData  // Actualiza todos los campos del usuario con los datos recibidos del backend
                        }
                    }));
            
                    return true;
                } catch (error) {
                    console.error('Error updating profile:', error);
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

            fetchCustomImages: async () => {
                try {
                    const response = await fetch('https://picsum.photos/v2/list?limit=5');
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
                setStore({ cart: [...store.cart, product] });
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
                    const token = getStore().token;
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
            }
        }
    };
};

export default getState;
