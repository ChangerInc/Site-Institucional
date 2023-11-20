import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { usuario } from '../api.js'
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import '../styles/navbar.css';
import '../styles/cadastro.css';

function CadastroUsuario() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '', 
    confirmar: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await usuario.post('/',
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
    <>
    <Navbar/>
    <div className='container-cad'>
    <div className='container-box'>
      <div className='container-texto'>
        <h2 className='texto-cinza'>Bem vindo ao <span className='texto-preto'>CHANGER</span><span className='texto-azul'>.</span></h2>
        <h3>Já tem conta? <span className='texto-azul'><Link className="linkBox" to="/Login">Faça login</Link></span></h3>
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
          <label htmlFor="confirmar">Confirmar senha </label>
          <input
            type="password"
            id="confirmar"
            name="confirmar"
            value={formData.confirmar}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );

}

export default CadastroUsuario
