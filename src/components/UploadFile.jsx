import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import { arquivo } from "../api";
import { set } from 'date-fns';

function UploadFile({ idCirculo }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    const buttonSx = {
        width: '100px',
        height: '55px',
        backgroundColor: '#5B98BA',
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const resetFile = () => {
        setFile(null);
        setFileName('');
    };

    const handleLoading = () => {
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                addFileInCircle();
            }, 2000);
        }

    }

    async function addFileInCircle() {
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true)
        arquivo
            .patch(`/circulo/${idCirculo}`, formData)
            .then((response) => {
                if (response.status == 201) {
                    setSuccess(true);
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                resetFile();
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
                setLoading(false);
            });
    }

    return (
        <div className="conteudoDireito">
            <h3>Adicionar arquivo ao círculo</h3>
            <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
            </label>

            <input id="file_upload_modal" type="file" onChange={handleFileChange} />
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    sx={buttonSx}
                    variant="contained"
                    onClick={handleLoading}
                    disabled={loading || (file === null && !success)}>
                    {success ? 'Adicionado' : 'Enviar Arquivo'}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
        </div>
    );
}

export default UploadFile;