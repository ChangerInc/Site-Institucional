import React, { useState } from 'react';
import GenericModal from './GenericModal';
import Convites from './Convites';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const NotificationIcon = ({ count, updateCount, color }) => {
    const [modalNotifications, setModalNotifications] = useState(false);

    const handleNotificationsModal = () => {
        setModalNotifications(!modalNotifications);
    }

    return (
        <>
            <GenericModal
                Component={
                    () => (
                        <Convites
                            updateCount={updateCount}
                        />
                    )
                }
                width='500px'
                open={modalNotifications}
                handleClose={handleNotificationsModal}
            />
            <Tooltip onClick={handleNotificationsModal} title='Notificações'>
                <IconButton>
                    <Badge badgeContent={count} color='error'>
                        <NotificationsActiveIcon
                            sx={{color: color}}
                        />
                    </Badge>
                </IconButton>
            </Tooltip>
        </>
    );
};

export default NotificationIcon;