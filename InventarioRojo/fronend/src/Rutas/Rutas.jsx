import React from 'react'
import {Route, Routes} from "react-router-dom"
import Catalogo from '../Paginas/Catalogo'
import Inicio from '../Paginas/Inicio'
import Nav from '../Paginas/Nav'
import Crear from '../Paginas/Crear'
const Rutas = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Nav/>}>
        <Route path='/Inicio' element={<Inicio/>}/>
        <Route path='/Catalogo' element={<Catalogo/>}/>
        <Route path='/Crear' element={<Crear/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Rutas
