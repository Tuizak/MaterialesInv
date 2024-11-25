import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContextt';
import '../Paginas/Desing/Login.css';

const Login = () => {
  const [Usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post('http://localhost:3000/login', {
            Usuario,
            contraseña,
        });
        console.log('Login exitoso:', response.data);
        login(response.data.user); 
        navigate('/Catalogo');
    } catch (err) {
        if (err.response && err.response.status === 401) {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
        } else {
            setError('Error al conectar con el servidor. Inténtalo más tarde.');
        }
    }
};


  return (
    <div className="login-page">
      <div className="login-left">
      <img src="/Logo.png" alt="Materiales Rojo" className="login-logo" />
        <h2>Bienvenido a Materiales Rojo</h2>
   
      </div>
      <div className="login-right">
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
