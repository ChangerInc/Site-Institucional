import React, { useState } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import '../styles/arquivo-box.css'
import fileDownload from "js-file-download";

function ArquivoBox() {
  const [file, setFile] = useState(null);
  const [extensao, setExtensao] = useState('');
  const [fileName, setFileName] = useState('');
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
  }

  const handleFileName = async () => {
    vertopal.get('/recuperar-nome')
            .then(response => {
                setFileName(response.data);
                console.log(response.data);
                handleFileDownload(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar nome do arquivo da API:', error);
            });
  }

  const handleFileDownload = async (fileName) => {
    try {
      const response = await vertopal.get("/baixar", { responseType: "blob" });
      saveAs(response.data, fileName);
      console.log(fileName);  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Upload de arquivo com React e Spring Boot</h1>
      <input type="file" onChange={handleFileChange} />
      <select value={extensao} onChange={handleSelectChange}>
        <option value="pdf">pdf</option>
        <option value="png">png</option>
        <option value="docx">docx</option>
        <option value="jpeg">jpeg</option>
        <option value="txt">txt</option>
      </select>
      <button onClick={handleFileConversion}>Converter</button>
      <button onClick={handleFileDownload}>Baixar</button>
    </div>
  );
}

export default ArquivoBox;