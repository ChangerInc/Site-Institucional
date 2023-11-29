import React, { useState, useEffect } from 'react';
import { format, set } from 'date-fns';
import { usuario, circulo, changer } from "../api";
import Historico from './Historico';
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [file, setFile] = useState(null);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [filesUser, setFilesUser] = useState([]);
    const [filesCircle, setFilesCircle] = useState([]);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [idConversao, setIdConversao] = useState('');
    const [titulo, setTitulo] = useState(props.tituloGrupo);
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

            usuario
                .post(`/upload/${id}`, formData)
                .then((response) => {
                    console.log(response.data);
                    setIdConversao(response.data);
                    setFile(null)
                    setFileName('');
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

    async function handleFilesUser() {
        circulo
            .get(`/usuario/${id}`)
            .then((response) => {
                console.log(response.data);
                setFilesUser(response.data);
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
        const newMember = {
            idCirculo: idCirculo,
            email: newMemberEmail,
            idDono: id
        }
        circulo
            .post(`/adicionar-membro`, newMember)
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

    async function oNeymarNeymar(event) {
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
            });
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
                        <div onClick={oNeymarNeymar} className='deleteImage'></div>
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
                        <div className="inputAddMember">
                            <label>
                                <b>Email </b>
                            </label>
                            <input autoFocus type="email" onChange={handleUserEmail} />
                        </div>
                        <button id='buttonAddMembers' onClick={addUserInCircle}>Adicionar</button>
                    </div>
                </div>
            )}
            {modalUploadFile && (
                <>
                    <div className="modalUploadFile">
                        <div className="conteudoEsquerdo">
                            <div className="historico cabecalho">
                                <div className="espacamento margem">
                                    <b>Nome</b>
                                </div>
                                <div className="espacamento">
                                    <b>Data de criação</b>
                                </div>
                                <div className="espacamento">
                                    <b>Extensão inicial</b>
                                </div>
                                <div className="espacamento">
                                    <b>Extensão atual</b>
                                </div>
                            </div>

                            <ul>
                                {(filesUser.length === 0) ? (
                                    <>
                                        <b>Esse circulo não possui nenhum arquivo!</b>
                                    </>
                                ) : (

                                    filesUser?.map(arquivo => (
                                        <>
                                            <Historico
                                                key={arquivo.idConversao}
                                                nome={arquivo.nome}
                                                extensaoAtual={arquivo.extensaoAtual}
                                                dataConversao={format(new Date(arquivo.dataConversao), 'dd/MM/yy HH:mm')}
                                                extensaoInicial={arquivo.extensaoInicial}
                                            />
                                        </>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="muro" ></div>
                        <div className="conteudoDireito">
                            <h3>Adicionar Arquivo no Circulo</h3>
                            <img src="/src/assets/imagemFile.png" alt="" />
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
                    <div className="historico cabecalho">
                        <div className="espacamento">
                            <b>Nome</b>
                        </div>
                        <div>
                            <b>Data de criação</b>
                        </div>
                        <div>
                            <b>Extensão inicial</b>
                        </div>
                        <div>
                            <b>Extensão atual</b>
                        </div>
                    </div>
                    <div className="arquivosHistorico">
                        <ul>
                            {(filesCircle.length === 0) ? (
                                <>
                                    <li>Esse circulo não possui nenhum arquivo!</li>
                                </>
                            ) : (
                                filesCircle?.map(arquivo => (
                                    <Historico
                                        key={arquivo.idConversao}
                                        nome={arquivo.nome}
                                        extensaoAtual={arquivo.extensaoAtual}
                                        dataConversao={format(new Date(arquivo.dataConversao), 'dd/MM/yy HH:mm')}
                                        extensaoInicial={arquivo.extensaoInicial}
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