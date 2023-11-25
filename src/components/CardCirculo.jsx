import React, { Component } from 'react';
import axios from 'axios';
import './styles/cardCirculo.css';

class CardCirculo extends Component {
    constructor() {
        super();
        this.state = {
            circulos: [],
        };
    }

    componentDidMount() {
        axios.get('https://6514aa50dc3282a6a3cd5f65.mockapi.io/cards')
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    console.log('Lista está vazia');
                }
                else {
                    this.setState({ circulos: response.data });
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    render() {

        return (
            <>
                {this.state.circulos.map(circulo => (
                    <div className="card">
                        <div className="containerConteudoCard">
                            <div className='containerTituloDeleteGrupo'>
                                <b className="tituloDoCirculo" key={circulo.tituloGrupo}>{circulo.tituloGrupo}</b>
                                <div className='deleteImage'></div>
                            </div>
                            <div className="membrosCirculo">
                                <ul className='listaOrnedadaMembros'>
                                    {circulo.membros.map(membro => (
                                        <li key={membro.id}><img src={membro.fotoPerfil} alt="" />{membro.nome}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="fileImage"></div>
                        </div>
                    </div>
                ))}
            </>
        )
    };
}

export default CardCirculo;