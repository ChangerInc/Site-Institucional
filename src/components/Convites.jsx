import React, { useState, useEffect } from 'react';
import { usuario, circulo } from '../api.js';
import { Grid, Typography } from '@mui/material';
import InvitationItem from './InvitationItem.jsx';
import List from '@mui/material/List';
import "../components/styles/convites.css"

function Convites({ updateCount }) {
    const [convites, setConvites] = useState([]);
    const [dense, setDense] = React.useState(false);

    const fetchConvites = async () => {
        try {
            const response = await usuario.get(`/convites/${sessionStorage.getItem("email")}`);
            const data = await response.data;
            setConvites(data);
        } catch (error) {
            console.error('Erro ao buscar convites:', error);
        }
    };

    useEffect(() => {
        fetchConvites();
    }, []);

    async function handleButtonClick(idCirculo, acaoBotao) {
        const formData = new FormData();
        formData.append("email", sessionStorage.getItem("email"));
        formData.append("idCirculo", idCirculo);
        formData.append("idUsuario", sessionStorage.getItem("id"));
        try {
            const response = await circulo.patch(`/convite/botao/${acaoBotao}`, formData);
            if (response.status === 200 || response.status) {
                fetchConvites();
            } else {
                console.error('Erro ao executar ação do botão:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao executar ação do botão:', error);
        } finally {
            updateCount();
        }
    }

    return (
        <>
            <Grid sx={{
                overflow: 'auto',
                height: '100%',
                '&::-webkit-scrollbar': {
                    width: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#145DA0',
                    borderRadius: '20px'
                }
            }} item xs={12} md={6}>
                <Typography variant="h6" component="div">
                    Convites para círculos
                </Typography>
                <List dense={dense}>
                    {convites.length === 0 ? (
                        <Typography variant="h6" component="div">
                            Não há nenhum convite!
                        </Typography>
                    ) : (
                        convites.map((convite, index) => (
                            <InvitationItem
                                key={index}
                                fotoPerfil={convite.fotoAnfitriao}
                                anfitriao={convite.anfitriao}
                                nomeCirculo={convite.nomeCirculo}
                                idCirculo={convite.idCirculo}
                                horario={convite.horario}
                                onButtonClick={handleButtonClick}
                            />
                        ))
                    )}
                </List>
            </Grid>
        </>
    );
};

export default Convites;