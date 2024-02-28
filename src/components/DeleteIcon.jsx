import "../components/styles/historico.css"
import React, { useState } from 'react';
import { usuario } from "../api";

const DeleteIcon = (props) => {

    async function deleteArquivo() {
        console.log(props.id);
        usuario
            .delete(`/excluir/${sessionStorage?.getItem("id")}/${props.id}`)
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
            <div onClick={deleteArquivo} className="deleteImage" alt="Ícone de excluir arquivo" />
        </>
    );
};

export default DeleteIcon;