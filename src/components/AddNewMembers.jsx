import React, { useState } from 'react';
import { circulo } from "../api";
import MembersList from './MembersList';
import AddMember from './AddMember';
import Box from '@mui/material/Box';
import { set } from 'date-fns';

const AddNewMembers = ({ idCirculo, dono, tituloGrupo, membros, limparCirculo }) => {
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [msgError, setMsgError] = useState('');
    const [success, setSuccess] = useState(false);
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
            setMsgError("Impossível se convidar!")
        } else {
            circulo
                .post(`/convidar/${idCirculo}`, formData)
                .then((response) => {
                    if (response.status === 200) {
                        setSuccess(true);
                    }
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setMsgError('O usuário já está no círculo!');
                    }
                    if (error.response.status === 401) {
                        setMsgError('Só o dono pode enviar convites!');
                    }
                    if (error.response.status === 404) {
                        setMsgError('Nenhum usuário com esse e-mail!');
                    }
                    console.error(error);
                })
                .finally(() => {
                    setNewMemberEmail('');
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000);
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
        <Box width={'100%'} height={'60vh'} display="flex" flexDirection="row">
            <MembersList
                tituloGrupo={tituloGrupo}
                membros={membros}
            />
            <AddMember
                newMemberEmail={newMemberEmail}
                handleUserEmail={handleUserEmail}
                addUserInCircle={addUserInCircle}
                sairDoCirculo={sairDoCirculo}
                dono={dono}
                msgError={msgError}
                success={success}
            />
        </Box>
    );
};

export default AddNewMembers;