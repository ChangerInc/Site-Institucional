import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const InputConfirmarSenha = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="confirmar">Confirmar senha</InputLabel>
                <Input
                    id="confirmar"
                    name="confirmar"
                    type="password"
                    value={props.formData.confirmar}
                    onChange={props.handleInputChange}
                    label="Confirmar senha"
                />
            </FormControl>
        </>
    )
}

export default InputConfirmarSenha