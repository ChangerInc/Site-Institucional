import React, { useState, useEffect, useRef } from 'react';
import InputText from './InputText';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

const AddMember = ({ newMemberEmail, handleUserEmail, addUserInCircle, msgError, success }) => {
    const id = sessionStorage?.getItem('id');
    const [loading, setLoading] = useState(false);
    const timer = useRef();

    const buttonSx = {
        width: '90px',
        height: '55px',
        backgroundColor: '#5B98BA',
        padding: '5px',
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            timer.current = setTimeout(() => {
                addUserInCircle();
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ marginTop: '9px' }}>Adicionar novo membro</h3>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    <div style={{ display: 'flex', width: '100%', height: '45px' }} className='msgError'>
                        <span style={{ width: '100%', textAlign: 'center', fontSize: '12px', color: 'red', wordWrap: 'break-word' }}>{msgError}</span>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginBottom: '40px' }}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            sx={buttonSx}
                            variant="contained"
                            onClick={handleButtonClick}
                            disabled={loading || (newMemberEmail === '' && !success)}
                        >
                            {success ? 'Enviado' : 'Adicionar'}
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </div>
            </div>
        </>
    );
};

export default AddMember;