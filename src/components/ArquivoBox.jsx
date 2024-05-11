import React, { useState, useEffect, useRef } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import './styles/arquivo-box.css';

function ArquivoBox({ isLoggedIn }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extensao, setExtensao] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [conversionOptions, setConversionOptions] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lottieRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsConverted(false);
    setFile(selectedFile);
    setFileName(selectedFile.name);
    handleFileUpload(selectedFile);
    setIsInputClicked(true);

    let options = [];
    if (selectedFile) {
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      switch (extension) {
        case 'txt':
          options = ['PDF', 'DOC', 'XLSX', 'CSV'];
          break;
        case 'pdf':
          options = ['TXT', 'DOCX'];
          break;
        case 'docx':
          options = ['TXT', 'PDF'];
          break;
        case 'xlsx':
          options = ['TXT', 'PDF', 'DOCX', 'CSV'];
          break;
        case 'csv':
          options = ['PDF', 'XLSX'];
          break;
        case 'jpg':
          options = ['PNG', 'GIF', 'SVG', 'PSD', 'WEBP', 'RAW', 'TIFF', 'BMP', 'JPEG', 'PDF'];
          break;
        case 'jpeg':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'PSD', 'WEBP', 'RAW', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'png':
          options = ['JPG', 'GIF', 'SVG', 'PSD', 'WEBP', 'TIFF', 'BMP'];
          break;
        case 'gif':
          options = ['JPG', 'PNG', 'SVG', 'PSD', 'WEBP', 'RAW', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'svg':
          options = ['JPG', 'PNG', 'GIF', 'PSD', 'WEBP', 'RAW', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'psd':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'WEBP', 'RAW', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'webp':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'PSD', 'RAW', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'raw':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'PSD', 'WEBP', 'TIFF', 'BMP', 'PDF'];
          break;
        case 'tiff':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'PSD', 'WEBP', 'RAW', 'BMP', 'PDF'];
          break;
        case 'bmp':
          options = ['JPG', 'PNG', 'GIF', 'SVG', 'PSD', 'WEBP', 'RAW', 'TIFF', 'PDF'];
          break;
      }
    }
    setConversionOptions(options);
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

      setIsLoading(true);

      vertopal
        .post("/enviar", formData)
        .then((response) => {
          const element = document.getElementById('arquivo-box');
          if (response.status === 200) {
            element.style.background = '#26c736';
            if (extensao !== '') {
              setIsSelectVisible(false);
            }
          }
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          // Finaliza o estado de carregamento
          setIsLoading(false);
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
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log('Conversão não suportada')
          setShowError(true);
        }
        console.error(error);
      })
      .finally(() => {
        handleUrl();
      });
  };

  const handleUrl = () => {
    vertopal
      .get("/url")
      .then((response) => {
        console.log(response.data);
        setFileName(response.data);
        setIsConverted(true);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsPlaying(false);
        document.getElementById('consersion-download').style.display = 'flex';
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
    setIsInputClicked(false);
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
    <div className="caixa_de_conversao"> {isLoading && <style>{`.container_input_e_select { display: none; } .texto_box_informacao { display: none; }`}</style>}
      {/* Renderiza a div de sobreposição se isLoading for true */}
      {isLoading && (
        <div className="loading-overlay">
          <Player
            lottieRef={lottieRef}
            autoplay={true}
            loop={true}
            src="https://lottie.host/a8684338-19bc-4dcf-9254-83d05b85977d/7XQhM9o07g.json"
            style={{ height: '200px', width: '200px' }}
          ></Player>
        </div>
      )}
      <div className="container_input_e_select">
        {(isSelectVisible || !file) && (
          <>
            <label id="arquivo-box" htmlFor="file_upload" className="custom-file-upload-label">
              <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span style={{ fontSize: '16px' }}>{fileName.slice(0, 28)}...</span>}</b>
            </label>
            <input id="file_upload" type="file" onChange={handleFileChange} />

            {isInputClicked && (
              <select
                id="select_extensao"
                value={extensao}
                onChange={handleSelectChange}
                style={{
                  backgroundImage: extensao ? 'none' : 'url("/src/assets/SetaCombo.png")',
                }}
              >
                <option defaultValue={0}></option>
                {conversionOptions.map((option, index) => (
                  <option key={index} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            )}
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
        <>
          {isLoggedIn ? (
            <span className="texto_box_informacao">
              Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro.
            </span>
          ) : (
            <span className="texto_box_informacao">
              Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro ou <Link href="" to="/cadastro">Registrar-se</Link>.
            </span>
          )}

        </>
      )}
    </div>
  );
}

export default ArquivoBox;
