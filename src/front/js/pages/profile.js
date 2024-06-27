import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import './../../styles/profile.css';

const Profile = () => {
    const { store, actions } = useContext(Context);

    const [userData, setUserData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        city: '',
        country: '',
        postal_code: '',
        address1: '',
        address2: ''
    });

    const [isEditing, setIsEditing] = useState({
        email: false,
        first_name: false,
        last_name: false,
        phone_number: false,
        city: false,
        country: false,
        postal_code: false,
        address1: false,
        address2: false
    });

    // Cargar los datos del usuario desde store o localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData({
                email: storedUser.email || '',
                first_name: storedUser.first_name || '',
                last_name: storedUser.last_name || '',
                phone_number: storedUser.phone_number || '',
                city: storedUser.city || '',
                country: storedUser.country || '',
                postal_code: storedUser.postal_code || '',
                address1: storedUser.address1 || '',
                address2: storedUser.address2 || ''
            });
        } else if (store.user) {
            setUserData({
                email: store.user.email || '',
                first_name: store.user.first_name || '',
                last_name: store.user.last_name || '',
                phone_number: store.user.phone_number || '',
                city: store.user.city || '',
                country: store.user.country || '',
                postal_code: store.user.postal_code || '',
                address1: store.user.address1 || '',
                address2: store.user.address2 || ''
            });
        } else {
            console.log('Usuario no autenticado o datos de usuario no disponibles.');
        }
    }, [store.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleEditing = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (store.user) {
                await actions.updateProfile(userData);
                alert('¡Perfil actualizado correctamente!');
                setIsEditing({
                    email: false,
                    first_name: false,
                    last_name: false,
                    phone_number: false,
                    city: false,
                    country: false,
                    postal_code: false,
                    address1: false,
                    address2: false
                });
            } else {
                console.error('Error: store.user is null or empty. Usuario no autenticado o datos de usuario no disponibles.');
            }
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
                        <label>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</label>
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
