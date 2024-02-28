import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuario } from '../api.js';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Navbar from '../components/Header';
import InputNome from '../components/InputNome.jsx';
import InputEmail from '../components/InputEmail.jsx';
import InputSenha from '../components/InputSenha.jsx';
import InputConfirmarSenha from '../components/InputConfirmarSenha.jsx';
import Footer from '../components/Footer';
import './styles-pages/cadastro.css';

function CadastroUsuario() {
  const navigate = useNavigate();
  const [showSucess, setShowSucess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
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

    if (formData.senha !== formData.confirmar) {
      setError((prevError) => ({
        confirmar: 'tem que ser igual senha',
        ...prevError,
      }));
      setShowError(true);
      return;
    }

    try {
      const response = await usuario.post('/', formData);

      if (response.status === 201) {
        setShowError(false);
        console.log('Cadastrado com sucesso!');
        setShowSucess(true);
      }

      

    } catch (error) {
      if (error.response.status === 409) {
        setError((prevError) => ({
          email: 'Esse e-mail já está sendo utilizado',
          ...prevError,
        }));
        setShowError(true);
      } else {
        setShowError(true);
        setError(error.response.data);
        console.log(error.response.data)
      }
        
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-cadastro">
        <div className="container-box">
          <div className="container-texto">
            <h2 className="texto-cinza">
              Bem vindo ao <span className="texto-preto">CHANGER</span>
              <span className="texto-azul">.</span>
            </h2>
            <h3>
              Já tem conta?{' '}
              <span className="texto-azul">
                <Link className="linkBox" to="/Login">
                  Faça login
                </Link>
              </span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="formulario">
            <InputNome
              formData={formData}
              handleInputChange={handleInputChange}
              hasError={error.nome && true}
            />
            <InputEmail
              formData={formData}
              handleInputChange={handleInputChange}
              hasError={error.email && true}
            />
            <InputSenha
              formData={formData}
              handleInputChange={handleInputChange}
              hasError={error.senha && true}
            />
            <InputConfirmarSenha
              formData={formData}
              handleInputChange={handleInputChange}
              hasError={formData.senha != formData.confirmar && true}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <div className="container-alerta">
          <Stack spacing={2}>
            {showSucess && (
              <Alert severity="success">
                <AlertTitle>Cadastrado com sucesso!</AlertTitle>
                Bem vindo a familia Changer!
              </Alert>
            )}
            {error !== '' && showError && (
              <Alert severity="error">
                <AlertTitle>Erro ao cadastrar</AlertTitle>
                {Object.keys(error).reverse().map((key, index) => (
                  <div key={index}>
                    <strong>{key}: </strong>
                    {error[key]}
                  </div>
                ))}
              </Alert>
            )}
          </Stack>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CadastroUsuario;