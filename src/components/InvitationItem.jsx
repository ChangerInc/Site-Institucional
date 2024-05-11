import { Fragment } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const InvitationItem = ({ fotoPerfil, anfitriao, nomeCirculo, idCirculo, horario, onButtonClick }) => {

    const tempoDecorrido = (horario) => {
        const dataAtual = new Date();
        const dataHorario = new Date(horario);

        const diferencaEmMilissegundos = dataAtual - dataHorario;
        const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

        if (diferencaEmMinutos < 60) {
            return `há ${diferencaEmMinutos} minutos atrás`;
        } else {
            const diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);
            return `há ${diferencaEmHoras} horas atrás`;
        }
    };

    return (
        <ListItem
            sx={{ width: '480px', margin: 0, padding: '10px' }}
            secondaryAction={
                <>
                    <IconButton
                        sx={{ marginRight: '5px' }}
                        onClick={() => onButtonClick(idCirculo, 1)}
                        edge="end" aria-label="aceitar">
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => onButtonClick(idCirculo, 2)}
                        edge="end" aria-label="recusar">
                        <CloseIcon />
                    </IconButton>
                </>
            }
        >
            <ListItemAvatar>
                <Avatar alt="Foto de perfil" src={fotoPerfil} />
            </ListItemAvatar>
            <ListItemText
                primary="Deseja aceitar o convite?"
                secondary={
                    <Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {anfitriao}
                        </Typography>
                        {` convidou você para o círculo `}
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {nomeCirculo}
                        </Typography>
                        <Box component="br" />
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {tempoDecorrido(horario)}
                        </Typography>
                    </Fragment>
                }
            />
        </ListItem>
    );
};

export default InvitationItem;