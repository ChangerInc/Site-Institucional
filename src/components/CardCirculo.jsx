import React, { Component } from 'react';
import axios from 'axios';
import '../styles/cardCirculo.css';

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
                this.setState({ circulos: response.data });
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    render() {

        return (
            <div className='container'>
            {this.state.circulos.map(circulo => (
            <div className="card">
                <div className="containerConteudoCard">
                    <b className="tituloDoCirculo">{circulo.tituloGrupo}</b>
                    <div className="conteudoCard">
                        <div className="membrosCirculo">
                            <ul className='listaOrnedadaMembros'>
                                {circulo.membros.map(membro => (
                                    <li><img src={membro.fotoPerfil} alt="" /> {membro.nome}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
        )
    };
}

export default CardCirculo;