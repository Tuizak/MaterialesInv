import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Desing/ReportesDesing.css';

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [fechaExacta, setFechaExacta] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('Dia');
  const [entradasFiltradas, setEntradasFiltradas] = useState([]);
  const [salidasFiltradas, setSalidasFiltradas] = useState([]);

  useEffect(() => {
    obtenerReporte();
  }, []);

  const obtenerReporte = async () => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Obtener la zona horaria local
      const response = await axios.get(`http://localhost:3000/api/movimientos?timeZone=${timeZone}`);
      setReportes(response.data);
    } catch (error) {
      console.error('Error al obtener el reporte:', error);
    }
  };
  

  const manejarFiltroPorFechaExacta = () => {
    if (!fechaExacta) {
      alert("Por favor selecciona una fecha.");
      return;
    }

    const fechaSeleccionada = new Date(fechaExacta).toISOString().split("T")[0];

    const entradas = reportes.filter((reporte) => {
      const fechaMovimiento = new Date(reporte.fecha_movimiento).toISOString().split("T")[0];
      return reporte.tipo_movimiento === 'entrada' && fechaMovimiento === fechaSeleccionada;
    });

    const salidas = reportes.filter((reporte) => {
      const fechaMovimiento = new Date(reporte.fecha_movimiento).toISOString().split("T")[0];
      return reporte.tipo_movimiento === 'salida' && fechaMovimiento === fechaSeleccionada;
    });

    if (entradas.length === 0 && salidas.length === 0) {
      alert("No hay reportes disponibles para esta fecha.");
    }

    setEntradasFiltradas(entradas);
    setSalidasFiltradas(salidas);
  };

  const manejarFiltroPeriodico = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear la hora para comparar solo por fecha
    let fechaInicio;

    switch (tipoFiltro) {
      case 'Dia':
        fechaInicio = hoy;
        break;
      case 'Semana':
        fechaInicio = new Date(hoy);
        fechaInicio.setDate(hoy.getDate() - 7);
        break;
      case 'Mes':
        fechaInicio = new Date(hoy);
        fechaInicio.setDate(hoy.getDate() - 30);
        break;
      default:
        return;
    }

    const entradas = reportes.filter((reporte) => {
      const fechaMovimiento = new Date(reporte.fecha_movimiento);
      return reporte.tipo_movimiento === 'entrada' && fechaMovimiento >= fechaInicio;
    });

    const salidas = reportes.filter((reporte) => {
      const fechaMovimiento = new Date(reporte.fecha_movimiento);
      return reporte.tipo_movimiento === 'salida' && fechaMovimiento >= fechaInicio;
    });

    setEntradasFiltradas(entradas);
    setSalidasFiltradas(salidas);
  };

  const ajustarFechaAUsuario = (fechaUTC) => {
    const fechaLocal = new Date(fechaUTC);
    return fechaLocal.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="reportes-container">
      <div className="reportes-header">
        <h2>Reportes de Inventario</h2>
        
        <div className="filtro-reportes">
          <h3 className='texto'>Filtrar Periódicamente</h3>
          <label>Tipo de Filtro:</label>
          <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
            <option value="Dia">Día</option>
            <option value="Semana">Semana</option>
            <option value="Mes">Mes</option>
          </select>
          <button onClick={manejarFiltroPeriodico}>Filtrar Periódicamente</button>
          
          <h3 className="texto-negro">Filtrar por Fecha Exacta</h3>
          <input 
            type="date" 
            value={fechaExacta} 
            onChange={(e) => setFechaExacta(e.target.value)} 
          />
          <button onClick={manejarFiltroPorFechaExacta}>Filtrar por Fecha Exacta</button>
        </div>
      </div>
      
      <div className="reportes-tables">
        <div className="reporte-entradas">
          <h3>Entradas</h3>
          <table>
            <thead>
              <tr>
                <th>ID Movimiento</th>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Cantidad</th>
                <th>Realizado por</th>
              </tr>
            </thead>
            <tbody>
              {entradasFiltradas.length > 0 ? (
                entradasFiltradas.map((reporte) => (
                  <tr key={reporte.id_movimiento}>
                    <td>{reporte.id_movimiento}</td>
                    <td>{reporte.nombre_material || 'Desconocido'}</td>
                    <td>{ajustarFechaAUsuario(reporte.fecha_movimiento)}</td>
                    <td>{reporte.cantidad}</td>
                    <td>{reporte.nombre_admin || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay reportes disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="reporte-salidas">
          <h3>Salidas</h3>
          <table>
            <thead>
              <tr>
                <th>ID Movimiento</th>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Cantidad</th>
                <th>Realizado por</th>
              </tr>
            </thead>
            <tbody>
              {salidasFiltradas.length > 0 ? (
                salidasFiltradas.map((reporte) => (
                  <tr key={reporte.id_movimiento}>
                    <td>{reporte.id_movimiento}</td>
                    <td>{reporte.nombre_material || 'Desconocido'}</td>
                    <td>{ajustarFechaAUsuario(reporte.fecha_movimiento)}</td>
                    <td>{reporte.cantidad}</td>
                    <td>{reporte.nombre_admin || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay reportes disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
