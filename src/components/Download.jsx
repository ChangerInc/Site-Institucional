import "../components/styles/historico.css"
import React, { useEffect } from 'react';
import { arquivo } from '../api';

const DownloadComponent = (props) => {
    const downloadFile = async () => {
        try {
            // Fazer a requisição para o endpoint Java
            const response = await arquivo.get(`/${props.id}`, { responseType: 'arraybuffer' });

            // Criar um Blob a partir dos bytes recebidos
            const blob = new Blob([response.data]);

            // Criar um URL temporário para o Blob
            const url = window.URL.createObjectURL(blob);

            // Criar um link temporário
            const link = document.createElement('a');
            link.href = url;
            link.download = props.nome;

            // Adicionar o link ao documento
            document.body.appendChild(link);

            // Simular o clique no link para iniciar o download
            link.click();

            // Remover o link do documento após o download
            document.body.removeChild(link);

            // Revogar o URL para liberar recursos
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };


    return (
        <>
            <div onClick={downloadFile} className="downloadImage" alt="Ícone de baixar arquivo" />
        </>
    );
};

export default DownloadComponent;