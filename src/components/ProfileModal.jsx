import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { usuario } from "../api";

Modal.setAppElement('#root');

const ProfileModal = ({ isOpen, onRequestClose, options }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(event.target.files[0].name);
        handleFileUpload(file);
    };

    const handleFileUpload = (file) => {
        if (file) {
            // Verifica se o arquivo é uma imagem
            if (file.type.startsWith("image/")) {
                const formData = new FormData();
                formData.append("file", file);
                usuario
                    .patch(`/foto/${sessionStorage.getItem("id")}`, formData)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            sessionStorage.setItem("foto", response.data);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                    .finally(() => {
                        setFileName("Salvar arquivo");
                    });
            } else {
                console.error("O arquivo selecionado não é uma imagem.");
                // Adicione lógica para lidar com o erro de tipo de arquivo aqui
            }
        }
    };


    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Perfil"
                className="modal-perfil"
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

            <div onClick={handleClick} >
                <Modal
                    isOpen={additionalModalIsOpen}
                    onRequestClose={closeAdditionalModal}
                    contentLabel="Modal Adicional"
                    className="modal-adicional"
                >
                    <div className='container-modal-adicional'>
                        <h2>{selectedOption}</h2>
                        {selectedOption === options[0] && (
                            handleLogout()
                        )}
                        <button className='botaoModalMudarFoto' onClick={closeAdditionalModal}>Fechar Modal Adicional</button>
                    </div>
                </Modal>
            </div>

        </>
    );
};

export default ProfileModal;