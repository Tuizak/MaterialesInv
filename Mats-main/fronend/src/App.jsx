import { AuthProvider } from "./Componentes/AuthContextt"
import Rutas from "./Rutas/Rutas"

function App() {


  return (
   <div>
    <AuthProvider>
    <Rutas/>
    </AuthProvider>
   </div>
  )
}

export default App
