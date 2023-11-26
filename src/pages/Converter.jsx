import React from 'react'
import '../components/styles/arquivo-box.css';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import ArquivoBox from '../components/ArquivoBox';
import IconeComo from '../assets/Como_icone.png';
import Seguranca from '../assets/Seguranca_icone.png';
import ConversorPapeis from '../assets/Conversor_papeis.png';
import AcesseQualquerLugar from '../assets/AcesseQualquerLugar_icone.png';
import PessoasComputador from '../assets/Pessoas_Computador.png';


const Converter = () => {
  return (
    <>
      <Navbar />
      <div className='imagem'>
        <img src={ConversorPapeis} alt="Compartilhamento" style={{ width: '300px', marginBottom: '20px' }} />
        <ArquivoBox />
      </div>
      <div className='segunda-parte-pai'>
        <div className="segunda-parte">

          <div className='cardArquivo'>
            <img src={IconeComo} alt="Como" className="icone-como" />
            <div className='conteudo'>
              <h2 className="titulo-como">Como converter?</h2>
              <p className='texto-como'>Arraste e solte o seu arquivo no conversor de PDF on-line. Arquivos de Word, Excel, PPT e imagens serão convertidos para PDF. Arquivos em PDF serão convertidos para o tipo de arquivo escolhido.</p>
            </div>
          </div>

          <div className='cardArquivo'>
            <img src={Seguranca} alt="Segurança" className="icone-seguranca" />
            <div className='conteudo'>
              <h2 className="titulo-seguranca">Não se preocupe com a segurança.</h2>
              <p className='texto-seguranca'>A sua segurança é a nossa prioridade. Todos as nossas transferências de arquivos são protegidas com um nível avançado de criptografia SSL. Além disso, nós destruímos todos os arquivos automaticamente dos nossos servidores.</p>
            </div>
          </div>

          <div className='cardArquivo'>
            <img src={AcesseQualquerLugar} alt="AcesseQualquerLugar" className="icone-lugar" />
            <div className='conteudo'>
              <h2 className="titulo-lugar">Acesse de qualquer lugar.</h2  >
              <p className='texto-lugar'>Você pode acessar o conversor de arquivos PDF gratuitamente onde estiver, com uma conexão de internet. O conversor de PDF Smallpdf funciona totalmente na nuvem.</p>
            </div>
          </div>


        </div>
        <div className='imagem-container'>
          <img src={PessoasComputador} alt="Pessoas no computador" className="pessoas-computador" />
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Converter