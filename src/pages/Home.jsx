import React from 'react'
import Header from '../components/Header'
import ArquivoBox from '../components/ArquivoBox'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import '../pages/styles-pages/home.css';

function Home() {
  return (
    <>
      <div className='container-index'>
        <Header />
        <div className="container-conversao">
          <div className="texto-container">
            <h1 className='white-text'>Transforme seus arquivos <br />
              com a facilidade de um <span>click.</span></h1>
          </div>
          <i className='white-text'>Para compartilhar seus arquivos crie sua conta</i>
          <ArquivoBox />
        </div>
      </div>
      <div className='main'>
        <div className="container-sobre">
          <div className='image'></div>
          <div className='text'>
            <p>SOBRE NÓS</p>
            <h2>O que <span className='blueSpan'>fazemos</span></h2>
            <p className='completeText'>
              Uma empresa especializada na gestão e conversão de extensões de arquivos por meio de nossa Aplicação Web.
              Nossa ênfase está em armazenar seus arquivos e adaptá-los às extensões desejadas.
              Oferecemos diversos benefícios que estão adjuntos a um plano mensal, semestral ou anual.
              No qual, ocorre uma variação de valor, e funcionalidades da ferramenta.
            </p>
            <p className='destaque'>
              A relevância da <span className='blueSpan'>Changer</span> é destacada pelo fornecimento de uma solução simples e segura.
            </p>
            <button>Saiba mais!</button>
          </div>
        </div>
      </div>
      <div className="aling">
        <div className="container-opinioes">
          <div className='roundImage'></div>
          <div className='opnionText'>
            <p>COMENTARIOS</p>
            <h1>O que estão falando sobre <span className='blueSpan'>nós</span>?</h1>
            <p>'Não sei o que faria se não fosse esse site, em dias de prova e projetos em grupo.
              A facilidade em trocar as extensões e compartilhar com colegas é rápida e excelente!!'</p>
          </div>
        </div>
      </div>
      <div className='reasons'>
        <div className="containerReasons">
          <div className='containerReasonsText'>
            <h3>NOSSO SERVIÇO</h3>
            <h2>Motivos para nos escolher</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
          <div className="box">
            <div className="boxCard">
              <div className='contain'>
                <div className='boxImage'>
                  <img src="/src/assets/lampada.png" alt="" />
                </div>
                <div className="boxText">
                  <h2>NOSSO SERVIÇO</h2>
                  <p>Lorem </p>
                </div>
              </div>
            </div>
            <div className="boxCard">
              <div className='contain'>
                <div className='boxImage'>
                  <img src="/src/assets/engrenagem.png" alt="" />
                </div>
                <div className="boxText">
                  <h2>EXPERIÊNCIA </h2>
                  <p>Lorem </p>
                </div>
              </div>
            </div>
            <div className="boxCard">
              <div className='contain'>
                <div className='boxImage'>
                  <img src="/src/assets/compartilhamento.png" alt="" />
                </div>
                <div className="boxText">
                  <h2>COMPARTILHAMENTO</h2>
                  <p>Lorem </p>
                </div>
              </div>
            </div>
            <div className="boxCard">
              <div className='contain'>
                <div className='boxImage'>
                  <img src="/src/assets/timer.png" alt="" />
                </div>
                <div className="boxText">
                  <h2>FACILIDADE</h2>
                  <p>Lorem </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home