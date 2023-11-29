import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/styles/historico.css"
import { historico, usuario } from "../api";
import DownloadComponent from './Download';
// PNGs das extensões
import aviIcon from '../assets/icones/avi.png';
import docxIcon from '../assets/icones/doc.png';
import zipIcon from '../assets/icones/zip.png';
import gifIcon from '../assets/icones/gif.png';
import jpegIcon from '../assets/icones/jpeg.png';
import mp3Icon from '../assets/icones/mp3.png';
import pdfIcon from '../assets/icones/pdf.png';
import pngIcon from '../assets/icones/png.png';
import pptIcon from '../assets/icones/ppt.png';
import psdIcon from '../assets/icones/psd.png';
import svgIcon from '../assets/icones/svg.png';
import txtIcon from '../assets/icones/txt.png';
import xlsIcon from '../assets/icones/xls.png';

const Historico = (props) => {
    const [showDownload, setShowDownload] = useState(false);
    const navigate = new useNavigate();
    const iconPaths = {
        avi: aviIcon,
        docx: docxIcon,
        zip: zipIcon,
        gif: gifIcon,
        jpeg: jpegIcon,
        mp3: mp3Icon,
        pdf: pdfIcon,
        png: pngIcon,
        ppt: pptIcon,
        psd: psdIcon,
        svg: svgIcon,
        txt: txtIcon,
        xls: xlsIcon,
    };

    async function deleteArquivo() {
        console.log(props.idConversao);
        usuario
            .delete(`/excluir/${sessionStorage?.getItem("id")}/${props.idConversao}`)
            .then((response) => {
                console.log(response.data);
                if (response.ok) {
                    navigate("/user");
                }
            })
            .catch(error => {
                console.error('Erro ao apagar arquivo:', error);
            });
    }

    const baixar = () => {
        setShowDownload(true);
    }

    return (
        <div className="historico">
            <div className="espacamento margem">
                <img src={iconPaths[props.extensaoAtual]} alt={props.extensaoAtual} />
                <p>{props.nome}</p>
            </div>
            <div className="espacamento">
                <p>{props.dataConversao}</p>
            </div>
            <div className="espacamento">
                <p>{props.extensaoInicial}</p>
            </div>
            <div className="espacamento">
                <p>{props.extensaoAtual}</p>
            </div>
            <div className="deleteDownload">
                {/* <div onClick={baixar} className="downloadImage" alt="Ícone de baixar arquivo" /> */}
                {/* Renderiza o DownloadComponent quando showDownload for true */}
                {/* {showDownload && } */}
                <DownloadComponent id={props.idConversao} nome={props.nome} />
                <div onClick={deleteArquivo} className='deleteImage' />
            </div>
        </div>
    );
}

export default Historico;