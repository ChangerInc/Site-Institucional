import React, { useState } from 'react';
import { circulo, arquivosUser, arquivo } from "../api";
import InputText from './InputText'
import GenericModal from './GenericModal';
import UploadFile from './UploadFile';
import Historico from './Historico';
import ModalExcluir from './ModalExcluir';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../assets/coroa.png'
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [file, setFile] = useState(null);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [fileName, setFileName] = useState('');
    const [filesUser, setFilesUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filesCircle, setFilesCircle] = useState(props.arquivos);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [idConversao, setIdConversao] = useState('');
    const [titulo, setTitulo] = useState(props.tituloGrupo);
    const [idDoDono, setDono] = useState(props.dono);
    const [membros, setMembros] = useState(props.membros);
    const [deleted, setDeleted] = useState(false);
    const id = sessionStorage?.getItem('id');

    // Modal Files in Circles
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

    // Modal confirmar exclusão

    const [modalConfirmarExcluir, setModalConfirmarExcluir] = useState(false)

    const openModalConfirmarExcluir = (event) => {
        setModalConfirmarExcluir(true)
        event.stopPropagation();
    }

    const closeModalConfirmarExcluir = () => {
        setModalConfirmarExcluir(false)
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

            arquivo
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
        arquivo
            .get(`/circulo/${idCirculo}`)
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalExcluir
                name={props.tituloGrupo}
                description={'Confirmar exclusão do círculo'}
                modal={modalConfirmarExcluir}
                delete={oNeymarNeymar}
                handleClose={closeModalConfirmarExcluir}
            />
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
                                <div onClick={openModalConfirmarExcluir} className='deleteImage'></div>
                            )}
                        </div>
                    </div>
                    <div className="membrosCirculo">
                        <ul className='listaOrnedadaMembros'>
                            {props.membros?.map(membro => (
                                <li key={membro.id}>
                                    {membro.fotoPerfil && (
                                        <img className='imageMember'
                                            src={membro.fotoPerfil}
                                            alt=""
                                        />
                                    )}</li>
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
                                    <li>Esse circulo não possui nenhum outro membro</li>
                                </>
                            ) : (
                                props.membros?.map(membro => (
                                    <li key={membro.id}>
                                        {membro.fotoPerfil && (
                                            <img className='imageMember'
                                                src={membro.fotoPerfil}
                                                alt="Foto do membro"
                                            />
                                        )}
                                        <span>{membro.nome}</span>
                                    </li>
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
                <GenericModal
                    Component={() => (
                        <UploadFile
                            key={1}
                            handleFileChange={handleFileChange}
                            addFileInCircle={addFileInCircle}
                            file={file}
                            fileName={fileName}
                        />
                    )}
                    width={'25%'}
                    open={modalUploadFile}
                    handleClose={closeModalUploadFile}
                />
            )}
            {modalFilesCircle && (
                <GenericModal
                    Component={() => (
                        <Historico
                            key={arquivo.idArquivo}
                            idCirculo={props.idCirculo}
                            idArquivo={arquivo.idArquivo}
                            nome={arquivo.nome}
                            criacao={arquivo.criacao}
                            extensao={arquivo.extensao}
                            historico={props.arquivos}
                        />
                    )}
                    width={'55%'}
                    open={modalFilesCircle}
                    handleClose={closeModalFilesCircle}
                >
                </GenericModal>
            )}
        </>
    )
}

export default CardCirculo;