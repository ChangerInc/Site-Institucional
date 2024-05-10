import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { max } from 'date-fns';

function GenericModal({ Component, width, open, handleClose }) {

    const style = {
        width: width,
        height: '75%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        bgcolor: 'background.paper',
        boxShadow: 24,
        gap: '10px',
        p: 3.5,
    };

    return (
        <div>
            <Modal
                aria-labelledby='modal-titulo'
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Tooltip title='Fechar modal'>
                            <IconButton
                                aria-label="fechar"
                                onClick={handleClose}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    position: 'absolute',
                                    right: 3,
                                    top: 3,
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                        <Component/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default GenericModal;