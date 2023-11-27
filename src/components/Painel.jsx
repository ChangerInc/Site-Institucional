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
    const [nameCircle, setNameCircle] = useState('');

    // Modal criar circulo
    const [modalCreateCircle, setModalCreateCircle] = useState(false)

    const openModalCreateCircle = () => {
        setModalCreateCircle(true)
    }

    const closeModalCreateCircle = () => {
        setModalCreateCircle(false)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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
                    } else if (Object.keys(response.status) === 404) {

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
        const objCirculo = {
            nomeCirculo: nameCircle,
            dono: {
                id: id
            }
        };

        circulo
            .post('/', objCirculo)
            .then(response => {
                console.log(response.data);
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
                <div onClick={openModalCreateCircle} className="btnCreateCircle"></div>
            </div>
            <div className="cards">
                {(!search && isValid) ? (
                    <>
                        {allCircle?.map((circulo) => (
                            <CardCirculo
                                idCirculo={circulo.id}
                                idDono={circulo.dono.id}
                                tituloGrupo={circulo.nomeCirculo}
                                membros={circulo.membros}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {searchResults?.map((circulo) => (
                            <CardCirculo
                                idCirculo={circulo.id}
                                tituloGrupo={circulo.nome}
                                membros={circulo.membros}
                            />
                        ))}
                    </>
                )}
                {modalCreateCircle && (
                    <div className="modalCreateCircle">
                        <div onClick={closeModalCreateCircle} className='imageCloseModalUpload'></div>
                        <form onSubmit={createCircle} className='formulario'>
                            <div>
                                <label htmlFor="nome_circulo">Nome do Circulo </label>
                                <input
                                    type="text"
                                    id="nome_circulo"
                                    name="nome_circulo"
                                    value={nameCircle}
                                    onChange={(e) => {
                                        setNameCircle(e.target.value);
                                    }}
                                />
                            </div>
                            <button type="submit">Criar Circulo</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Painel