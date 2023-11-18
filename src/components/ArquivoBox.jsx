import React, { useState } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import '../styles/arquivo-box.css'

function ArquivoBox() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extensao, setExtensao] = useState('');
  const formData = new FormData();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    handleFileUpload(event.target.files[0]);
  };

  const handleSelectChange = (event) => {
    setExtensao(event.target.value);
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

  return (
    
    <div className="caixa_de_conversao">
      <div className="container_input_e_select">
<<<<<<< Updated upstream
        <label for="file_upload" class="custom-file-upload-label">
          <b class="bold_selecionar_arquivo">Selecionar Arquivo</b>
        </label>
          <input id="file_upload" type="file" onChange={handleFileChange} />
=======
        <div className="div_imitando_input">
          <input  type="file" onChange={handleFileChange} />
        </div>
>>>>>>> Stashed changes
        <select value={extensao} onChange={handleSelectChange}>
          <option value="0" selected></option>
          <option value="pdf" >pdf</option>
          <option value="png">png</option>
          <option value="docx">docx</option>
          <option value="jpeg">jpeg</option>
          <option value="txt">txt</option>
        </select>
      </div>
      <span className="texto_box_informacao">
        Solte os arquivos aqui. 100 MB tamanho máximo do ficheiro ou <a href="">Registrar-se</a>.
      </span>
      {/*       <button onClick={handleFileConversion}>Converter</button>
      <button onClick={handleFileDownload}>Baixar</button> */}
    </div>
  );
}

export default ArquivoBox;