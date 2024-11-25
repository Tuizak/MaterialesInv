import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Desing/InventariosDesing.css';
import { useAuth } from '../Componentes/AuthContextt';

const Inventarios = () => {
    const { user } = useAuth();
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
                // Solicita solo materiales activos para la selección de movimientos
                const response = await axios.get('http://localhost:3000/api/materiales?activos=true');
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
            descripcion: `Movimiento de ${tipoMovimiento === 'entrada' ? 'entrada' : 'salida'} de material`,
            id_Admin: user?.id_Admin // Asegúrate de que `id_Admin` esté presente
        };

        try {
            const response = await axios.post('http://localhost:3000/api/movimientos', movimiento);
            setSuccessMessage(response.data.message);
            setSelectedMaterial('');
            setCantidad('');
            fetchHistorial();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.error);
            } else {
                setError('Error al registrar movimiento. Inténtalo nuevamente.');
            }
        }
    };

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="inventarios-container">
            <h2>Gestión de Inventarios</h2>
            <form onSubmit={handleMovimiento} className="movimiento-form">
                <div className="form-row">
                    <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} required>
                        <option value="">Selecciona un material</option>
                        {materiales.map((material) => (
                            <option key={material.id_material} value={material.id_material}>
                                {material.nombre}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Cantidad de metros"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                    <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)} required>
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                    </select>
                </div>
                <button type="submit" className="movimiento-button">Registrar Movimiento</button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>

            <div className="historial-container">
                <div className="historial-section">
                    <h4>Entradas</h4>
                    <div className="historial-list">
                        {historial.filter(item => item.tipo_movimiento === 'entrada').map((item) => (
                            <div key={item.id_movimiento} className="historial-item">
                                <p>{formatFecha(item.fecha_movimiento)} - Movimiento de entrada de material: {item.cantidad} metros</p>
                                <p><strong>Material:</strong> {item.nombre_material || 'Desconocido'}</p>
                                <p><strong>Realizado por:</strong> {item.nombre_admin || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="historial-section">
                    <h4>Salidas</h4>
                    <div className="historial-list">
                        {historial.filter(item => item.tipo_movimiento === 'salida').map((item) => (
                            <div key={item.id_movimiento} className="historial-item">
                                <p>{formatFecha(item.fecha_movimiento)} - Movimiento de salida de material: {item.cantidad} metros</p>
                                <p><strong>Material:</strong> {item.nombre_material || 'Desconocido'}</p>
                                <p><strong>Realizado por:</strong> {item.nombre_admin || 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventarios;
