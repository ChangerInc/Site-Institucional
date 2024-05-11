import React, { useState } from 'react';
import { circulo } from "../api";
import MembersList from './MembersList';
import InputText from './InputText';
import Divider from '@mui/material/Divider';

const AddNewMembers = ({ idCirculo, dono, tituloGrupo, membros, limparCirculo, closeModal }) => {
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const id = sessionStorage?.getItem('id');

    const handleUserEmail = (event) => {
        const userEmail = event.target.value;
        setNewMemberEmail(userEmail);
    };

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

                    closeModal();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    async function sairDoCirculo() {

        if (id == dono) {
            limparCirculo()
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

    return (
        <div className="modalMembers">
            <MembersList
                tituloGrupo={tituloGrupo}
                membros={membros}
            />

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
                <button id='buttonSairCirculo' onClick={sairDoCirculo}>{id == dono ? "Excluir Círculo" : "Sair"}</button>
            </div>
        </div>
    );
};

export default AddNewMembers;