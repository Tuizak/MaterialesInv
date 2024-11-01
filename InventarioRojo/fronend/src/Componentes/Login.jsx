// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContextt';

const Login = () => {
  const [Usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Trae la función login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    try {
      const response = await axios.post('http://localhost:3000/login', {
        Usuario,
        contraseña,
      });

      // Si el login es exitoso
      console.log('Login exitoso:', response.data);

      // Aquí puedes guardar el token o datos del usuario si es necesario
      login(response.data); // Actualiza el estado de usuario en el contexto
      navigate('/Catalogo'); // Redirige al usuario a la página deseada
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      } else {
        setError('Error al conectar con el servidor. Inténtalo más tarde.');
      }
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={Usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
