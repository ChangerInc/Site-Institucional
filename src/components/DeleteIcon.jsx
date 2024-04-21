import "../components/styles/historico.css"
import React, { useState } from 'react';
import ModalExcluir from "./ModalExcluir";
import { arquivosUser } from "../api";

const DeleteIcon = (props) => {
    const [modalConfirmarExcluir, setModalConfirmarExcluir] = useState(false)

    const openModalConfirmarExcluir = (event) => {
        setModalConfirmarExcluir(true)
        event.stopPropagation();
    }

    const closeModalConfirmarExcluir = () => {
        setModalConfirmarExcluir(false)
    }

    async function deleteArquivo() {
        console.log(props.id);
        arquivosUser
            .delete(`/${sessionStorage?.getItem("id")}/${props.id}`)
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
                name={props.nome}
                description={'Confirmar exclusão do arquivo'}
                modal={modalConfirmarExcluir}
                delete={deleteArquivo}
                handleClose={closeModalConfirmarExcluir}
            />
            <div onClick={openModalConfirmarExcluir} className="deleteImage" alt="Ícone de excluir arquivo" />
        </>
    );
};

export default DeleteIcon;