import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { ShopingContext } from '../../context/shopingCardContext';
import { typeProductsApi } from '../../types/operator';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 220;

interface Props {
    window?: () => Window;
}

export default function ShoppingCar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const Navigate = useNavigate()

    const context = React.useContext(ShopingContext)
    if (!context) return <h1>No hay Context</h1>
    const { closeShop, TotalCard, resetCart, AddProduct, minProducts, productsInCart } = context

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
    };


    const drawer = (
        <>
            <Box sx={{
                with: '100%', padding: '10px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', borderBottom: ' 1px solid rgba(0, 0, 0, 0.12)',
                boxshadow: 'var(--Paper-shadow)'
            }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: 'var(--primary-color)' }}
                >
                    Mi Carrito
                </Typography>

                <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{ color: 'var(--primary-color)' }}
                >
                    No. De Productos {productsInCart?.length ?? 0}
                </Typography>

            </Box>


            {productsInCart?.map((ele: typeProductsApi) => (
                <div key={ele.id}>
                    <Card sx={{ display: 'flex', width: '100%', flexDirection: 'column', marginTop: '20px' }}>
                        <Container sx={{ display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: '50%',
                                    width: '35%',
                                    objectFit: 'cover',
                                }}
                                image={ele.foto || '../../../public/No_Disponible_Imagen.jpg'}
                                alt="Image no Disponible"
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography
                                        component="div"
                                        variant="subtitle2"
                                        sx={{ color: 'var(--primary-color)' }}>
                                        {ele.nombre}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        sx={{ color: 'var(--primary-color)' }}
                                    >
                                        {ele.precio} Q
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                </Box>
                            </Box>
                        </Container>


                        <Box sx={{ display: 'flex', justifyContent: 'Center', marginBottom: '5px', flexDirection: 'column', alignItems: 'center' }}>
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ color: 'var(--primary-color)' }}
                                >
                                    Cantidad :
                                </Typography>
                            </Box>
                            <Box>
                                <Button color='primary' sx={{ fontSize: '50px', height: '30px' }} onClick={() => minProducts(ele)}>-</Button>
                                <Button size='small' variant="outlined" sx={{ height: '30px' }} >  <small className='priceCar'>{ele.cantidad}</small></Button>
                                <Button sx={{ fontSize: '35px', height: '30px' }} onClick={() => AddProduct(ele)}>+</Button>

                            </Box>
                        </Box>

                    </Card>

                </div >

            ))}

            <Box sx={{ width: '100%' }}>
                {productsInCart?.length ? <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
                        <Button variant='outlined' color='error' sx={{ fontSize: '15px', width: '50%', height: '45px' }} onClick={() => resetCart()}>Limpiar</Button>
                        <Button variant='outlined' color='primary' sx={{ fontSize: '15px', width: '50%' }} onClick={() => Navigate('/cliente/pay')} >Pagar</Button>
                    </Box>

                    <Button sx={{ fontSize: '15px', background: 'var(--primary-color)', color: 'white', width: '100%' }} >Total: {TotalCard()} Q</Button>
                </>
                    : null}



            </Box>
        </>

    )

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
