import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import changerLogo from '../assets/Logo/changer_black.png'
import "./styles/navbar.css"

const Header = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('id') != undefined;
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <img className='logo' src={changerLogo} alt="Logo" />
      <ul className="navList">
        <li>
          <Link className="linkNav" to="/">Home</Link>
        </li>
        <li>
          <Link className="linkNav" to="/converter">Converter</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link className="linkNav" to="/user">
                Histórico
              </Link>
            </li>
            <li>
              <Link className="linkNav" to="/grupo">
                Circulos
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="linkNav" to="/">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="linkNav" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="linkNav" to="/cadastro">
                Cadastro
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Header