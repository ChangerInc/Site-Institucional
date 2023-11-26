import React, { useState } from "react";
import { circulo } from "../api.js";
import { useNavigate } from 'react-router-dom';
import './styles/painel.css'

const Painel = () => {
    const navigate = useNavigate();
    const [nomeCirculo, setNomeCirculo] = useState('');
    const id = sessionStorage?.getItem('id');
    const [circulosFiltro, setCirculosFiltro] = useState([{teste: 'Mateus'}]);

    const handleSearchChange= (event) => {
        setNomeCirculo(event.target.value);
        console.log(event.target.value);
      };

    const pesquisarCirculo = (event) => {
        const formData = new FormData();
        formData.append("usuarioId", id);

        circulo
            .get(`/pesquisar/${nomeCirculo}`, formData)
            .then((response) => {
                if (Object.keys(response.data).length === 0) {
                    console.log('Lista está vazia');
                }
                else {
                    setCirculosFiltro(response.data)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="containerPainel">
                <input onChange={handleSearchChange} type="search" />
                <div className="btnCreateCircle"></div>
                <button onClick={pesquisarCirculo}>Pesquisar</button>
            </div>
        </>
    )
}

export default Painel