import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { loginContext } from '../../context/loginContext';
import { useContext } from 'react';
import LoginIcon from '@mui/icons-material/Login';
export default function NavBarOperator() {
    const navigate = useNavigate()
    const context = useContext(loginContext)
    if (!context) return <h1>No Contexto</h1>
    const { logOut } = context


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: 'var(--primary-color)' }}>
                <Toolbar variant="dense">
                    <Container sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Container>
                            <IconButton onClick={() => navigate('/operator/home')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                <HomeIcon sx={{ fontSize: '35px' }} />
                            </IconButton>
                            <IconButton onClick={() => navigate('/operator/clientes')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                Clientes
                            </IconButton>
                            <IconButton onClick={() => navigate('/operator/categorias')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                Categorias
                            </IconButton>
                            <IconButton onClick={() => navigate('/operator/usuarios')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                Usuarios
                            </IconButton>
                            <IconButton onClick={() => navigate('/operator/productos')} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                Productos
                            </IconButton>
                        </Container>
                        <IconButton onClick={() => {
                            logOut()
                            navigate('/login')
                        }} edge="start" color="inherit"
                            aria-label="menu"
                            size='large'
                        >
                            <LoginIcon sx={{ fontSize: '35px' }} />
                        </IconButton>

                    </Container>

                </Toolbar>

            </AppBar>
        </Box>
    );
}