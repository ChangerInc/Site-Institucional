import React from 'react'
import axios from 'axios';
import '../styles/navbar.css';

function Home() {
  return (
    <>
      <div className='container-box'>
        <div className='container-texto'>
          <span className='bem-vindo'>
            Olá, "user". Boas-vindas ao <span className='changer-texto'>CHANGER</span>
            <span className='texto-azul'>.</span></span>
        </div>
      </div>
    </>
  )
}

export default Home