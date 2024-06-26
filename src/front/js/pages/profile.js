import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import './profile.css';

const Profile = () => {
    const { store, actions } = useContext(Context);

    // Estado inicial para los datos del usuario
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

    // Estado para controlar si se está editando cada campo
    const [isEditing, setIsEditing] = useState({
        email: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
        city: false,
        country: false,
        postalCode: false,
        address1: false,
        address2: false
    });

    // Efecto para cargar los datos del usuario al montar el componente o cuando cambie store.user
    useEffect(() => {
        if (store.user) {
            // Mapear los datos de store.user a userData
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

    // Función para manejar el cambio en los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para alternar entre modo de edición y no edición para un campo específico
    const toggleEditing = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.updateProfile(userData);
            alert('¡Perfil actualizado correctamente!');
            // Deshabilitar todos los modos de edición después de la actualización exitosa
            setIsEditing({
                email: false,
                firstName: false,
                lastName: false,
                phoneNumber: false,
                city: false,
                country: false,
                postalCode: false,
                address1: false,
                address2: false
            });
        } catch (error) {
            console.error('Error actualizando el perfil:', error);
            alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="profile-container">
            <h1>Perfil</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                {Object.keys(userData).map(key => (
                    <div className="input-group" key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input
                            type="text"
                            name={key}
                            value={userData[key]}
                            onChange={handleChange}
                            disabled={!isEditing[key]}
                            placeholder={userData[key]}
                            className={isEditing[key] ? 'editing' : ''}
                        />
                        {!isEditing[key] && (
                            <button
                                type="button"
                                className="edit-button"
                                onClick={() => toggleEditing(key)}
                            >
                                ✏️
                            </button>
                        )}
                    </div>
                ))}
                {Object.values(isEditing).some(Boolean) && (
                    <button type="submit">Actualizar Perfil</button>
                )}
            </form>
        </div>
    );
};

export default Profile;
