import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Home() {
  return (
    <div className="user-container">
      <div className="texto-container">
        <h1>Bem-vindo, usuario</h1>
        <p>Obrigado pela preferência ao sistema da CHANGER.</p>
      </div>
      <Link className='entrar' to="/Login"><button type="submit">Login</button></Link>
    </div>
  )
}

export default Home