import React from 'react';
import InputText from "./InputText.jsx";

const CreateCircle = ({ nameCircle, setNameCircle, createCircle }) => {
    return (
        <div className="modalCreateCircle">
            <h2>Novo circulo</h2>
            <form onSubmit={createCircle} className='formulario'>
                <InputText
                    key={2}
                    htmlFor={'nome_circulo'}
                    label={'Nome do círculo'}
                    type={'text'}
                    id={'nome_circulo'}
                    name={'nome_circulo'}
                    value={nameCircle}
                    onChange={(e) => {
                        setNameCircle(e.target.value);
                    }}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
};

export default CreateCircle;