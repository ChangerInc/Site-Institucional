import "../components/styles/convites.css"
import React, { useState, useEffect } from 'react';
import { usuario } from '../api.js';

function Convites() {

    const [convites, setConvites] = useState([]);

    useEffect(() => {
        const fetchConvites = async () => {
            try {
                const response = await usuario.get(`/convites/${sessionStorage.getItem("email")}`);
                const data = await response.data;
                setConvites(data);
            } catch (error) {
                console.error('Erro ao buscar convites:', error);
            }
        };
        fetchConvites();
    }, []);

    return (
        <>
            <div className="container-convites">
                <div className="box-convites">
                    <div className="head-convites"></div>
                    {convites.map((convite, index) => (
                    <UnidadeConvite key={index} 
                    fotoPerfil={'src/assets/perfil-de-usuario.png'} 
                    anfitriao={convite.anfitriao} 
                    nomeCirculo={convite.nomeCirculo} 
                    />
                ))}
                </div>
            </div>
        </>
    );
};



function UnidadeConvite({ fotoPerfil, anfitriao, nomeCirculo }) {


    return (
        <li className="convite">
            <div className="texto-convite">
                <img className="fotoConvite" src={fotoPerfil} alt="" />
                <span>{anfitriao}</span>
                <p>convidou você para o círculo</p>
                <span>{nomeCirculo}</span>
            </div>
            <div className="botoes-convite">
                <button className="aceitar"></button>
                <button className="negar"></button>
            </div>
        </li>
    );
}

export default Convites;