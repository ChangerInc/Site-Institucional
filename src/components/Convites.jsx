import "../components/styles/convites.css"
import React, { useState, useEffect } from 'react';
import { usuario } from '../api.js';

function Convites() {

    const [convites, setConvites] = useState([]);

    useEffect(() => {
        const fetchConvites = async () => {
            try {
                const response = await usuario.get(`/convites/${sessionStorage.getItem("email")}`);
                const data = await response.data;
                setConvites(data);
            } catch (error) {
                console.error('Erro ao buscar convites:', error);
            }
        };
        fetchConvites();
    }, []);

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
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};



function UnidadeConvite({ fotoPerfil, anfitriao, nomeCirculo, idCirculo, horario }) {
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
                <button className="aceitar"></button>
                <button className="negar"></button>
            </div>
        </li>
    );
}
export default Convites;