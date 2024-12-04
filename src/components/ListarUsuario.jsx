import React, { Component } from 'react';
import axios from 'axios';

class ListarUsuario extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
        };
    }

    componentDidMount() {
        // Faz a requisição GET para a sua API
        axios.get('https://changer.serveftp.com/usuario/')
            .then(response => {
                this.setState({ usuarios: response.data });
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
            });
    }

    render() {
        return (
            <div>
                <h2>Lista de Usuários</h2>
                <ul>
                    {this.state.usuarios.map(usuario => (
                        <li key={usuario.id}>{usuario.nome} | {usuario.email}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListarUsuario;
