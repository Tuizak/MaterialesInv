import React from 'react';
import { Route, Routes } from "react-router-dom";
import Catalogo from '../Paginas/Catalogo';
import Nav from '../Paginas/Nav';
import Crear from '../Paginas/Crear';
import Inventarios from '../Paginas/Inventarios';
import Login from '../Componentes/Login';
import Contacto from '../Paginas/Contacto'; 
import ProtectedRoute from '../Componentes/Private';
import Reportes from '../Paginas/Reportes';


const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route path='/' element={<Catalogo />} />
          <Route path='/Catalogo' element={<Catalogo />} />
          <Route path='/Contacto' element={<Contacto />} /> {}
          <Route path='/Crear' element={<ProtectedRoute><Crear /></ProtectedRoute>} />
          <Route path='/Inventarios' element={<ProtectedRoute><Inventarios /></ProtectedRoute>} />
          <Route path='/Reportes' element={<ProtectedRoute><Reportes /></ProtectedRoute>} /> {}
          <Route path='/Login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Rutas;
