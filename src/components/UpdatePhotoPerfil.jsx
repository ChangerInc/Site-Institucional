import React, { useState } from 'react';
import { usuario } from "../api";
import ChangeCircle from '@mui/icons-material/ChangeCircle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton, Tooltip } from '@mui/material';

const UpdatePhotoPerfil = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [textoImagem, setTextoImagem] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
        if (!event.target.files[0].type.startsWith("image/")) {
            setTextoImagem("Arquivo selecionado não é uma imagem!")
        }
    };

    const changeFile = () => {
        setFile(null);
        setFileName('');
        setTextoImagem('Nenhum foto selecionada...');
    }

    const handleFileUpload = () => {
        if (file) {
            // Verifica se o arquivo é uma imagem
            if (file.type.startsWith("image/")) {
                setLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                usuario
                    .patch(`/foto/${sessionStorage.getItem("id")}`, formData)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            sessionStorage.setItem("foto", response.data);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        setTextoImagem("Nenhum foto selecionada...");
                        setLoading(false);
                        window.location.reload();
                    });
            } else {
                setTextoImagem("Nenhum foto selecionada...");
                console.error("O arquivo selecionado não é uma imagem.");
            }
        }
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{ minHeight: '500px' }} className='modal-alterar-imagem'>
                <div className="topo">
                    <h2>Mudar foto</h2>
                </div>
                <div className="centro">
                    {(file == null) ? (
                        <>
                            <img src="src/assets/foto-vazia.svg" alt="" />
                            <h3>Nenhuma foto selecionada...</h3>
                        </>
                    ) : (
                        <>
                            {(file.type.startsWith("image/")) ? (
                                <>
                                    <img src={URL.createObjectURL(file)} alt="" />
                                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: 'black', fontWeight: '900' }}>{fileName} - </span>
                                        <Tooltip title="Alterar foto">
                                            <IconButton sx={{ color: 'black', padding: '0', width: '30px', height: '30px' }} onClick={changeFile}>
                                                <ChangeCircle />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img src="src/assets/foto-vazia.svg" alt="" />
                                    <span>{textoImagem}</span>
                                </>
                            )}

                        </>
                    )}
                </div>
                {(file == null || !file.type.startsWith("image/")) ? (
                    <>
                        <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                            <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : "Escolhe outro arquivo"}</b>
                        </label>

                        <input id="file_upload_modal" type="file" onChange={handleFileChange} />
                    </>
                ) : (
                    <button onClick={handleFileUpload}>Atualizar foto</button>
                )}
            </div>
        </>
    );
};

export default UpdatePhotoPerfil;