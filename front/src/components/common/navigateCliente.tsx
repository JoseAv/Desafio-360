import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { Container } from '@mui/material';

export default function BarCliente() {
    const navigate = useNavigate()
    const context = useContext(loginContext)
    if (!context) return <h1>No Contexto</h1>
    const { logOut } = context


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Container sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Container>
                            <IconButton onClick={() => navigate('/cliente/home')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <HomeIcon />
                            </IconButton>
                            <IconButton onClick={() => navigate('/cliente/detalles')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                Ordenes
                            </IconButton>
                        </Container>
                        <IconButton onClick={() => {
                            logOut()
                            navigate('/login')
                        }} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            LogOut
                        </IconButton>
                    </Container>

                </Toolbar>

            </AppBar>
        </Box>
    );
}