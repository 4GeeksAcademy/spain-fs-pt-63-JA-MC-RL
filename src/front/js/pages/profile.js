import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import "./../../styles/profile.css";

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

    const [isEditing, setIsEditing] = useState(false);

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
        // Validar y formatear el número de teléfono para aceptar solo números
        if (name === 'phone_number') {
            const formattedValue = value.replace(/\D/g, ''); // Eliminar no números
            setUserData(prevState => ({
                ...prevState,
                [name]: formattedValue
            }));
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        if (store.user) {
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
            setIsEditing(false);
        } else {
            console.error('Error: store.user is null or empty. Usuario no autenticado o datos de usuario no disponibles.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (store.user) {
                await actions.updateProfile(userData);
                alert('¡Perfil actualizado correctamente!');
                setIsEditing(false);
                localStorage.setItem('user', JSON.stringify(userData));
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
                <div className="row">
                    <div className="column">
                        <div className="input-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Nombre"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-group">
                            <label>Apellido:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Apellido"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Correo Electrónico"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-group">
                            <label>Teléfono:</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={userData.phone_number}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Teléfono"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <div className="input-group">
                            <label>Ciudad:</label>
                            <input
                                type="text"
                                name="city"
                                value={userData.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Ciudad"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-group">
                            <label>País:</label>
                            <input
                                type="text"
                                name="country"
                                value={userData.country}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="País"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                        <div className="input-group">
                            <label>Dirección 1:</label>
                            <input
                                type="text"
                                name="address1"
                                value={userData.address1}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Dirección 1"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                                required
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-group">
                            <label>Dirección 2:</label>
                            <input
                                type="text"
                                name="address2"
                                value={userData.address2}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Dirección 2"
                                className={`profile-input ${isEditing ? 'editing' : ''}`}
                            />
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="button-group">
                        <button type="submit" className="profile-button">Guardar</button>
                        <button type="button" className="profile-button" onClick={handleCancel}>Cancelar</button>
                    </div>
                )}

                {!isEditing && (
                    <button type="button" className="edit-button" onClick={toggleEditing}>
                        Editar Perfil
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;
