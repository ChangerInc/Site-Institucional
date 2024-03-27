import "../components/styles/convites.css"
import React, { useState, useEffect } from 'react';
import { usuario, circulo } from '../api.js';

function Convites() {

    const [convites, setConvites] = useState([]);

    const fetchConvites = async () => {
        try {
            const response = await usuario.get(`/convites/${sessionStorage.getItem("email")}`);
            const data = await response.data;
            setConvites(data);
        } catch (error) {
            console.error('Erro ao buscar convites:', error);
        }
    };

    useEffect(() => {
        fetchConvites(); // Chamar a função diretamente dentro do useEffect
    }, []);

    async function handleButtonClick(idCirculo, acaoBotao) {
        const formData = new FormData();
        formData.append("email", sessionStorage.getItem("email"));
        formData.append("idCirculo", idCirculo);
        formData.append("idUsuario", sessionStorage.getItem("id"));
        try {
            const response = await circulo.patch(`/convite/botao/${acaoBotao}`, formData);
            if (response.status === 200 || response.status ) {
                fetchConvites(); // Chamar a função para atualizar os convites
            } else {
                console.error('Erro ao executar ação do botão:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao executar ação do botão:', error);
        }
    }

    return (
        <>
            <div className="container-convites">
                <div className="box-convites">
                    <div className="head-convites"></div>
                    {convites.length === 0 ? ( // Verifica se não há convites
                        <div className="sem-convites"><span>Não há convites!</span>
                        </div>
                    ) : (
                        convites.map((convite, index) => (
                            <UnidadeConvite
                                key={index}
                                fotoPerfil={'src/assets/perfil-de-usuario.png'}
                                anfitriao={convite.anfitriao}
                                nomeCirculo={convite.nomeCirculo}
                                idCirculo={convite.idCirculo}
                                horario={convite.horario}
                                onButtonClick={handleButtonClick}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};



function UnidadeConvite({ fotoPerfil, anfitriao, nomeCirculo, idCirculo, horario, onButtonClick  }) {
    // Função para calcular o tempo decorrido
    const tempoDecorrido = (horario) => {
        const dataAtual = new Date();
        const dataHorario = new Date(horario);

        const diferencaEmMilissegundos = dataAtual - dataHorario;
        const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

        if (diferencaEmMinutos < 60) {
            return `há ${diferencaEmMinutos} minutos atrás`;
        } else {
            const diferencaEmHoras = Math.floor(diferencaEmMinutos / 60);
            return `há ${diferencaEmHoras} horas atrás`;
        }
    };

    return (
        <li className="convite">
            <div className="texto-convite">
                <img className="fotoConvite" src={fotoPerfil} alt="" />
                <span>{anfitriao}</span>
                <p>convidou você para o círculo</p>
                <span>{nomeCirculo}</span>
            </div>
                <div className="horario"><i>{tempoDecorrido(horario)}</i> {/* Exibir tempo decorrido */}</div>
            <div className="botoes-convite">
                <button className="aceitar" onClick={() => onButtonClick(idCirculo, 1)}></button>
                <button className="negar" onClick={() => onButtonClick(idCirculo, 2)}></button>
            </div>
        </li>
    );
}
export default Convites;