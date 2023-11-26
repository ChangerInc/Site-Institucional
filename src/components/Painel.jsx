import React, { useState, useEffect } from "react";
import { circulo } from "../api.js";
import CardCirculo from "./CardCirculo";
import './styles/painel.css'

const Painel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [search, setSearch] = useState(false);
    const [error, setError] = useState('');
    const [allCircle, setAllCircle] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const id = sessionStorage?.getItem('id');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const validation = () => {
        if (searchTerm === '') {
            setIsValid(false);
            setError('O termo de pesquisa deve ter no mínimo 3 caracteres.');
        }
    }

    useEffect(() => {
        allCircles();
    }, []);

    function allCircles() {
        circulo.get(`/todos/${id}`)
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    console.log('Lista está vazia');
                }
                else {
                    setAllCircle(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    const pesquisarCirculo = () => {
        if (isValid) {
            setSearchResults([])
            setSearch(true);
            circulo
                .get(`/pesquisar/${searchTerm}/${id}`)
                .then((response) => {
                    if (Object.keys(response.data).length === 0) {
                        console.log('Lista de busca está vazia');
                        setSearch(false)
                        setSearchResults(response.data)
                    }
                    else {
                        setSearchResults(response.data)
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('Você não informou nenhum dado de busca')
        }
    }

    function createCircle() {
        circulo.get(`/todos/${id}`)
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    console.log(response.data);
                }
                else {
                    setAllCircle(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
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
                {(!search && isValid) ? (
                    <>
                        {allCircle?.map((circulo) => (
                            <CardCirculo
                                idCirculo={circulo.id}
                                tituloGrupo={circulo.nomeCirculo}
                                membros={circulo.membros}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        { }
                        {searchResults?.map((circulo) => (
                            <CardCirculo
                                tituloGrupo={circulo.nome}
                                membros={circulo.membros}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Painel