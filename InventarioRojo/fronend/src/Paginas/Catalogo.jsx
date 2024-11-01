import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Desing/CatalogoDesing.css';

const Catalogo = () => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/materiales');
        setMateriales(response.data);
      } catch (error) {
        console.error('Error al obtener materiales:', error);
      }
    };

    fetchMateriales();
  }, []);

  return (
    <div className="catalogo">
      {materiales.map((material) => (
        <div key={material.id_material} className="material-card">
          <img
            src={material.imagen_url || 'https://via.placeholder.com/150'}
            alt={material.nombre}
            className="material-image"
          />
          <h3 className="material-name">{material.nombre}</h3>
          <p><strong>Disponible:</strong> {material.metros_disponibles} metros</p>
          <p><strong>Precio:</strong> ${material.precio}</p>
          <button className="edit-button">Editar</button>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
