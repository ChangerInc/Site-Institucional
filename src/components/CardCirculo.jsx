import React, { useState, useEffect } from 'react';
import { usuario, circulo } from "../api";
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [filesCircle, setFilesCircle] = useState([]);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [titulo, setTitulo] = useState(props.tituloGrupo);
    const [membros, setMembros] = useState(props.membros);
    const [deleted, setDeleted] = useState(false);
    const id = sessionStorage?.getItem('id');

    // Modal Upload Files
    const [modalFilesCircle, setModalFilesCircle] = useState(false)

    const openModalFilesCircle = () => {
        setModalFilesCircle(true)
        handleFilesCircle();
    }

    const closeModalFilesCircle = () => {
        setModalFilesCircle(false)
    }

    // Modal Upload Files
    const [modalUploadFile, setModalUploadFile] = useState(false)

    const openModalUploadFile = () => {
        setModalUploadFile(true)
    }

    const closeModalUploadFile = () => {
        setModalUploadFile(false)
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    function uploadFileModal() {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            usuario
                .post(`/upload/${id}`, formData)
                .then((response) => {
                    console.log(response.data);
                    closeModalUploadFile();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    async function handleFilesCircle() {
        console.log(idCirculo);
        try {
            const response = await circulo.get(`/arquivos/${idCirculo}`);
            console.log(response.data.nome);
            setFilesCircle(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCircle() {
        const ids = {
            idCirc: props.idCirculo,
            idDono: props.idDono
        };

        circulo
            .delete('/', { data: ids })
            .then((response) => {
                console.log(response.data);
                setDeleted(true);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            })
    }

    if (deleted) {
        return null;
    }

    return (
        <>
            <div onClick={openModalFilesCircle} className="card">
                <div className="containerConteudoCard">
                    <div className='containerTituloDeleteGrupo'>
                        <b className="tituloDoCirculo">{titulo}</b>
                        <div onClick={deleteCircle} className='deleteImage'></div>
                    </div>
                    <div className="membrosCirculo">
                        <ul className='listaOrnedadaMembros'>
                            {props.membros?.map(membro => (
                                <li key={membro.id}><img src={membro.fotoPerfil} alt="" />{membro.nome}</li>
                            ))}
                        </ul>
                    </div>
                    <div onClick={openModalUploadFile} className="fileImage"></div>
                </div>
            </div>
            {modalUploadFile && (
                <div className="modalUploadFile">
                    <h3>Adicionar Arquivo no Circulo</h3>
                    <div onClick={closeModalUploadFile} className='imageCloseModalUpload'></div>
                    <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                        <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
                    </label>
                    <input id="file_upload_modal" type="file" onChange={handleFileChange} />
                    <button id='buttonUploadModal' onClick={uploadFileModal}>Enviar Arquivo</button>
                </div>
            )}
            {modalFilesCircle && (
                <div className="modalFilesCircle">
                    <h3>Arquivos de {titulo}</h3>
                    <div onClick={closeModalFilesCircle} className='imageCloseModalUpload'></div>
                    <ul>
                        {filesCircle?.map(arquivo => (
                            <li key={arquivo.idConversao}>{arquivo.nome} | {arquivo.tamanho} | {arquivo.dataConversao}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}

export default CardCirculo;