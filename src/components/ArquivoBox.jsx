import React, { useState } from "react";
import { vertopal } from "../api";
import { saveAs } from "file-saver";
import '../styles/arquivo-box.css'
import { json } from "react-router-dom";

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
      const response = await vertopal.get("/baixar", { responseType : "blob" } );
      saveAs(response.data, `${fileName}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>CHANGER.</h1>
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