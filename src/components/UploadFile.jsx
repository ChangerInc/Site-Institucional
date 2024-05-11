import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { arquivo } from "../api";

function UploadFile({ setLoading, idCirculo }) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    async function addFileInCircle() {
        const formData = new FormData();
        formData.append("file", file);

        setLoading(true)
        arquivo
            .patch(`/circulo/${idCirculo}`, formData)
            .then((response) => {
                if (response.status == 201) {
                    window.location.reload();
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false)
            });
    }

    return (
        <div className="conteudoDireito">
            <h3>Adicionar arquivo ao círculo</h3>
            <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
            </label>

            <input id="file_upload_modal" type="file" onChange={handleFileChange} />
            <Button
                sx={{ width: '100px', height: '55px', backgroundColor: '#5B98BA' }}
                variant="contained"
                onClick={addFileInCircle}
                disabled={file == null}>Enviar Arquivo</Button>
        </div>
    );
}

export default UploadFile;