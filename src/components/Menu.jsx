import React from 'react';
import MenuUI from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Menu({ anchorEl, handleClose, menuItems }) {
    return (
        <MenuUI
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            {menuItems.map((item, index) => (
                <div key={index}>
                    <MenuItem onClick={() => {
                        handleClose();
                        item.onClick();
                    }}
                        style={{ minWidth: '110px', justifyContent: 'center' }}
                    >
                        <Typography variant="inherit" noWrap>
                            {item.text}
                        </Typography>
                    </MenuItem>
                    {index < menuItems.length - 1 && <Divider />}
                </div>
            ))}
        </MenuUI>
    );
}

export default Menu;