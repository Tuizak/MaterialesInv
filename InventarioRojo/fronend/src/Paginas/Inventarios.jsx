import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desing/InventarioDesing.css';

const Inventarios = () => {
    const [materiales, setMateriales] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [tipoMovimiento, setTipoMovimiento] = useState('entrada');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [historial, setHistorial] = useState([]);

    const fetchHistorial = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/movimientos');
            setHistorial(response.data);
        } catch (error) {
            console.error('Error al obtener historial:', error);
            setError('Error al obtener historial.');
        }
    };

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/materiales');
                setMateriales(response.data);
            } catch (error) {
                console.error('Error al obtener materiales:', error);
                setError('Error al obtener materiales.');
            }
        };

        fetchMateriales();
        fetchHistorial();
    }, []);

    const handleMovimiento = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!selectedMaterial || !cantidad) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const movimiento = {
            id_material: selectedMaterial,
            tipo_movimiento: tipoMovimiento,
            cantidad: parseInt(cantidad, 10),
            fecha_movimiento: new Date().toISOString().slice(0, 19).replace('T', ' '),
            descripcion: `Movimiento de ${tipoMovimiento === 'entrada' ? 'entrada' : 'salida'} de material`
        };

        try {
            const response = await axios.post('http://localhost:3000/api/movimientos', movimiento);
            setSuccessMessage(response.data.message);
            setSelectedMaterial('');
            setCantidad('');
            fetchHistorial(); // Actualiza el historial después del movimiento
        } catch (error) {
            console.error('Error al registrar movimiento:', error);
            setError('Error al registrar movimiento. Inténtalo nuevamente.');
        }
    };

    return (
        <div className="inventarios-container">
            <h2>Gestión de Inventarios</h2>
            <form onSubmit={handleMovimiento} className="movimiento-form">
                <div>
                    <label>Seleccionar Material:</label>
                    <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                        <option value="">Selecciona un material</option>
                        {materiales.map((material) => (
                            <option key={material.id_material} value={material.id_material}>
                                {material.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />
                </div>
                <div>
                    <label>Tipo de Movimiento:</label>
                    <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                </div>
                <button type="submit">Registrar Movimiento</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <h3>Historial de Movimientos</h3>
            <div className="historial-container">
                <div className="entradas">
                    <h4>Entradas</h4>
                    {historial.filter(item => item.tipo_movimiento === 'entrada').map((item) => (
                        <div key={item.id_movimiento} className="historial-item">
                            <p>{item.fecha_movimiento} - {item.descripcion}: {item.cantidad}</p>
                        </div>
                    ))}
                </div>
                <div className="salidas">
                    <h4>Salidas</h4>
                    {historial.filter(item => item.tipo_movimiento === 'salida').map((item) => (
                        <div key={item.id_movimiento} className="historial-item">
                            <p>{item.fecha_movimiento} - {item.descripcion}: {item.cantidad}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inventarios;
