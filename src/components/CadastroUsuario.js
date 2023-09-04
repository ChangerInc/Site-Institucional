import React, { Component } from 'react';
import axios from 'axios';

class CadastroUsuario extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        const novoUsuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
        };

        try {
            const response = await axios.post('http://localhost:8080/usuario/', novoUsuario);
            console.log('Usuário cadastrado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    }

    render() {
        const { nome, email, senha } = this.state;

        return (
            <div>
                <h1>Cadastro de Usuário</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default CadastroUsuario;
