import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usuario } from '../api.js'
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import '../styles/navbar.css';
import '../styles/login.css';

const Login = () => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await usuario.post('login',
        formData);

      if (response.status === 200) {
        setData(response.data);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("nome", response.data.nome);
        
        navigate("/user");
      } else {
        throw new Error('Erro na requisição.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='container-login'>
    <div className='container-box'>
      <div className='container-texto'>
      <h2 className='texto-cinza'>Bem vindo ao <span className='texto-preto'>CHANGER</span><span className='texto-azul'>.</span></h2>
        <h3>Não tem conta? <span className='texto-azul'><Link className="linkBox" to="/Cadastro">Cadastre-se</Link></span></h3>
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
        <div class="wrapper_login">
    <a href="#demo-modal_login">Esqueci a senha</a>
</div>

<div id="demo-modal_login" class="modal_login">
    <div class="modal__content_login">
        <h3>Esqueceu a senha de acesso?</h3>

        <p>
            <input type="email" placeholder='Insira o e-mail cadastrado.' />
        </p>

        <a href="#" class="modal__close_login">&times;</a>
    </div>
</div>
        <button type="submit">Login</button>
        
      </form>
    </div>
    </div>

    <Footer/>
    </>
  );
}

export default Login