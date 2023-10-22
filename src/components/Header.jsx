import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import changerLogo from '../assets/Logo/changer_black.png'

const Header = () => {

    const navigate = useNavigate();

  return (
    <nav className="navbar">
          <img className='logo' src={changerLogo} alt="Logo" />
          <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/converter">Converter</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
        </ul>
      </nav>
  )
}

export default Header