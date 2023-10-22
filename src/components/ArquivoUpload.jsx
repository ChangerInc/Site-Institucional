import React, { useState } from 'react';
import './style/ArquivoUpload.css'

function ArquivoUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = "r.WVA7-b28g3E_rJFGc_grmsismKnqgF4xG0YCqaaoMPDCRCoHZmpyKyqwuGUETgkGrY9duG0hXB.i8u6mB5koD4KnFN4VjzyHsrqDEn7ia_2uJQf-5UCl8IsKQ";

    // Aqui você pode enviar o arquivo para a API
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://api.vertopal.com/v1/upload/file', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Exemplo de cabeçalho adicional, se necessário
                // Outros cabeçalhos, se necessário
              },
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Arquivo enviado com sucesso');
          // Lógica adicional após o envio bem-sucedido
        } else {
          console.error('Erro ao enviar o arquivo');
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    }
  };

  return (
    <div class = "objetoEnviar">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ArquivoUpload;
