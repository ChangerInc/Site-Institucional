import React, { useState, useEffect } from 'react';
import { saveAs } from "file-saver";
import { arquivo } from '../api';
import ProgressBox from './ProgressBox';
import 'react-circular-progressbar/dist/styles.css';
import "../components/styles/historico.css"

const DownloadComponent = ({ loadingState, idCirculo, idArquivo, nome }) => {
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const idUsuario = sessionStorage?.getItem('id');

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleDownloadFileHistoricOrCircle = () => {
        setLoading(true)
        if (idCirculo) {
            downloadFileInCircle()
        } else {
            downloadFileInHistoric()
        }
    }

    const downloadFileInCircle = async () => {
        try {
            const response = await arquivo.get(
                `/circulo/${idCirculo}/${idArquivo}`,
                { responseType: "blob" });
            saveAs(response.data, nome)
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadFileInHistoric = async () => {
        try {
            const response = await arquivo.get(
                `/${idUsuario}/${idArquivo}`,
                { responseType: "blob" });
            saveAs(response.data, nome)
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                {loading ? (
                    <ProgressBox value={progress} />
                ) : (
                    <div onClick={handleDownloadFileHistoricOrCircle} className="downloadImage" alt="Ícone de baixar arquivo" />
                )}
            </div>
        </>
    );
};

export default DownloadComponent;