// Nav.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../Componentes/AuthContextt'; // Importa el contexto de autenticación
import './Desing/NavDesing.css';

const Nav = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtén isAuthenticated y logout del contexto

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/Inicio">Inicio</Link></li>
          <li><Link to="/Catalogo">Catálogo</Link></li>
          <li><Link to="/Crear">Agregar Material</Link></li>
          <li><Link to="/Inventarios">Movimientos</Link></li>
          {!isAuthenticated ? (
            <li><Link to="/Login">Login</Link></li>
          ) : (
            <li><button onClick={logout}>Cerrar sesión</button></li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Nav;
