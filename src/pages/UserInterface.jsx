import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Historico from '../components/Historico';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './styles-pages/user-interface.css'
import { format } from 'date-fns';
import { usuario, arquivo } from "../api";


const UserInterface = () => {
  const username = sessionStorage?.getItem('nome');
  const id = sessionStorage?.getItem('id');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      console.log(sessionStorage.getItem("id"));

      arquivo
        .post(`/${sessionStorage.getItem("id")}`, formData)
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
          setLoading(true);
          fetchHistorico();
          window.location.reload();
        });
    }
  };


  const fetchHistorico = async () => {
    arquivo.get(`/${id}`)
      .then(response => {
        if (response.status === 204) {
          console.log("Não há arquivos no histórico");
        } else {
          console.log(response.data);
          setHistorico(response.data);
        }
      })
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
          {(historicoArq.length == 0) ? (
            <>
              <div className='msgSemArq'>
                <b>
                  Não há arquivos salvos no seu histórico, faça conversões ou salve arquivos
                </b>
              </div>
            </>
          ) : (
            <Historico
              key={1}
              idCirculo={null}
              idConversao={historicoArq.idArquivo}
              historico={historicoArq}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserInterface