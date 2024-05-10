import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from "../components/Menu";
import changerLogo from '../assets/Logo/changer_white.png'
import ProfileModal from './ProfileModal';
import { usuario } from '../api.js';
import "./styles/navbar-white.css"

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modalPerfilIsOpen, setModalPerfilIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleProfileModalClick = () => {
    setModalPerfilIsOpen(!modalPerfilIsOpen)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    {
      text: 'Mudar foto',
      onClick: handleProfileModalClick
    },
    {
      text: 'Sair',
      onClick: handleLogout
    }
  ];

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

  return (
    <>
      <ProfileModal
        modalOpen={modalPerfilIsOpen}
        handleProfileModal={handleProfileModalClick}
      />
      <nav className="navbar-white">
        <img className='logo' src={changerLogo} alt="Logo" />
        <ul className="navList-white">
          <li>
            <Link className="linkNav-white" to="/">Home</Link>
          </li>
          <li>
            <Link className="linkNav-white" to="/converter">Converter</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link className="linkNav-white" to="/user">
                  Histórico
                </Link>
              </li>
              <li>
                <Link className="linkNav-white" to="/grupo">
                  Circulos
                </Link>
              </li>
              <li>
                <Link className="linkNav" to="/notificacoes">
                  <div className="divFotoPerfil">
                    {notificationCount > 0 && (
                      <span className="notification-count">{notificationCount}</span>
                    )}
                    <img className='fotoNavbar' src='src/assets/packard-bell.png' />
                  </div>
                </Link>
              </li>
              <li>
                <div>
                  <Avatar className='fotoNavbar' alt="Remy Sharp" onClick={handleClick} src={sessionStorage.foto} />
                  <Menu
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    menuItems={menuItems}
                  />
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="linkNav-white" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="linkNav-white" to="/cadastro">
                  Cadastro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Header