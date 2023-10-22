import React, { useState } from 'react';
import axios from 'axios';
import changerLogo from '../assets/Logo/changer_black.png'
import './style/header.css';



function Header() {
  return (
    <div>
      <nav className="cabecalho">
        <div>
        <img className='logo' src={changerLogo} alt="Logo" />
        </div>  
        <div className='container-menu'>
        <ul className='menu'>
        <li>
          <span>Home</span>
        </li>
        <li>
          <span>Sobre nós</span>
        </li>
        <li>
          <span>Contato</span>
        </li>
        <li>
          <span>Cadastro</span>
        </li>
      </ul>
        </div>
    </nav>
    </div>
  );
}

export default Header;
