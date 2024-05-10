import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    bgcolor: 'background.paper',
    boxShadow: 24,
    gap: '10px',
    p: 2,
};

function ModalExcluir(props) {

    return (
        <div>
            <Modal
                aria-labelledby='modal-titulo'
                aria-describedby="transition-modal-description"
                open={props.modal}
                onClose={props.handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={props.modal}>
                    <Box sx={style}>
                        <Typography id="modal-titulo" sx={{color: '#d32f2f', fontWeight: 'bold'}}>
                            EXCLUIR
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ textAlign: 'center'}}>
                            {props.description} "{props.name}"
                        </Typography>
                        <div>
                            <Button color='error' onClick={props.delete}>Sim</Button><Button onClick={props.handleClose}>Não</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalExcluir;