import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import changerLogo from '../assets/Logo/changer_black.png'
import "./styles/navbar.css"
import ProfileModal from './ProfileModal';
import { usuario } from '../api.js';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('id') != undefined;
    setIsLoggedIn(isAuthenticated);
    const fetchNotificationCount = async () => {
      try {
        const response = await usuario.get(`/notificacoes/${sessionStorage.getItem('email')}`);
        setNotificationCount(response.data);
      } catch (error) {
        console.error('Erro ao obter contagem de notificações:', error);
      }
    };
    fetchNotificationCount();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  const profileOptions = ['Sair'];


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
              <Link className="linkNav" to="/notificacoes">
                <div className="divFotoPerfil">
                {notificationCount > 0 && (
                    <span className="notification-count">{notificationCount}</span>
                  )}
                  <img className='fotoNavbar' src='src/assets/packard-bell.png'/>
                </div>
              </Link>
            </li>
            <li>
              <Link className="linkNav">
                <div className="divFotoPerfil">
                  <img className='fotoNavbar' onClick={handleProfileClick} src={`data:image/png;base64,${sessionStorage.foto}`} />
                </div>
                <ProfileModal
                  isOpen={isProfileModalOpen}
                  onRequestClose={handleProfileClick}
                  options={profileOptions}
                />
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