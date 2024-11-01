import React from 'react'
import {Route, Routes} from "react-router-dom"
import Catalogo from '../Paginas/Catalogo'
import Inicio from '../Paginas/Inicio'
import Nav from '../Paginas/Nav'
import Crear from '../Paginas/Crear'
import Inventarios from '../Paginas/Inventarios'
import Login from '../Componentes/Login'
import ProtectedRoute from '../Componentes/Private'
const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Nav/>}>
        <Route path='/Inicio' element={<ProtectedRoute><Inicio/></ProtectedRoute>}/>
        <Route path='/Catalogo' element={<ProtectedRoute><Catalogo/></ProtectedRoute>}/>
        <Route path='/Crear' element={<ProtectedRoute><Crear/></ProtectedRoute>}/>
        <Route path='/Inventarios' element={<ProtectedRoute><Inventarios/></ProtectedRoute>}/>
        <Route path='/Login' element={<Login/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Rutas
