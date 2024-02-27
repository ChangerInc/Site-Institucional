import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const InputEmail = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={props.formData.email}
                    onChange={props.handleInputChange}
                    label="E-mail"
                />
            </FormControl>
        </>
    )
}

export default InputEmail