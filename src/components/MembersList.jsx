import React, { useState, Fragment } from 'react';
import { Grid, Typography } from '@mui/material';
import MemberItem from './MemberItem.jsx';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

function MembersList({ tituloGrupo, membros }) {
    const [dense, setDense] = useState(false);

    return (
        <>
            <Grid sx={{
                overflow: 'auto',
                width: '50%',
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
                    Membros do círculo {tituloGrupo}
                </Typography>
                <List dense={dense}>
                    {membros.length === 0 ? (
                        <Typography variant="h6" component="div">
                            Não há nenhum membro além de você nesse círculo!
                        </Typography>
                    ) : (
                        membros.map((membro, index) => (
                            <div key={index}>
                                <MemberItem
                                    fotoPerfil={membro.fotoPerfil}
                                    nome={membro.nome}
                                />
                                {index < membros.length - 1 && <Divider />}
                            </div>
                        ))
                    )}
                </List>
            </Grid>
        </>
    );
};

export default MembersList;