import React, { useState, useEffect } from 'react';
import { circulo } from "../api";
import './styles/cardCirculo.css';

function CardCirculo(props) {
    const [idCirculo, setIdCirculo] = useState(props.idCirculo);
    const [titulo, setTitulo] = useState(props.tituloGrupo);
    const [membros, setMembros] = useState(props.membros);

    return (
        <>
            <div className="card">
                <div className="containerConteudoCard">
                    <div className='containerTituloDeleteGrupo'>
                        <b className="tituloDoCirculo">{titulo}</b>
                        <div className='deleteImage'></div>
                    </div>
                    <div className="membrosCirculo">
                        <ul className='listaOrnedadaMembros'>
                            {props.membros?.map(membro => (
                                <li key={membro.id}><img src={membro.fotoPerfil} alt="" />{membro.nome}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="fileImage"></div>
                </div>
            </div>
        </>
    )
}

export default CardCirculo;