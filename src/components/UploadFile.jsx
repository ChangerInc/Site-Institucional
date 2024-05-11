import React from 'react';
import Button from '@mui/material/Button';

function UploadFile({ handleFileChange, addFileInCircle, file, fileName }) {
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