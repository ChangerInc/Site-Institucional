import "../components/styles/historico.css"
import React, { useState } from 'react';
import { arquivosUser } from "../api";

const DeleteIcon = (props) => {

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
            <div onClick={deleteArquivo} className="deleteImage" alt="Ícone de excluir arquivo" />
        </>
    );
};

export default DeleteIcon;