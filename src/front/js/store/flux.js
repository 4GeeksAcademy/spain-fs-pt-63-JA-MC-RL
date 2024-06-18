const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: localStorage.getItem('token') || null,
            user: null
        },
        actions: {
            // Acción para obtener un mensaje desde el backend
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

            // Acción para iniciar sesión
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

                    setStore({ token });
                    localStorage.setItem('token', token);

                    return true;
                } catch (error) {
                    console.log("Error during login:", error);
                    return false;
                }
            },

            // Acción para registrar un nuevo usuario
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

            // Acción para actualizar el perfil del usuario
            updateProfile: async (userData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${userData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getStore().token}`
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
                            first_name: updatedUserData.first_name,
                            last_name: updatedUserData.last_name,
                            phone_number: updatedUserData.phone_number,
                            city: updatedUserData.city,
                            country: updatedUserData.country,
                            postal_code: updatedUserData.postal_code,
                            address1: updatedUserData.address1,
                            address2: updatedUserData.address2
                        }
                    }));

                    return true;
                } catch (error) {
                    console.error('Error updating profile:', error);
                    throw error;
                }
            },

            // Acción para cerrar sesión
            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null });
            },

            // Acción para crear un nuevo elemento de pedido
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
            }
        }
    };
};

export default getState;
