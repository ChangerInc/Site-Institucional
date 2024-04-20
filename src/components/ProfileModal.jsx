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
        onRequestClose()
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
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleFileUpload = () => {
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
                        window.location.reload();
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
                    <div className='modal-alterar-imagem'>
                        <img className='fecharModalAlterarImagem' onClick={closeAdditionalModal} src="src/assets/fechar-modal.png" alt="Imagem para fechar o modal ao clicar" />
                        <div className="topo">
                            <h2>{selectedOption}</h2>
                            {selectedOption === options[1] && (
                                handleLogout()
                            )}
                        </div>
                        <div className="centro">
                            {(file == null) ? (
                                <>
                                    <img src="src/assets/foto-vazia.svg" alt="" />
                                    <h3>Nenhum foto selecionada...</h3>
                                </>
                            ) : (
                                <>
                                    <img src={URL.createObjectURL(file)} alt="" />
                                    <span>{fileName} - <span onClick={handleFileChange}>Alterar</span></span>
                                </>
                            )}
                        </div>
                        {(file == null) ? (
                            <>
                                <label htmlFor="file_upload_modal" className="custom-file-upload-label">
                                    <b className="bold_selecionar_arquivo">{file == null ? "Selecionar Arquivo" : <span>{fileName}</span>}</b>
                                </label>

                                <input id="file_upload_modal" type="file" onChange={handleFileChange} />
                            </>
                        ) : (
                            <button onClick={handleFileUpload}>Atualizar foto</button>
                        )}
                    </div>
                </Modal>
            </div>

        </>
    );
};

export default ProfileModal;