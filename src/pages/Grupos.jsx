import React from 'react'
import CardCirculo from '../components/CardCirculo';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import '../styles/circulos.css';

const Grupos = () => {
  return (
    <>
    <Navbar />
      <div className='buttonGrupo'>
        <div class="wrapper">
          <a href="#demo-modal">Novo Grupo</a>
        </div>

        <div id="demo-modal" class="modal">
          <div class="modal__content">
            <h3>Adicionar novo grupo</h3>
            <p>
              <input type="text" placeholder='Nome do grupo' />
              <input type="email" placeholder='E-mail dos participantes' />
            </p>
            <a href="#" class="modal__close">&times;</a>
          </div>
        </div>

        <div class="wrapper">
          <a href="#demo-modal2">Deletar Grupo</a>
        </div>

        <div id="demo-modal2" class="modal2">
          <div class="modal__content2">
            <h3>Selecione o grupo</h3>
            <p>
              <input type="text" placeholder='Nome do grupo' />
            </p>
            <a href="#" class="modal__close">&times;</a>
          </div>
        </div>
      </div>

    <div className='containerCards'>
      <CardCirculo />
    </div>
    <Footer />
    </>
  )
}

export default Grupos