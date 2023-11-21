
import React, { useState } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import '../styles/arquivo-box.css'

function ArquivoBox() {
  const formData = new FormData();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extensao, setExtensao] = useState('');
  const [isConverted, setIsConverted] = useState(false);
  const [isSelectVisible, setIsSelectVisible] = useState(true);

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
      setIsConverted(true);
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
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
        {isSelectVisible && !file && (
          <>
            <label for="file_upload" class="custom-file-upload-label">
              <b class="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
            </label>
            <input id="file_upload" type="file" onChange={handleFileChange} />
            <select id="select_extensao"
              value={extensao}
              onChange={handleSelectChange}
              style={{
                backgroundImage: extensao ? 'none' : 'url("/src/assets/SetaCombo.png")',
              }}>
              <option value="" selected></option>
              <option value="pdf" >pdf</option>
              <option value="png">png</option>
              <option value="docx">docx</option>
              <option value="jpeg">jpeg</option>
              <option value="txt">txt</option>
            </select>
          </>
        )}
        {file && extensao && !isSelectVisible && (
          <>
            <button onClick={handleClick}>
              {isConverted ? "Download" : "Converter"}
            </button>
            <button onClick={() => setIsSelectVisible(true)}>Alterar extensão<br /><span>Atual: {extensao}</span></button>
          </>
        )}
      </div>
      <span className="texto_box_informacao">
        Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro ou <a href="">Registrar-se</a>.
      </span>
    </div>
  );
}

export default ArquivoBox;