import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/footer.css'

const Footer = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="footer">
                <div className="containerFooter">
                    <div className="footerText">
                        <h2 className='whiteText'>Site</h2>
                        <ul className='footerList whiteText'>
                            <li>Home</li>
                            <li>Conversão de arquivo</li>
                            <li>Sobre nós</li>
                            <li>Experiência</li>
                            <li>Valores</li>
                        </ul>
                    </div>
                    <div className="footerText">
                        <h2 className='whiteText'>Contatos</h2>
                        <ul className='footerList whiteText'>
                            <li>Email: Change@gmail.com</li>
                            <li>Telefone: (11)0000-00000</li>

                        </ul>
                    </div>

                    <div className="footerText">
                        <h1 className='whiteText'>CHANGER</h1>
                        <ul className='footerList whiteText'>
                            <li>{/*<img src="src/components/image/icons.png" alt="" />*/}</li>
                            <li>SPTECH</li>
                            <li> @2023 Change</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer