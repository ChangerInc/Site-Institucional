import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuario } from '../api.js';
import InputNome from '../components/InputNome.jsx'
import InputEmail from '../components/InputEmail.jsx'
import InputSenha from '../components/InputSenha.jsx'
import InputConfirmarSenha from '../components/InputConfirmarSenha.jsx'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import './styles-pages/cadastro.css';

function CadastroUsuario() {
  const navigate = useNavigate();
  const [showSucess, setShowSucess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: '',
  });

  useEffect(() => {
    let timeout;

    if (showSucess) {
      timeout = setTimeout(() => {
        setShowSucess(false);
        navigate('/login');
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [showSucess, showError, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await usuario.post('/', formData);

      if (response.status === 201) {
        setShowError(false);
        console.log('Cadastrado com sucesso!');
        setShowSucess(true);
      } else {
        throw new Error('Erro na requisição.');
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-cadastro">
        <div className='container-box'>
          <div className='container-texto'>
            <h2 className='texto-cinza'>Bem vindo ao <span className='texto-preto'>CHANGER</span><span className='texto-azul'>.</span></h2>
            <h3>Já tem conta? <span className='texto-azul'><Link className="linkBox" to="/Login">Faça login</Link></span></h3>
          </div>

          <form onSubmit={handleSubmit} className='formulario'>
            <InputNome
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <InputEmail
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <InputSenha
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <InputConfirmarSenha
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <div className="container-alerta">
          <Stack spacing={2}>
            {showSucess &&
              <Alert severity="success">
                <AlertTitle>Cadastrado com sucesso!</AlertTitle>
                Bem vindo a familia Changer!
              </Alert>
            }
            {showError &&
              <Alert severity="error">
                <AlertTitle>Erro ao cadastrar</AlertTitle>
                {error}
              </Alert>
            }
          </Stack>
        </div>
      </div>
      <Footer />
    </>
  );

}

export default CadastroUsuario
