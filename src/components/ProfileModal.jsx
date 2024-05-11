import React from 'react';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import UploadPhotoPerfil from './UpdatePhotoPerfil';
import GenericModal from './GenericModal';

const ProfileModal = ({ modalOpen, handleProfileModal }) => {
    const handleLoading = (boolean) => {
        setLoading(boolean);
    }

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
                    handleModal={handleProfileModal}
                />
            </div>

        </>
    );
};

export default ProfileModal;