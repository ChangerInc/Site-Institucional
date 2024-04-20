import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';
import "../components/styles/historico.css"
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
    console.log(props.historico)

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
            width:120,
            align: 'center',
            renderCell: (params) => (
                <div>
                    <img src={iconPaths[params.row.extensao]} alt={params.row.extensao} />
                </div>
            )
        },
        { field: 'nome', headerName: 'Nome', width: 250, align: 'center' },
        { field: 'criacao', headerName: 'Data de criação', width: 180, align: 'center' },
        { field: 'extensao', headerName: 'Extensão', width:120, align: 'center' },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 180,
            align: 'center',
            renderCell: (params) => (
                <div className="deleteDownload">
                    <DownloadComponent id={params.row.id} nome={params.row.nome} />
                    <DeleteIcon id={params.row.id} />
                </div>
            ),
        },
    ];

    const rows = historico?.map(item => ({
        id: item.idArquivo,
        nome: item.nome,
        criacao: format(new Date(item.criacao), 'dd/MM/yyyy HH:mm:ss'),
        extensao: item.extensao
    }));

    const rowsInvertida = rows.slice().reverse();

    async function limparFks() {
        console.log(idCirculo)
        arquivosCirculo
            .delete(`/${idCirculo}/${props.idArquivo}`)
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
                <Box sx={{ height: 370, width: 870 }}>
                    <DataGrid
                        rows={rowsInvertida}
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