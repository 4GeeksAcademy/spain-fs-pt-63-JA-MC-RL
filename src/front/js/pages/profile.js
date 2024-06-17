import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';

const Profile = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city: '',
        country: '',
        postalCode: '',
        address1: '',
        address2: ''
    });

    // useEffect para inicializar userData con los datos actuales del usuario
    useEffect(() => {
        if (store.user) {
            setUserData({
                email: store.user.email || '',
                firstName: store.user.first_name || '',
                lastName: store.user.last_name || '',
                phoneNumber: store.user.phone_number || '',
                city: store.user.city || '',
                country: store.user.country || '',
                postalCode: store.user.postal_code || '',
                address1: store.user.address1 || '',
                address2: store.user.address2 || ''
            });
        }
    }, [store.user]);

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.updateProfile(userData);  // Llama a la acción de actualizar perfil
            alert('Profile updated successfully!');

            // Opcional: Actualizar userData con los datos actualizados del usuario después de la actualización
            // Esto depende de cómo actualizas el estado global en `actions.updateProfile`
            // setUserData({
            //     ...userData,
            //     // Actualizar con los datos devueltos después de la actualización
            // });

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    // JSX para el componente Profile
    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit} className='flex-direction-column'>
                <label>Email:</label>
                <input name="email" value={userData.email} onChange={handleChange} />
                <label>First Name:</label>
                <input name="firstName" value={userData.firstName} onChange={handleChange} />
                <label>Last Name:</label>
                <input name="lastName" value={userData.lastName} onChange={handleChange} />
                <label>Phone Number:</label>
                <input name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
                <label>City:</label>
                <input name="city" value={userData.city} onChange={handleChange} />
                <label>Country:</label>
                <input name="country" value={userData.country} onChange={handleChange} />
                <label>Postal Code:</label>
                <input name="postalCode" value={userData.postalCode} onChange={handleChange} />
                <label>Address 1:</label>
                <input name="address1" value={userData.address1} onChange={handleChange} />
                <label>Address 2:</label>
                <input name="address2" value={userData.address2} onChange={handleChange} />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
