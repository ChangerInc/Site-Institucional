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
      <div className="containerCirculo">
        <div className='containerCards'>
          <Painel />
        </div>
      </div>
      <Footer />

      </div>
      <Footer />

    </>
  )
}

export default Grupos