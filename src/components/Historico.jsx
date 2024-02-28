import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import "../components/styles/historico.css"
import { historico, usuario } from "../api";
import DownloadComponent from './Download';
import DeleteIcon from './DeleteIcon';
// PNGs das extensões
import aviIcon from '../assets/icones/avi.png';
import docxIcon from '../assets/icones/doc.png';
import zipIcon from '../assets/icones/zip.png';
import gifIcon from '../assets/icones/gif.png';
import jpgIcon from '../assets/icones/jpg.png';
import jpegIcon from '../assets/icones/jpeg.png';
import mp3Icon from '../assets/icones/mp3.png';
import pdfIcon from '../assets/icones/pdf.png';
import pngIcon from '../assets/icones/png.png';
import pptIcon from '../assets/icones/ppt.png';
import psdIcon from '../assets/icones/psd.png';
import svgIcon from '../assets/icones/svg.png';
import txtIcon from '../assets/icones/txt.png';
import xlsIcon from '../assets/icones/xls.png';
import csvIcon from '../assets/icones/csv.png';

const Historico = (props) => {
    const [showDownload, setShowDownload] = useState(false);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [historico, setHistorico] = useState(props.historico);

    const navigate = new useNavigate();
    const iconPaths = {
        avi: aviIcon,
        docx: docxIcon,
        zip: zipIcon,
        gif: gifIcon,
        jpeg: jpegIcon,
        jpg: jpgIcon,
        mp3: mp3Icon,
        pdf: pdfIcon,
        png: pngIcon,
        ppt: pptIcon,
        psd: psdIcon,
        svg: svgIcon,
        txt: txtIcon,
        xls: xlsIcon,
        csv: csvIcon
    };

    const columns = [
        {
            field: 'icon',
            headerName: 'Icon',
            width: 80,
            align: 'left',
            renderCell: (params) => (
                <div>
                    <img src={iconPaths[params.row.extensaoAtual]} alt={params.row.extensaoAtual} />
                </div>
            )
        },
        { field: 'nome', headerName: 'Nome', width: 200, align: 'left' },
        { field: 'dataConversao', headerName: 'Data de conversão', width: 160, align: 'left' },
        { field: 'extensaoInicial', headerName: 'Extensão inicial', width: 120, align: 'center' },
        { field: 'extensaoAtual', headerName: 'Extensão atual', width: 120, align: 'center' },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 90,
            align: 'center',
            renderCell: (params) => (
                <div className="deleteDownload">
                    <DownloadComponent id={params.row.id} nome={params.row.nome} />
                    <DeleteIcon id={params.row.id} />
                </div>
            ),
        },
    ];

    const rows = props.historico.map(item => ({
        id: item.idConversao,
        nome: item.nome,
        dataConversao: new Date(item.dataConversao).toLocaleString(),
        extensaoInicial: item.extensaoInicial,
        extensaoAtual: item.extensaoAtual
    }));

    async function limparFks() {
        console.log(idCirculo)
        historico
            .delete(`/limpar/${idCirculo}/${props.idConversao}`)
            .then((response) => {
                console.log(response.data);
                setDeleted(true)
            })
            .catch(error => {
                console.error('Erro ao apagar arquivo:', error);
            });
    }

    const baixar = () => {
        setShowDownload(true);
    }

    return (
        <>
            <div className="historico">
                <Box sx={{ height: 370, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </>
    );
}

export default Historico;