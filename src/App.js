import logo from './Designs/Logo/CHANGER. - White.png';
import './App.css';
import CadastroUsuario from './components/CadastroUsuario';
import ListarUsuario from './components/ListarUsuario';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CadastroUsuario />
        <ListarUsuario />
      </header>
    </div>
  );
}

export default App;
