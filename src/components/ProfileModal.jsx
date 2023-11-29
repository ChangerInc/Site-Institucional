import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');



const ProfileModal = ({ isOpen, onRequestClose, options }) => {
    const navigate = useNavigate();
    const [additionalModalIsOpen, setAdditionalModalIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openAdditionalModal = (option) => {
        setSelectedOption(option);
        setAdditionalModalIsOpen(true);
    };

    const closeAdditionalModal = () => {
        setAdditionalModalIsOpen(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const handleClick = (event) => {
        event.stopPropagation();
        // Seu código de manipulação de clique aqui
      };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Perfil"
                className="modal-perfil"
                ariaHideApp={false}
            >
                <div className='div-da-lista'>
                    <ul className='lista-opcoes'>
                        {options.map((option, index) => (
                            <li key={index} onClick={() => openAdditionalModal(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <div onClick={handleClick}>
                <Modal
                    isOpen={additionalModalIsOpen}
                    onRequestClose={closeAdditionalModal}
                    contentLabel="Modal Adicional"
                    className="modal-adicional"
                    ariaHideApp={false}
                >
                    <div className='container-modal-adicional'>
                        <h2>{selectedOption}</h2>
                        {selectedOption === options[2] && (
                            handleLogout()
                        )}
                        {selectedOption !== options[2] && (
                            <input type="file" className='inputDaFotoPerfil' />
                        )}
                        <button className='botaoModalMudarFoto' onClick={closeAdditionalModal}>Fechar Modal Adicional</button>
                    </div>
                </Modal>
            </div>

        </>
    );
};

export default ProfileModal;