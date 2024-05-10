import "../components/styles/historico.css"
import React, { useState } from 'react';
import ModalExcluir from "./ModalExcluir";
import { arquivo } from "../api";

const DeleteIcon = ({idCirculo, idArquivo, nome}) => {
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
            <div onClick={openModalConfirmarExcluir} className="deleteImage" alt="Ícone de excluir arquivo" />
        </>
    );
};

export default DeleteIcon;