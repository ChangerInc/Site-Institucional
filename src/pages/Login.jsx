import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usuario } from '../api.js'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import InputText from '../components/InputText.jsx'
import InputEmail from '../components/InputEmail.jsx'
import InputSenha from '../components/InputSenha.jsx'
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import './styles-pages/login.css';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const RECAPTCHA_KEY = "6LdgHcIpAAAAAB7E0JfGD4F9I59q10Rj-0BFoiBt";
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const navigate = useNavigate();

  const handleStopLoading = () => {
    setLoading(false);
  };
  const handleStartLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    let timeout;

    if (showSucess) {
      timeout = setTimeout(() => {
        setShowSucess(false);
        navigate('/user');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [showSucess, showError, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (!isVerified) {
      setError('Por favor, verifique o reCAPTCHA');
      setShowError(true);
    } else {
      e.preventDefault();
      handleStartLoading();
      try {
        const response = await usuario.post('login',
          formData);

        if (response.status === 200) {
          setShowError(false)
          setError('')
          sessionStorage.setItem("id", response.data.userId);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("nome", response.data.nome);
          sessionStorage.setItem("foto", response.data.fotoPerfil);
          sessionStorage.setItem("email", response.data.email);
          setShowSucess(true)

        } else {
          handleStopLoading();
          throw new Error(response.data);
        }

      } catch (error) {
        if (error.response.status === 401) {
          handleStopLoading();
          setError('E-mail e/ou senha estão incorretos')
          setShowError(true);
        }
        else {
          handleStopLoading();
          console.error(error);
          setError(error.message);
        }
      } finally {
        timeout = setTimeout(() => {
          handleStopLoading();
        }, 1000);
        setShowError(true);
      }
    }

  };

  const handleRecaptchaChange = (value) => {
    setIsVerified(true);
  };

  return (
    <>
      <Navbar />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="container-login">
        <div className='container-box'>
          <div className='container-texto'>
            <h2 className='texto-cinza'>Bem vindo ao <span className='texto-preto'>CHANGER</span><span className='texto-azul'>.</span></h2>
            <h3>Não tem conta? <span className='texto-azul'><Link className="linkBox" to="/Cadastro">Cadastre-se</Link></span></h3>
          </div>

          <form onSubmit={handleSubmit} className='formulario'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <InputEmail
                formData={formData}
                handleInputChange={handleInputChange}
                hasError={error && true}
              />
              <InputSenha
                formData={formData}
                handleInputChange={handleInputChange}
                hasError={error && true}
              />
              <div className="wrapper_login">
                <a href="#demo-modal_login">Esqueci a senha</a>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_KEY}
                  onChange={handleRecaptchaChange}
                />
              </div>

              <div id="demo-modal_login" className="modal_login">
                <div className="modal__content_login">
                  <h3>Esqueceu a senha de acesso?</h3>
                  <InputText
                    key={1}
                    htmlFor={'emailRecSenha'}
                    label={'E-mail da conta'}
                    type={'email'}
                    id={'emailRecSenha'}
                    name={'emailRecSenha'}
                  />
                  <a href="#" className="modal__close_login">&times;</a>
                </div>
              </div>
              <button type="submit">Login</button>
            </Box>
          </form>
        </div>
        <div className="container-alerta">
          <Stack spacing={2}>
            {showSucess &&
              <Alert severity="success">
                <AlertTitle>Logado com sucesso!</AlertTitle>
                Redirecionando a página de usuário
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

export default Login