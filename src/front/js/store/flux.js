const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: localStorage.getItem('token') || null,
            user: null
        },
        actions: {
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
            updateProfile: async (userData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/users/${userData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
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
            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null });
            }
        }
    };
};

export default getState;