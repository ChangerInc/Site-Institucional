import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const InputText = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <FormControl sx={{ m: 1, width: '180px' }} variant="standard">
                <InputLabel htmlFor={props.htmlFor}>{props.label}</InputLabel>
                <Input
                autoFocus
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    label={props.label}
                />
            </FormControl>
        </>
    )
}

export default InputText