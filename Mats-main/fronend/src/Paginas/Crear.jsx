import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Desing/CrearDesing.css';

const Crear = () => {
  const [nombre, setNombre] = useState('');
  const [metrosDisponibles, setMetrosDisponibles] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

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
      navigate('/Catalogo'); // Redirige al catálogo después de crear el material
    } catch (error) {
      console.error('Error al agregar el material:', error);
    }
  };

  return (
    <div className="crear-container">
      <h2>Agregar Nuevo Material</h2>
      <form onSubmit={handleSubmit} className="crear-form">
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
    </div>
  );
};

export default Crear;
