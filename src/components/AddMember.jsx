import React from 'react';
import InputText from './InputText';
import Button from '@mui/material/Button';

const AddMember = ({ newMemberEmail, handleUserEmail, addUserInCircle, sairDoCirculo, dono }) => {
    const id = sessionStorage?.getItem('id');

    return (
        <>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ marginTop: '9px' }}>Adicionar novo membro</h3>
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
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', marginBottom: '40px' }}>
                    <Button
                        sx={{ width: '90px', height: '55px', backgroundColor: '#5B98BA', padding: '5px' }}
                        variant="contained"
                        onClick={addUserInCircle}
                    >
                        Adicionar
                    </Button>
                    <Button
                        sx={{ width: '90px', height: '55px', backgroundColor: 'rgb(216, 39, 39)', padding: '5px' }}
                        color='error'
                        variant="contained"
                        onClick={sairDoCirculo}
                    >
                        {id == dono ? 'Excluir Círculo' : 'Sair'}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddMember;