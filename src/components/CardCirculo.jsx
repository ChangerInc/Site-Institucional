import React, { useState } from 'react';
import { circulo, arquivo } from "../api";
import AddNewMembers from './AddNewMembers';
import GenericModal from './GenericModal';
import UploadFile from './UploadFile';
import Historico from './Historico';
import ModalExcluir from './ModalExcluir';
import Backdrop from '@mui/material/Backdrop';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import '../assets/coroa.png'
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [loading, setLoading] = useState(false);
    const [filesCircle, setFilesCircle] = useState(props.arquivos);
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
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

    async function limparCirculo(event) {
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
                delete={limparCirculo}
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
                        <AvatarGroup max={4}>
                            {props.membros?.map(membro => (
                                <Avatar key={membro.id} src={membro.fotoPerfil} alt="Foto perfil do membro" />
                            ))}
                        </AvatarGroup>
                    </div>
                    <div className="btnsCircle">
                        <div onClick={openModalMembers} className="membersImage"></div>
                        <div onClick={openModalUploadFile} className="fileImage"></div>
                    </div>
                </div>
            </div>
            {modalMembers && (
                <GenericModal
                    Component={() => (
                        <AddNewMembers
                            key={1}
                            idCirculo={idCirculo}
                            tituloGrupo={titulo}
                            dono={idDoDono}
                            membros={membros}
                            limparCirculo={limparCirculo}
                            closeModal={closeModalMembers}
                        />
                    )}
                    width={'40%'}
                    open={modalMembers}
                    handleClose={closeModalMembers}
                />
            )}
            {modalUploadFile && (
                <GenericModal
                    Component={() => (
                        <UploadFile
                            key={1}
                            setLoading={setLoading}
                            idCirculo={idCirculo}
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