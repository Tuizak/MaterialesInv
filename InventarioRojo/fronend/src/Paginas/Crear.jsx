// frontend/src/Paginas/Crear.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Crear = () => {
    const [nombre, setNombre] = useState('');
    const [metrosDisponibles, setMetrosDisponibles] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('metros_disponibles', metrosDisponibles);
        formData.append('precio', precio);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/materiales', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Material agregado:', response.data);
        } catch (error) {
            console.error('Error al agregar el material:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
            />
            <input
                type="number"
                value={metrosDisponibles}
                onChange={(e) => setMetrosDisponibles(e.target.value)}
                placeholder="Metros disponibles"
                required
            />
            <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio"
                required
            />
            <input
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
            />
            <button type="submit">Agregar Material</button>
        </form>
    );
};

export default Crear;
