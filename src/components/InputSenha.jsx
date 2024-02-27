import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const InputSenha = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={props.formData.senha}
                    onChange={props.handleInputChange}
                    label="Senha"
                />
            </FormControl>
        </>
    )
}

export default InputSenha