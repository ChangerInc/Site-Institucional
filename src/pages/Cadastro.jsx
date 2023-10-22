import React, { useState } from 'react';
import axios from 'axios';
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
    setFormData({ [name]: value });
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
    <div className='container'>
    <div className='container-login'>
      <div>
      <p className='texto-bemvindo'>Bem vindo ao CHANGER.</p>
      <p className='texto-conta'>Já tem conta? Faça login</p>
      </div>
    
      <form onSubmit={handleSubmit} className='formulario'>
        <div>
          <label htmlFor="nome">Nome: </label>
          <input className='input-container' 
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input className='input-container'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha: </label>
          <input className='input-container'
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
    </div>
  );
  
}

export default CadastroUsuario
