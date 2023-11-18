import React from 'react'
import CardCirculo from '../components/CardCirculo';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import '../styles/circulos.css';

const Grupos = () => {
  return (
    <>
    <Navbar />
    <div className='containerCards'>
      <CardCirculo />
    </div>
    <Footer />
    </>
  )
}

export default Grupos