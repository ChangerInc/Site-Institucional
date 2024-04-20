import React, { useState, useEffect } from 'react';
import { format, set } from 'date-fns';
import { usuario, circulo, arquivosUser, arquivosCirculo } from "../api";
import InputText from './InputText'
import Historico from './Historico';
import '../assets/coroa.png'
import './styles/cardCirculo.css';
import { Alert } from '@mui/material';

function CardCirculo(props) {
    const [file, setFile] = useState(null);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [filesUser, setFilesUser] = useState([]);
    const [filesCircle, setFilesCircle] = useState(props.arquivos);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [idArquivo, setIdArquivo] = useState(props.idCirculo);
    const [idConversao, setIdConversao] = useState('');
    const [titulo, setTitulo] = useState(props.tituloGrupo);
    const [idDoDono, setDono] = useState(props.dono);
    const [membros, setMembros] = useState(props.membros);
    const [addUser, setAddUser] = useState(false);
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
        handleFilesUser();
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
        setNewMemberEmail(userEmail);
    };

    async function uploadNewFileInHistoric(event) {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            arquivosUser
                .post(`/${id}`, formData)
                .then((response) => {
                    console.log(response.data);
                    setIdConversao(response.data);
                    addFileInCircle(response.data);
                    setFile(null)
                    setFileName('');
                    closeModalUploadFile();
                })
                .catch((error) => {
                    console.error(error);
                });
            event.stopPropagation();
        }
    }

    async function addFileInCircle(idArquivo) {
        arquivosCirculo
            .patch(`/${idCirculo}/${idArquivo}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function handleFilesUser() {
        arquivosUser
            .get(`/${id}`)
            .then((response) => {
                console.log(response.data);
                console.log(idCirculo);
                setFilesUser(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function handleFilesCircle() {
        arquivosCirculo
            .get(`/${idCirculo}`)
            .then((response) => {
                console.log(response.data);
                setFilesCircle(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function patchNameCircle() {
        const newCircleName = {
            idCirculo: idCirculo,
            idDono: id
        }
        circulo
            .patch(`/`, newCircleName)
            .then((response) => {
                console.log(response.data);
                setFilesCircle(response.data);
                window.location.reload();
                closeModalMembers();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function addUserInCircle() {
        const formData = new FormData();
        formData.append("idAnfitriao", id);
        formData.append("emailDoConvidado", newMemberEmail);

        if (newMemberEmail == sessionStorage.getItem("email")) {
            alert("impossivel se convidar")
        } else {
            circulo
                .post(`/convidar/${idCirculo}`, formData)
                .then((response) => {
                    closeModalMembers();
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    async function sairDoCirculo() {

        if (id == props.dono) {
            oNeymarNeymar()
        } else {
            console.log("idCirculo" + idCirculo)
            console.log("id" + id)
            circulo
                .patch(`/sair/${idCirculo}/${id}`)
                .then(
                    window.location.reload())
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    async function oNeymarNeymar(event) {
        if (membros.length != 0) {
            circulo
                .delete(`/limpar/${idCirculo}`)
                .then((response) => {
                    console.log(response.data);
                    setDeleted(true);
                    deleteCircle()
                })
                .catch(error => {
                    console.error('Erro ao buscar dados da API:', error);
                });
            event.stopPropagation();
        } else {
            deleteCircle();
            event.stopPropagation();
        }
    }

    async function deleteCircle() {
        const ids = {
            idCirc: props.idCirculo,
            idDono: props.dono
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
    }

    if (deleted) {
        return null;
    }

    return (
        <>
            <div onClick={openModalFilesCircle} className="card">
                <div className="containerConteudoCard">
                    <div className='coroaTituloLixeira'>
                        <div className='crownIcon'>
                        {sessionStorage.getItem('id') == idDoDono && (
                            <img className='crownIcon' src={"src/assets/coroa.png"} alt="Coroa" />
                        )}
                        </div>
                        <div className='containerTituloDeleteGrupo'>
                            <b className="tituloDoCirculo">{titulo}</b>
                            {sessionStorage.getItem('id') == idDoDono && (
                                <div onClick={oNeymarNeymar} className='deleteImage'></div>
                            )}
                        </div>
                    </div>
                    <div className="membrosCirculo">
                        <ul className='listaOrnedadaMembros'>
                            {props.membros?.map(membro => (
                                <li key={membro.id}>
                                    {membro.fotoPerfil && (
                                        <img className='imageMember'
                                            src={`data:image/png;base64,${membro.fotoPerfil}`}
                                            alt=""
                                        />
                                    )}
                                    {membro.nome}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="btnsCircle">
                        <div onClick={openModalMembers} className="membersImage"></div>
                        <div onClick={openModalUploadFile} className="fileImage"></div>
                    </div>
                </div>
            </div>
            {modalMembers && (
                <div className="modalMembers">
                    <div onClick={closeModalMembers} className='imageCloseModal'></div>
                    <div className="membersInCircle">
                        <h3>Membros do circulo {props.tituloGrupo}</h3>
                        <ul>
                            {(props.membros.length === 0) ? (
                                <>
                                    <li>Esse circulo não possui nenhum membro</li>
                                </>
                            ) : (
                                props.membros?.map(membro => (
                                    <li key={membro.id}>
                                        {membro.fotoPerfil && (
                                            <img className='imageMember'
                                                src={`data:image/png;base64,${membro.fotoPerfil}`}
                                                alt=""
                                            />
                                        )}
                                        <span>{membro.nome}</span></li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="addMembers">
                        <h3>Adicionar novo membro</h3>
                        <InputText
                            key={1}
                            htmlFor={'addMember'}
                            label={'E-mail do usuário'}
                            type={'email'}
                            id={'addMember'}
                            name={'addMember'}
                            value={newMemberEmail}
                            onChange={handleUserEmail}
                        />
                        <button id='buttonAddMembers' onClick={addUserInCircle}>Adicionar</button>
                        <button id='buttonSairCirculo' onClick={sairDoCirculo}>{id == props.dono ? "Excluir Círculo" : "Sair"}</button>
                    </div>
                </div>
            )}
            {modalUploadFile && (
                <>
                    <div className="modalUploadFile">
                        <div className="conteudoDireito">
                            <h3>Adicionar Arquivo no Circulo</h3>
                            <div onClick={closeModalUploadFile} className='imageCloseModal'></div>
                            <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                                <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
                            </label>

                            <input id="file_upload_modal" type="file" onChange={handleFileChange} />
                            <button id='buttonUploadModal' onClick={uploadNewFileInHistoric}>Enviar Arquivo</button>
                        </div>
                    </div>


                </>
            )}
            {modalFilesCircle && (
                <div className="modalFilesCircle">
                    <div className="modalClose">
                        <h3>Arquivos de {titulo}</h3>
                        <div onClick={closeModalFilesCircle} className='imageCloseModal'></div>
                    </div>
                    <div className="arquivosHistorico">
                        <ul>
                            {(props.arquivos.length === 0) ? (
                                <>
                                    <li>Esse circulo não possui nenhum arquivo!</li>
                                </>
                            ) : (
                                props.arquivos?.map(arquivo => (
                                    <Historico
                                        key={arquivo.idArquivo}
                                        idArquivo={arquivo.idArquivo}
                                        nome={arquivo.nome}
                                        criacao={arquivo.criacao}
                                        extensao={arquivo.extensao}
                                        historico={props.arquivos}
                                    />
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default CardCirculo;