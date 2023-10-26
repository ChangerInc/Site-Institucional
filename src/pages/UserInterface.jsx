import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

const UserInterface = () => {

  const navigate = useNavigate();
  const id = sessionStorage?.getItem('id');
  const username = sessionStorage?.getItem('nome');

  const handleLogout = () => {
    // sessionStorage.removeItem('id');
    // sessionStorage.removeItem('nome');
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="user-container">
      <div className="texto-container">
        <h1>Bem-vindo, {username}</h1>
        <p>Obrigado por entrar no sistema da CHANGER.</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserInterface