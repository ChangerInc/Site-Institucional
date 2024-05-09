import "../components/styles/historico.css"
import React, { useEffect } from 'react';
import { saveAs } from "file-saver";
import { arquivo } from '../api';

const DownloadComponent = (props) => {
    const id = sessionStorage?.getItem('id');
    const downloadFile = async () => {
        try {
            // Fazer a requisição para o endpoint Java
            const response = await arquivo.get(`/${id}/${props.id}`, { responseType: "blob" });
            saveAs(response.data, props.nome)
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