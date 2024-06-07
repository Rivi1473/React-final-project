import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { logout } from '../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [activeButton, setActiveButton] = useState('');
    const dispatch = useDispatch();
    const userStatus = useSelector(store => store.user.status);
    const navigate = useNavigate();

    const handleButtonClick = (button) => {
        if (button === 'logout') {
            navigate('/products')
            dispatch(logout());
        } else {
            if (button === 'login') navigate('/login');
            else if (button === 'cart') navigate('/shoppingCart')
            else if (button === 'products') navigate('/products')
        else if(button==='orders')navigate('/orders')
            else if(button==='users')navigate('/users')

        }
        setActiveButton(button);
    };

    const renderButtons = () => {
        switch (userStatus) {
            case 'guest':
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            sx={iconButtonSx('login')}
                            onClick={() => handleButtonClick('login')}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton
                            sx={iconButtonSx('cart')}
                            onClick={() => handleButtonClick('cart')}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                    </Box>
                );
            case 'customer':
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            sx={iconButtonSx('logout')}
                            onClick={() => handleButtonClick('logout')}
                        >
                            <LogoutIcon />
                        </IconButton>
                        <IconButton
                            sx={iconButtonSx('cart')}
                            onClick={() => handleButtonClick('cart')}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton
                            sx={iconButtonSx('orders')}
                            onClick={() => handleButtonClick('orders')}
                        >
                            <AssignmentIcon />
                        </IconButton>
                    </Box>
                );
            case 'admin':
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            sx={iconButtonSx('logout')}
                            onClick={() => handleButtonClick('logout')}
                        >
                            <LogoutIcon />
                        </IconButton>
                        <IconButton
                            sx={iconButtonSx('orders')}
                            onClick={() => handleButtonClick('orders')}
                        >
                            <AssignmentIcon />
                        </IconButton>
                        <IconButton
                            sx={iconButtonSx('users')}
                            onClick={() => handleButtonClick('users')}
                        >
                            <PeopleIcon />
                        </IconButton>
                    </Box>
                );

            default:
                return null;
        }
    };
    const iconButtonSx = (button) => ({
        color: activeButton === button ? 'black' : 'inherit',
        mx: 1,
    });

    const typographySx = (button) => ({
        cursor: 'pointer',
        color: activeButton === button ? 'black' : 'inherit',
        mx: 1,
    });

    return (
        <AppBar position="static" sx={{ borderRadius: 0, backgroundColor: '#0066CC' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderButtons()}
                </Box>
                <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', paddingTop: '4px', marginTop: '4px' }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/Playmobil_logo_1991.svg"
                        alt="Logo"
                        style={{ height: 60 }}
                    />
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography
                        variant="h6"
                        sx={typographySx('products')}
                        onClick={() => handleButtonClick('products')}
                    >
                        Products
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
