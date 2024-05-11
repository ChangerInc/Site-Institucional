import React, { useState } from 'react';
import { circulo } from "../api";
import MembersList from './MembersList';
import Divider from '@mui/material/Divider';
import AddMember from './AddMember';
import Box from '@mui/material/Box';

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
            />
        </Box>
    );
};

export default AddNewMembers;