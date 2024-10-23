import React from 'react'
import {Link, Outlet} from 'react-router-dom'

const Nav = () => {
  return (
    <div>
    <nav>
      <ul>
        <li><Link to="/Inicio">inicio</Link></li>
        <li><Link to="/Catalogo">Catalogo</Link></li>
        <li><Link to="/Crear">Agregar Material</Link></li>
      </ul>
      </nav>
      <Outlet/>
    </div>
    
  )
}

export default Nav
