import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import './styles-pages/user-interface.css'
import { format } from 'date-fns';

const UserInterface = () => {
  const navigate = useNavigate();
  const username = sessionStorage?.getItem('nome');
  const id = sessionStorage?.getItem('id');
  const [historico, setHistorico] = useState([]);
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/historico-conversao/usuario/${id}`);
        console.log(response.data);
        setHistorico(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistorico();
  }, []);

  // function importAllImages(r) {
  //   let images = {};
  //   r.keys().forEach(key => (images[key] = r(key)));
  //   return images;
  // }
  
  // const imagens = importAllImages(
  //   require.context("../assets/icones/", false, /\.(png|jpe?g|svg)$/)
  // );
  

  return (
    <>
    <Header />
      <div className="user-container">
        <div className="texto-container">
          <h1>Bem-vindo, {username}</h1>
          <div className='auxTexto'>            
            <p>Obrigado por entrar no sistema da</p><b>CHANGER</b><div className='ponto'>.</div>
          </div>
        </div>
      </div>
      {historico.map((hist, index) => (
        <div className="historico" key={index}>
          <img src={icon} />
          <p>{hist.nome}</p>
          <p>{format(new Date(hist.dataConversao), 'dd/MM/yy HH:mm')}</p>
        </div>
      ))}
      <Footer />
    </>
  )
}

export default UserInterface