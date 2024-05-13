import React, { useState, useEffect } from "react";
import { circulo, arquivo } from "../api.js";
import InputText from "./InputText";
import CreateCircle from "./CreateCircle";
import CardCirculo from "./CardCirculo";
import GenericModal from "./GenericModal.jsx";
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
                                dono={circulo.dono}
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
                <GenericModal
                    Component={() => (
                        <CreateCircle
                            nameCircle={nameCircle}
                            setNameCircle={setNameCircle}
                            createCircle={createCircle}
                        />
                    )}
                    width={'350px'}
                    open={modalCreateCircle}
                    handleClose={closeModalCreateCircle}
                />
            </div>
        </>
    )
}

export default Painel