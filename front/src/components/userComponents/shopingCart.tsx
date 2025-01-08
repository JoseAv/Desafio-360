import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
// import ListItemIcon from '@mui/material/ListItemIcon';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
import { ShopingContext } from '../../context/shopingCardContext';
import { typeProductsApi } from '../../types/operator';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function ShoppingCar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const Navigate = useNavigate()

    const context = React.useContext(ShopingContext)
    if (!context) return <h1>No hay Context</h1>
    const { openShop, closeShop, TotalCard, resetCart, AddProduct, minProducts, productsInCart } = context

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
    };

    // <Button color='primary' onClick={() => openShop()}><ListItemIcon><ArrowBack /></ListItemIcon></Button>

    const drawer = (
        <>
            <Button color='primary' sx={{ fontSize: '30px' }} >Total: {TotalCard()} Q</Button>
            {productsInCart?.map((ele: typeProductsApi) => (
                <div key={ele.id}>



                    <Card sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="body1">
                                    {ele.nombre}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {ele.precio} Q - Unidad
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                            </Box>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{
                                height: 120,
                                width: 100,
                                objectFit: 'cover',
                            }}
                            image={ele.foto ?? 'No foto'}
                            alt="Image no Disponible"
                        />

                    </Card>
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button color='primary' sx={{ fontSize: '30px' }} onClick={() => minProducts(ele)}>-</Button>
                        <Button color='primary' onClick={() => openShop()}>Cantidad {ele.cantidad}</Button>
                        <Button color='primary' sx={{ fontSize: '20px' }} onClick={() => AddProduct(ele)}>+</Button>
                    </Container>

                </div >

            ))}

            {productsInCart?.length ? <>
                <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button color='primary' sx={{ fontSize: '20px' }} onClick={() => resetCart()}>Limpiar</Button>
                    <Button color='primary' sx={{ fontSize: '20px' }} onClick={() => Navigate('/cliente/pay')} >Pagar</Button>
                </Container>
            </>
                : null}

        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    if (closeShop) return

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: 0,
                        mr: { sm: `${drawerWidth}px` },
                    }}
                >
                </AppBar>

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >

                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        anchor="right"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

            </Box>
        </>

    )
}
