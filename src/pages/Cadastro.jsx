import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function CadastroUsuario() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    nome: '',
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
      const response = await axios.post('http://localhost:8080/usuario/',
        formData);

      if (response.status === 201) {
        console.log('Cadastrado com sucesso!');
        setData(response.data);
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
        <span className='faca-login'>Já tem conta? <span className='texto-azul'><Link className="linkBox" to="/Login">Faça login</Link></span></span>
      </div>

      <form onSubmit={handleSubmit} className='formulario'>
        <div>
          <label htmlFor="nome">Nome </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </div>
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
        <div>
          <label htmlFor="confirmar-senha">Confirmar senha </label>
          <input
            type="password"
            id="confirmar_senha"
            name="confirmar-senha"
            value={formData.confirmarSenha}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );

}

export default CadastroUsuario
