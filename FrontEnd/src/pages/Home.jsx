import React from 'react'
import Header from '../components/Header-white'
import ArquivoBox from '../components/ArquivoBox'
import Footer from '../components/Footer'
import '../pages/styles-pages/home.css';

function Home() {
  return (
    <>
      <div className='container-index'>
        <Header />
        <div className="container-conversao">
          <div className="texto-container">
            <h1 className='white-text'>Transforme seus arquivos <br />
              com a facilidade de um <span className='spanclick'>click.</span></h1>
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
            <h2>O que <span className='blueSpan'>fazemos</span>?</h2>
            <p className='completeText'>
              Como empresa especializada na gestão e conversão de extensões de arquivos por meio de nossa Aplicação Web.
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
            <p>Quatro motivos para você realizar conversão no nosso site.</p>
          </div>
          <div className="box">
            <div className="boxCard">
              <img src="/src/assets/lampada.png" alt="" />
              <div className="boxText">
                <h2>NOSSO SERVIÇO</h2>
                <p>Os arquivos são convertidos com rapidez e precisão, e o processo é muito simples. </p>
              </div>
            </div>
            <div className="boxCard">
              <img src="/src/assets/engrenagem.png" alt="" />
              <div className="boxText">
                <h2>EXPERIÊNCIA </h2>
                <p>A interface é intuitiva e fácil de navegar, e os resultados da conversão são muito bons. </p>
              </div>
            </div>
            <div className="boxCard">
              <img src="/src/assets/compartilhamento.png" alt="" />
              <div className="boxText">
                <h2>COMPARTILHAMENTO</h2>
                <p>A opção de baixar o arquivo convertido para o seu computador, ou de enviá-lo para outra pessoa por e-mail.</p>
              </div>
            </div>
            <div className="boxCard">
                  <img src="/src/assets/timer.png" alt="" />
                <div className="boxText">
                  <h2>FACILIDADE</h2>
                  <p>Nosso ponto forte. Sendo muito fácil de usar, até para quem não tem experiência em conversão de arquivos. </p>
                </div>
            </div>
          </div>
        </div>
      </div>


      <div className="background">
        <div className="container">
          <div className="panel pricing-table">

            <div className="pricing-plan">

              <h2 className="pricing-header">Personal</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">80MB de armazenamento
                </li>
                <li className="pricing-features-item">Não pode criar grupos
                </li>
                <li className="pricing-features-item">Não pode participar de circulos

                </li>
                <li className="pricing-features-item">Criptografia de arquivos
                </li>
              </ul>
              <span className="pricing-price-free">Free</span>
              <a href="#/" className="pricing-button-free">ENTRE</a>
            </div>

            <div className="pricing-plan">

              <h2 className="pricing-header">Pro</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">100MB de armazenamento
                </li>
                <li className="pricing-features-item">Criação de circulos
                </li>
                <li className="pricing-features-item">Participação de circulos (Limitado)

                </li>
                <li className="pricing-features-item">Compartilhamento de arquivo
                </li>
                <li className="pricing-features-item">Criptografia de arquivos

                </li>
                <li className="pricing-features-item">Até 3 grupos

                </li>

              </ul>
              <span className="pricing-price">2 a 3 pessoas R$10,00</span>
              <a href="#/" className="pricing-button is-featured">GRUPOS</a>
            </div>

            <div className="pricing-plan">

              <h2 className="pricing-header">Premium</h2>
              <ul className="pricing-features">
                <li className="pricing-features-item">210MB de armazenamento
                </li>
                <li className="pricing-features-item">Criação de circulos
                </li>
                <li className="pricing-features-item">Participação de circulos (sem limite)
                </li>
                <li className="pricing-features-item">Compartilhamento de arquivo
                </li>
                <li className="pricing-features-item">Criptografia de arquivos
                </li>
                <li className="pricing-features-item">Histórico de arquivos</li>
              </ul>
              <span className="pricing-price">31 a 100 pessoas R$8,00</span>
              <a href="#/" className="pricing-button">EMRPESAS</a>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home