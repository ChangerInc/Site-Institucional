import React, { useState, useRef } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import './styles/arquivo-box.css';

function ArquivoBox() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extensao, setExtensao] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const lottieRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    handleFileUpload(selectedFile);
  };

  const handleSelectChange = (event) => {
    setExtensao(event.target.value);
    if (file) {
      setIsSelectVisible(false);
    }
  }

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      if (sessionStorage.getItem("id") != null) {
        formData.append("user", sessionStorage.getItem("id"));
      }

      console.log(sessionStorage.getItem("id"))
      vertopal
        .post("/enviar", formData)
        .then((response) => {
          const element = document.getElementById('arquivo-box');
          if (response.status === 200) {
            element.style.border = '3px solid #8eef80';
            element.style.width = 'calc(290px - 6px)';
            element.style.height = 'calc(60px - 6px)';
            if (extensao !== '') {
              setIsSelectVisible(false);
            }
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleFileConversion = () => {
    const conversionFormData = new FormData();
    conversionFormData.append("extensao", extensao);

    vertopal
      .post("/converter", conversionFormData)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setIsConverted(true);
          setIsPlaying(false);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        document.getElementById('consersion-download').style.display = 'flex';
        handleUrl();
      });
  };

  const handleUrl = () => {
    vertopal
      .get("/url")
      .then((response) => {
        setFileName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileDownload = () => {
    vertopal
      .get("/baixar", { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, `${fileName}`);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        resetState();
      });
  };

  const resetState = () => {
    setFile(null);
    setFileName('');
    setIsSelectVisible(true);
    setExtensao('');
  };

  const handleClick = () => {
    document.getElementById('alterar-extensao').style.display = 'none';
    if (isConverted) {
      handleFileDownload();
      console.log("Download");
    } else {
      setIsPlaying(true);
      document.getElementById('consersion-download').style.display = 'none';
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
            <select
              id="select_extensao"
              value={extensao}
              onChange={handleSelectChange}
              style={{
                backgroundImage: extensao ? 'none' : 'url("/src/assets/SetaCombo.png")',
              }}
            >
              <option defaultValue={0}></option>
              <option value="pdf">PDF</option>
              <option value="png">PNG</option>
              <option value="docx">DOCX</option>
              <option value="jpeg">JPEG</option>
              <option value="txt">TXT</option>
            </select>
          </>
        )}
        {!isSelectVisible && (
          <>
            <button id="consersion-download" onClick={handleClick}>
              {isConverted ? "Download" : "Converter"}
            </button>
            <button id="alterar-extensao" onClick={() => setIsSelectVisible(true)}>
              Alterar extensão<span>Atual: {extensao}</span>
            </button>
            {isPlaying && (
              <Player
                lottieRef={lottieRef}
                autoplay={true}
                loop={true}
                src="https://lottie.host/83fa29a2-5510-464f-987e-05cb2fbb1fc5/FnH2MtYORH.json"
                style={{ height: '150px', width: '150px' }}
              ></Player>
            )}
          </>
        )}
      </div>
      {isSelectVisible && (
        <span className="texto_box_informacao">
          Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro ou <Link href="" to="/cadastro">Registrar-se</Link>.
        </span>
      )}
    </div>
  );
}

export default ArquivoBox;
