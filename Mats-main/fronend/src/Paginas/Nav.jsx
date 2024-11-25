import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../Componentes/AuthContextt';
import './Desing/NavDesing.css';
import logo from '../../public/Logo.png'; // Ruta del logo

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <nav>
        <div className="logo">
          <img src={logo} alt="Materiales Rojo" />
          <h1>Materiales Rojo</h1>
        </div>
        <ul>
          <li><Link to="/">Catálogo</Link></li>
          {!isAuthenticated && <li><Link to="/Contacto" className="contact-button">Contáctanos</Link></li>}
          {isAuthenticated && <li><Link to="/Crear">Agregar Material</Link></li>}
          {isAuthenticated && <li><Link to="/Inventarios">Movimientos</Link></li>}
          {isAuthenticated && <li><Link to="/Reportes">Reportes</Link></li>}
          {!isAuthenticated ? (
            <li><Link to="/Login">Iniciar Sesión</Link></li>
          ) : (
            <li><button onClick={() => { logout(); }}>Cerrar sesión</button></li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Nav;
