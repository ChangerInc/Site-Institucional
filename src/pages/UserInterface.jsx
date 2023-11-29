import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Historico from '../components/Historico';
import './styles-pages/user-interface.css'
import { format } from 'date-fns';
import { usuario, historico } from "../api";


const UserInterface = () => {
  const username = sessionStorage?.getItem('nome');
  const id = sessionStorage?.getItem('id');
  const [historicoArq, setHistorico] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    handleFileUpload(selectedFile);
  };

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      console.log(sessionStorage.getItem("id"));

      usuario
        .post(`/upload/${sessionStorage.getItem("id")}`, formData)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);            
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setFileName("Salvar arquivo");
          fetchHistorico();
        });
    }
  };

  
  const fetchHistorico = async () => {
    historico.get(`/usuario/${id}`)
      .then(response => {
        if (response.status === 204) {
          console.warn("Não há arquivos no histórico");
        } else {
          console.log(response.data);
          setHistorico(response.data);          
        }})
      .catch(error => {
        console.log(error);
      });
  }
  

  useEffect(() => {
    fetchHistorico();
  }, []);

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
        <label id="arquivo-box" htmlFor="file_upload" className="custom-file-upload-label">
          <b className="bold_selecionar_arquivo">{file == null ? "Salvar arquivo" : <span>{fileName}</span>}</b>
        </label>
        <input id="file_upload" type="file" onChange={handleFileChange} />
      </div>
      <div className="boxPai">
        <div className="box">
          <div className="historico cabecalho">
            <div className="espacamento margem">
              <b>Nome</b>
            </div>
            <div className="espacamento">
              <b>Data de criação</b>
            </div>
            <div className="espacamento">
              <b>Extensão inicial</b>
            </div>
            <div className="espacamento">
              <b>Extensão atual</b>
            </div>
          </div>
          {(historicoArq.length == 0) ? (
            <>
              <div className='msgSemArq'>
                <b>
                  Não há arquivos recentes, faça upload ou converta algum arquivo para vê-los aqui
                </b>
              </div>
            </>
          ) : (
            historicoArq.map((hist, index) => (
              <Historico
                key = {index}
                idConversao = {hist.idConversao}
                nome = {hist.nome}
                dataConversao = {format(new Date(hist.dataConversao), 'dd/MM/yy HH:mm')}
                extensaoAtual = {hist.extensaoAtual}
                extensaoInicial = {hist.extensaoInicial}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserInterface