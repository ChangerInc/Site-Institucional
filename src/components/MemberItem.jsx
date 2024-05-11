import { Fragment } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const MemberItem = ({ fotoPerfil, nome }) => {

    return (
        <ListItem
            sx={{ width: '100%', margin: 0 }}
        >
            <ListItemAvatar>
                <Avatar alt="Foto de perfil" src={fotoPerfil} sx={{ width: 35, height: 35 }} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography noWrap>
                        {nome}
                    </Typography>
                }
            />
        </ListItem>
    );
};

export default MemberItem;