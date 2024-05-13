import React from 'react';
import UploadPhotoPerfil from './UpdatePhotoPerfil';
import GenericModal from './GenericModal';

const ProfileModal = ({ modalOpen, handleProfileModal }) => {
    const handleClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div onClick={handleClick}>
                <GenericModal
                    Component={() => (
                        <UploadPhotoPerfil />
                    )}
                    width={'500px'}
                    open={modalOpen}
                    handleClose={handleProfileModal}
                />
            </div>

        </>
    );
};

export default ProfileModal;