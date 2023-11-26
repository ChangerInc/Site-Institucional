import React, { useState, useEffect } from "react";
import { circulo } from "../api.js";
import CardCirculo from "./CardCirculo";
import './styles/painel.css'

const Painel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const id = sessionStorage?.getItem('id');

    const handleSearchChange = (event) => {
        const inputValue = event.target.value;

        // Validar comprimento mínimo
        if (inputValue.length < 3) {
            setIsValid(false);
            setError('O termo de pesquisa deve ter no mínimo 3 caracteres.');
        }
        if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
            // Validar caracteres permitidos (apenas letras e espaços)
            setIsValid(false);
            setError('O termo de pesquisa deve conter apenas letras e espaços.');
        }
        setIsValid(true);
        setError('');
        setSearchTerm(inputValue);
    };

    useEffect(() => {
        componentDidMount();
    }, []);

    function componentDidMount() {
        circulo.get('https://6514aa50dc3282a6a3cd5f65.mockapi.io/cards')
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    console.log('Lista está vazia');
                }
                else {
                    setSearchResults(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    const pesquisarCirculo = () => {
        circulo
            .get(`/pesquisar/${searchTerm}/${id}`)
            .then((response) => {
                if (Object.keys(response.data).length === 0) {
                    console.log('Lista está vazia');
                }
                else {
                    setSearchResults(response.data)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <div className="containerPainel">
                <label htmlFor="searchInput">Pesquisar:</label>
                <input
                    type="search"
                    id="searchInput"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={pesquisarCirculo}>Pesquisar</button>
                <div className="btnCreateCircle"></div>
            </div>
            <div className="cards">
                {searchResults?.map((circulo) => (
                    <CardCirculo
                        tituloGrupo={circulo.tituloGrupo}
                        membros={circulo.membros}
                    />
                ))}
            </div>
        </>
    )
}

export default Painel