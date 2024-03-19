import React, { useState, useEffect } from "react";
import InputText from "./InputText.jsx";
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
        setNameCircle('')
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    function allCircles() {
        circulo.get(`/todos/${id}`)
            .then(response => {
                setAllCircle(response.data)
                setError('');
                console.log(response.data);
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
                setAllCircle('');
                setError('');
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            })
            .finally(() => {
                allCircles();
            });
    }

    return (
        <>
            <div className="containerPainel">
                <InputText
                    key={1}
                    htmlFor={'searchInput'}
                    label={'Pesquisar círculo'}
                    type={'text'}
                    id={'searchInput'}
                    name={'searchInput'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="error">{error}</div>
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
                                arquivos={circulo.arquivos}
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
                                tituloGrupo={circulo.nomeCirculo}
                                membros={circulo.membros}
                                arquivos={circulo.arquivos}
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
                        <div onClick={closeModalCreateCircle} className='imageCloseModal'></div>
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
                )}
            </div>
        </>
    )
}

export default Painel