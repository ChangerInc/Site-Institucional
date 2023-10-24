import api from "../api";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import sptechLogo from '../assets/images/sptech_logo.png';
import { injectStyle } from "react-toastify/dist/inject-style";

function Login() {

  injectStyle();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/login', {
      email: username,
      senha: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200 && response.data?.token) {
          sessionStorage.setItem('authToken', response.data.token);
          sessionStorage.setItem('usuario', response.data.nome);

          toast.success('Login realizado com sucesso!');
          navigate('/user');
        } else {
          throw new Error('Ops! Ocorreu um erro interno.');
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  return (
    <div className='container-box'>
      <div className='container-texto'>
      <span className='bem-vindo'>Bem vindo ao <span className='changer-texto'>CHANGER</span><span className='texto-azul'>.</span></span>
      <span className='faca-login'>Não tem conta? <span className='texto-azul'><Link className="linkBox" to="/Cadastro">Cadastre-se</Link></span></span>
      </div>
    
      <form onSubmit={handleSubmit} className='formulario'>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login
