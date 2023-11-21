
import React, { useState } from "react";
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';
import './styles/arquivo-box.css'

function ArquivoBox() {
  const formData = new FormData();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extensao, setExtensao] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  function handleLoading() {
    setLoading(true);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);

    handleFileUpload(event.target.files[0]);
  };

  const handleSelectChange = (event) => {
    setExtensao(event.target.value);
    if (file) {
      setIsSelectVisible(false);
    }
  }

  const handleFileUpload = async (file) => {
    if (file) {
      formData.append("file", file);
      try {
        const response = await vertopal.post("/enviar",
          formData
        );
        const element = document.getElementById('arquivo-box');
        if (response.status == 200) {
          element.style.border = '3px solid #8eef80';
          element.style.width = 'calc(290px - 6px)';
          element.style.height = 'calc(60px - 6px)';
          if (extensao != '') {
            setIsSelectVisible(false);
          }
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileConversion = async () => {
    formData.append("extensao", extensao);
    try {
      const response = await vertopal.post("/converter",
        formData
      );
      console.log(response.data);
      if (response.status == 200) {
        setIsConverted(true);
        setLoading(false);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      handleUrl();
    }
  }

  const handleUrl = async () => {
    try {
      const response = await vertopal.get("/url");
      setFileName(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileDownload = async () => {
    try {
      const response = await vertopal.get("/baixar", { responseType: "blob" });
      saveAs(response.data, `${fileName}`);
      console.log(response.data);
      if (response.status = 200) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFile(null);
      setFileName('');
      setIsSelectVisible(true);
      setExtensao('');
    }
  };

  const handleClick = () => {
    handleLoading();
    const btnExtensao = document.getElementById('alterar-extensao');
    btnExtensao.style.display = 'none';
    if (isConverted) {
      // Lógica de download aqui
      handleFileDownload();
      console.log("Download");
    } else {
      // Lógica de conversão aqui
      handleFileConversion();
      console.log("Converter");
    }
  };

  return (

    <div className="caixa_de_conversao">
      <div className="container_input_e_select">
        {(isSelectVisible || !file) && (
          <>
            <label id="arquivo-box" htmlFor="file_upload" className="custom-file-upload-label">
              <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
            </label>
            <input id="file_upload" type="file" onChange={handleFileChange} />
            <select id="select_extensao"
              value={extensao}
              onChange={handleSelectChange}
              style={{
                backgroundImage: extensao ? 'none' : 'url("/src/assets/SetaCombo.png")',
              }}>
              <option defaultValue={0}></option>
              <option value="pdf" >PDF</option>
              <option value="png">PNG</option>
              <option value="docx">DOCX</option>
              <option value="jpeg">JPEG</option>
              <option value="txt">TXT</option>
            </select>
          </>
        )}
        {!isSelectVisible && (
          <>
            <button id="consersion-download" onClick={handleClick} disabled={loading}>
              {isConverted ? "Download" : "Converter"}
              {loading ? (
                <ClipLoader color="#ffffff" loading={loading} css={css`margin-right: 5px;`} size={15} />
              ) : (
                ''
              )}
            </button>
            <button id="alterar-extensao" onClick={() => setIsSelectVisible(true)}>Alterar extensão<span>Atual: {extensao}</span></button>
          </>
        )}
      </div>
      <span className="texto_box_informacao">
        Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro ou <Link href="" to="/cadastro">Registrar-se</Link>.
      </span>
    </div>
  );
}

export default ArquivoBox;