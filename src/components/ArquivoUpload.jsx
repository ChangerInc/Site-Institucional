import React, { useState } from "react";
import { vertopal } from "../api";

function ArquivoUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
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

  return (
    <div className="App">
      <h1>Upload de arquivo com React e Spring Boot</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Enviar</button>
    </div>
  );
}

export default ArquivoUpload;