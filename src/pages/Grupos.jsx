import React from 'react'
import CardCirculo from '../components/CardCirculo';
import Navbar from '../components/Header';
import Painel from '../components/Painel';
import Footer from '../components/Footer';
import './styles-pages/circulos.css';

const Grupos = () => {
  return (
    <>
      <Navbar />
      <Painel />
      <div className="containerCirculo">
        <div className='containerCards'>
          <CardCirculo />
        </div>
      </div>
      <Footer />

    </>
  )
}

export default Grupos