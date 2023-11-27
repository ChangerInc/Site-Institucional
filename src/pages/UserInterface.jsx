import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import './styles-pages/user-interface.css'
import { format } from 'date-fns';
import aviIcon from '../assets/icones/avi.png';
import docxIcon from '../assets/icones/doc.png';
import zipIcon from '../assets/icones/zip.png';
import gifIcon from '../assets/icones/gif.png';
import jpegIcon from '../assets/icones/jpeg.png';
import mp3Icon from '../assets/icones/mp3.png';
import pdfIcon from '../assets/icones/pdf.png';
import pngIcon from '../assets/icones/png.png';
import pptIcon from '../assets/icones/ppt.png';
import psdIcon from '../assets/icones/psd.png';
import svgIcon from '../assets/icones/svg.png';
import txtIcon from '../assets/icones/txt.png';
import xlsIcon from '../assets/icones/xls.png';

const UserInterface = () => {
  const navigate = useNavigate();
  const username = sessionStorage?.getItem('nome');
  const id = sessionStorage?.getItem('id');
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/historico-conversao/usuario/${id}`);
        console.log(response.data);
        setHistorico(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistorico();
  }, []);

  const iconPaths = {
    avi: aviIcon,
    docx: docxIcon,
    zip: zipIcon,
    gif: gifIcon,
    jpeg: jpegIcon,
    mp3: mp3Icon,
    pdf: pdfIcon,
    png: pngIcon,
    ppt: pptIcon,
    psd: psdIcon,
    svg: svgIcon,
    txt: txtIcon,
    xls: xlsIcon,
  };

  return (
    <>
      <Header />
      <div className="user-container">
        <div className="texto-container">
          <h1>Bem-vindo, {username}</h1>
          <div className='auxTexto'>
            <p>Obrigado por entrar no sistema da</p><b>CHANGER</b><div className='ponto'>.</div>
          </div>
        </div>
      </div>
      <div className="boxPai">
        <div className="box">
          <div className="historico cabecalho">
            <div className="espacamento">
              <b>Nome</b>
            </div>
            <div>
              <b>Data de criação:</b>
            </div>
            <div>
              <b>Extensão inicial</b>
            </div>
            <div>
              <b>Extensão atual</b>
            </div>
          </div>
          {historico.map((hist, index) => (
            <div className="historico" key={index}>
              <div className="espacamento">
                <img src={iconPaths[hist.extensaoAtual]} alt={hist.extensaoAtual} />
                <p>{hist.nome}</p>
              </div>
              <div>
                <p>{format(new Date(hist.dataConversao), 'dd/MM/yy HH:mm')}</p>
              </div>
              <div>
                <p>{hist.extensaoInicial}</p>
              </div>
              <div>
                <p>{hist.extensaoAtual}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserInterface