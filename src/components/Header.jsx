import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import changerLogo from '../assets/Logo/changer_black.png'
import NotificationIcon from './NotificationIcon.jsx';
import Avatar from '@mui/material/Avatar';
import Menu from "../components/Menu";
import ProfileModal from './ProfileModal';
import "./styles/navbar.css"
import { usuario } from '../api.js';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const fetchNotificationCount = async () => {
    try {
      const response = await usuario.get(`/notificacoes/${sessionStorage.getItem('email')}`);
      setNotificationCount(response.data);
    } catch (error) {
      console.error('Erro ao obter contagem de notificações:', error);
    }
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('id') != undefined;
    setIsLoggedIn(isAuthenticated);
    fetchNotificationCount();
  }, []);

  return (
    <>
      <ProfileModal
        modalOpen={modalPerfilIsOpen}
        handleProfileModal={handleProfileModalClick}
      />
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
                  Círculos
                </Link>
              </li>
              <li>
                <NotificationIcon
                  count={notificationCount}
                  updateCount={fetchNotificationCount}
                  color={'black'}
                />
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
    </>
  )
}

export default Header