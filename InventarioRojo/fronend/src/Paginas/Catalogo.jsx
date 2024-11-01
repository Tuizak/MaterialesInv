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

  // Función para eliminar un material
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este material?")) {
      try {
        await axios.delete(`http://localhost:3000/api/materiales/${id}`);
        // Filtrar el material eliminado del estado
        setMateriales(materiales.filter(material => material.id_material !== id));
      } catch (error) {
        console.error('Error al eliminar material:', error);
      }
    }
  };

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
          <div className="actions">
            <button onClick={() => alert("Función de editar aquí")}>Editar</button>
            <button onClick={() => handleEliminar(material.id_material)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
