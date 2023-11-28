import React, { useState, useEffect } from "react";
import { circulo } from "../api.js";
import CardCirculo from "./CardCirculo";
import './styles/painel.css'

const Painel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState(false);
    const [error, setError] = useState('');
    const [allCircle, setAllCircle] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [nameCircle, setNameCircle] = useState('');
    const [createdCircle, setCreatedCircle] = useState(null);
    const id = sessionStorage?.getItem('id');

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
                    setError('Você não tem nenhum circulo')
                }
                else {
                    setAllCircle(response.data)
                    setError('');
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    useEffect(() => {
        pesquisarCirculo();
    }, [searchTerm]);

    const pesquisarCirculo = () => {
        if (searchTerm != '') {
            setSearchResults([]);
            setSearch(true);
            circulo
                .get(`/pesquisar/${searchTerm}/${id}`)
                .then((response) => {
                    if (Object.keys(response.data).length === 0) {
                        setError('Nenhum resultado encontrado')
                    }
                    else {
                        setSearchResults(response.data)
                        setError('')
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setSearch(false);
            allCircles();
        }
    }

    async function createCircle() {
        const objCirculo = {
            nomeCirculo: nameCircle,
            dono: {
                id: id
            }
        };

        circulo
            .post('/', objCirculo)
            .then((response) => {
                closeModalCreateCircle();
                console.log(response.data);
                setError('')
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    return (
        <>
            <div className="containerPainel">
                <div>
                    <label htmlFor="searchInput">Pesquisar:</label>
                    <input
                        type="text"
                        id="searchInput"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="error">{error}</div>
                </div>
            </div>
            <div className="cards">
                {!search ? (
                    <>
                        {allCircle?.map((circulo) => (
                            <CardCirculo
                                key={circulo.id}
                                idCirculo={circulo.id}
                                idDono={circulo.dono.id}
                                tituloGrupo={circulo.nomeCirculo}
                                membros={circulo.membros}
                            />
                        ))}
                        <div className="divCreateCircle">
                            <div onClick={openModalCreateCircle} className="btnCreateCircle"></div>
                            <span>Novo circulo</span>
                        </div>
                    </>
                ) : (
                    <>
                        {searchResults?.map((circulo) => (
                            <CardCirculo
                                key={circulo.id}
                                idCirculo={circulo.id}
                                tituloGrupo={circulo.nome}
                                membros={circulo.membros}
                            />
                        ))}
                        <div className="divCreateCircle">
                            <div onClick={openModalCreateCircle} className="btnCreateCircle"></div>
                            <span>Novo circulo</span>
                        </div>
                    </>
                )}
                {modalCreateCircle && (
                    <div className="modalCreateCircle">
                        <div onClick={closeModalCreateCircle} className='imageCloseModalUpload'></div>
                        <h2>Novo circulo</h2>
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
                            <button type="submit">Criar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Painel