import React from 'react'
import "../components/styles/historico.css"
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

    // async function deleteCircle(event) {
    //     const ids = {
    //         idCirc: props.idCirculo,
    //         idDono: props.idDono
    //     };

    //     circulo
    //         .delete('/', { data: ids })
    //         .then((response) => {
    //             console.log(response.data);
    //             setDeleted(true);
    //         })
    //         .catch(error => {
    //             console.error('Erro ao buscar dados da API:', error);
    //         });
    //     event.stopPropagation();
    // }

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
                <div className="downloadImage" alt="Ícone de baixar arquivo" />
                <div /*onClick={deleteCircle}*/ className='deleteImage' />
            </div>
        </div>
    );
}

export default Historico;