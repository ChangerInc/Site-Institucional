import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles-pages/changerConfig.css';

const ChangerConfig = () => {
    const navigate = useNavigate();
    const [promptText, setPromptText] = useState([]);
    const promptRef = useRef(null);

    useEffect(() => {
        // Fazer a div scrollar automaticamente para a última mensagem adicionada
        if (promptRef.current) {
            promptRef.current.scrollTop = promptRef.current.scrollHeight;
        }
    }, [promptText]);

    async function criarUsuariosAdm() {
        setPromptText(prevText => [...prevText, 'usuarios criados']);
    }

    async function deletarUsuariosAdm() {
        setPromptText(prevText => [...prevText, 'usuarios deletados']);
    }

    async function limparTerminal() {
        setPromptText([]);
    }

    return (
        <>
            <section>
                <div className='containerBotoes'>
                    <div className='botoes'>
                        <button onClick={criarUsuariosAdm}>criar os usuarios changer</button>
                        <button onClick={deletarUsuariosAdm}>deletar os usuarios changer</button>
                        <button></button>
                        <button></button>
                    </div>
                    <div className='botoes'>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button onClick={limparTerminal} className='botaoDeletar'>limpar terminal</button>
                    </div>
                </div>
                <div className='containerPrompt'>
                    <div className='prompt' id='prompt' ref={promptRef}>
                        {promptText.slice(0).reverse().map((message, index) => (
                            <p key={index}>{message}</p>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChangerConfig;
