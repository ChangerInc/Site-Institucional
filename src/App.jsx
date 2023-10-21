import { useState } from 'react'
import ArquivoUpload from './components/ArquivoUpload.jsx'
import CadastroUsuario from './components/CadastroUsuario.jsx'
import ListarUsuario from './components/ListarUsuario.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div >
      <CadastroUsuario />
    </div>
    </>
  )
}

export default App
