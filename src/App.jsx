import { useState } from 'react'
import ArquivoUpload from './components/ArquivoUpload.jsx'
import CadastroUsuario from './components/CadastroUsuario.jsx'
import ListarUsuario from './components/ListarUsuario.jsx'
import Header from './components/Header.jsx'
import Teste from './components/teste.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div >
      <Header />
      <CadastroUsuario />
    
    </div>
    </>
  )
}



export default App
