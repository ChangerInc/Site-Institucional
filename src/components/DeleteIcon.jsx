import "../components/styles/historico.css"
import React, { useState } from 'react';
import ModalExcluir from "./ModalExcluir";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIconMUI from '@mui/icons-material/Delete';
import { arquivo } from "../api";

const DeleteIcon = ({ idCirculo, idArquivo, nome }) => {
    const [modalConfirmarExcluir, setModalConfirmarExcluir] = useState(false)
    const idUsuario = sessionStorage?.getItem('id');

    const openModalConfirmarExcluir = (event) => {
        setModalConfirmarExcluir(true)
        event.stopPropagation();
    }

    const closeModalConfirmarExcluir = () => {
        setModalConfirmarExcluir(false)
    }

    const handleDeleteFileHistoricOrCircle = () => {
        if (idCirculo) {
            deleteArquivoDoCirculo()
        } else {
            deleteArquivoDoHistorico()
        }
    }

    async function deleteArquivoDoCirculo() {
        arquivo
            .delete(`/circulo/${idCirculo}/${idArquivo}`)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao apagar arquivo:', error);
            });
    }

    async function deleteArquivoDoHistorico() {
        arquivo
            .delete(`/${idUsuario}/${idArquivo}`)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao apagar arquivo:', error);
            });
    }

    return (
        <>
            <ModalExcluir
                name={nome}
                description={'Confirmar exclusão do arquivo'}
                modal={modalConfirmarExcluir}
                delete={handleDeleteFileHistoricOrCircle}
                handleClose={closeModalConfirmarExcluir}
            />
            <Tooltip title='Excluir arquivo'>
                <IconButton
                    onClick={openModalConfirmarExcluir}
                    aria-label="Excluir"
                    sx={{
                        width: 20,
                        height: 20,
                        color: 'black',
                        ":hover": {
                            color: 'red',
                        }
                    }}
                >
                    <DeleteIconMUI />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default DeleteIcon;