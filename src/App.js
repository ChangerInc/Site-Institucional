import logo from './Logo-Transparent.png';
import './App.css';
import CadastroUsuario from './components/CadastroUsuario';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CadastroUsuario />
      </header>
    </div>
  );
}

export default App;
