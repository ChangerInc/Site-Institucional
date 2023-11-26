import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import './styles-pages/user-interface.css'
import icon from "../assets/lampada.png"

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
        const response = await axios.get(`http://localhost:8080/historico-conversao/usuario`);
        console.log(response.data);
        setHistorico(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistorico();
  }, []);

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
          <p>15/11/2023 16:10</p>
        </div>
      ))}
      <Footer />
    </>
  )
}

export default UserInterface