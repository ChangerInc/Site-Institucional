import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { usuario, circulo, changer } from "../api";
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [file, setFile] = useState(null);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [filesCircle, setFilesCircle] = useState([]);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [idConversao, setIdConversao] = useState('');
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

    const openModalUploadFile = (event) => {
        setModalUploadFile(true)
        event.stopPropagation();
    }

    const closeModalUploadFile = () => {
        setModalUploadFile(false)
    }

    // Modal members

    const [modalMembers, setModalMembers] = useState(false)

    const openModalMembers = (event) => {
        setModalMembers(true)
        event.stopPropagation();
    }

    const closeModalMembers = () => {
        setModalMembers(false)
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const handleUserEmail = (event) => {
        const userEmail = event.target.value;
        setNewMemberEmail(selectedFile);
    };

    async function uploadNewFileInHistoric(event) {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            usuario
                .post(`/upload/${id}`, formData)
                .then((response) => {
                    console.log(response.data);
                    setIdConversao(response.data);
                    addFileInCircle(response.data);
                    closeModalUploadFile();
                })
                .catch((error) => {
                    console.error(error);
                });
            event.stopPropagation();
        }
    }


    async function addFileInCircle(idConversaoTeste) {
        circulo
            .patch(`/publicar/${idCirculo}/${idConversaoTeste}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function handleFilesCircle() {
        circulo
            .get(`/arquivos/${idCirculo}`)
            .then((response) => {
                console.log(response.data);
                setFilesCircle(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function addUserInCircle() {
        const newMember = {
            idCirculo: idCirculo,
            email: userEmail,
            idDono: id
        }
        circulo
            .post(`/adicionar-membro`, newMember)
            .then((response) => {
                console.log(response.data);
                setFilesCircle(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function deleteCircle(event) {
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
            });
        event.stopPropagation();
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
                    <div onClick={openModalMembers} className="membersImage"></div>
                    <div onClick={openModalUploadFile} className="fileImage"></div>
                </div>
            </div>
            {modalMembers && (
                <div className="modalMembers">
                    <h3>Adicionar Arquivo no Circulo</h3>
                    <div onClick={closeModalMembers} className='imageCloseModalUpload'></div>
                    <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                        <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
                    </label>
                    <input id="file_upload_modal" type="email" onChange={handleUserEmail} />
                    <button id='buttonUploadModal' onClick={addUserInCircle}>Adicionar</button>
                </div>
            )}
            {modalUploadFile && (
                <div className="modalUploadFile">
                    <h3>Adicionar Arquivo no Circulo</h3>
                    <div onClick={closeModalUploadFile} className='imageCloseModalUpload'></div>
                    <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                        <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
                    </label>
                    <input id="file_upload_modal" type="file" onChange={handleFileChange} />
                    <button id='buttonUploadModal' onClick={uploadNewFileInHistoric}>Enviar Arquivo</button>
                </div>
            )}
            {modalFilesCircle && (
                <div className="modalFilesCircle">
                    <h3>Arquivos de {titulo}</h3>
                    <div onClick={closeModalFilesCircle} className='imageCloseModalUpload'></div>
                    <ul>
                        {(filesCircle.length === 0) ? (
                            <>
                                <li>Esse circulo não possui nenhum arquivo!</li>
                            </>
                        ) : (
                            filesCircle?.map(arquivo => (
                                <li key={arquivo.idConversao}>{arquivo.nome} | {arquivo.tamanho} | {format(new Date(arquivo.dataConversao), 'dd/MM/yy HH:mm')}</li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

export default CardCirculo;