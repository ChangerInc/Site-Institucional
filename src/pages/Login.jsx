import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Login = () => {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/usuario/login',
        formData);

      if (response.status === 200) {
        console.log('Logado com sucesso!');
        console.log(data);
        setData(response.data);
        console.log(formData);
        console.log(data);

        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("nome", response.data.nome);
      } else {
        throw new Error('Erro na requisição.');
      }
    } catch (error) {
      console.error(error);
    }
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