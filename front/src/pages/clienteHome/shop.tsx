/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { ShopingContext } from "../../context/shopingCardContext"
import { SubmitHandler, useForm } from "react-hook-form"
import { Alert, Box, Button, Card, CardContent, CardMedia, Container, TextField, Typography } from "@mui/material"
import { apiOrden } from "../../utils/apis/opUser/orden"
import { useNavigate } from "react-router-dom"
import { typeProductsApi } from "../../types/operator"
import BarCliente from "../../components/common/navigateCliente"

interface orden {
    nombre_completo: string,
    direccion: string,
    telefono: string,
    correo_electronico: string,
    total_orden: number
    fecha_entrega: string
}


export const PagePay = () => {
    const [message, setMessage] = useState(null)

    const Navigate = useNavigate()
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<orden>()

    const context = React.useContext(ShopingContext)
    if (!context) return <h1>No hay Context</h1>
    const { productsInCart, TotalCard, resetCart } = context

    if (!productsInCart?.length) return <h1>No hay productos para comprar</h1>

    const onSubmit: SubmitHandler<orden> = async (data) => {
        data.total_orden = TotalCard()
        data.fecha_entrega = "2024-12-22"
        const obj = {
            acction: 'C',
            data: data,
            productos: productsInCart
        }
        const responseOrden: any = await apiOrden(obj)
        if (!responseOrden.success) {
            setMessage(responseOrden.message)
            return
        }

        reset()
        resetCart()
        setMessage(null)
        return Navigate("/cliente/home")
    }

    return (
        <>

            <BarCliente />
            {message ? <Alert variant="filled" severity="error"> {message}</Alert> : null}

            <Container sx={{ display: 'flex' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '40px', marginTop: '90px' }}>
                        <h1>Datos de la orden</h1>


                        <TextField id="nombre"
                            label="Nombre Completo"
                            variant="filled"
                            sx={{ width: '400px' }}
                            {...register("nombre_completo", { required: true })} />

                        <TextField id="direccion"
                            label="Direccion"
                            variant="filled"
                            sx={{ width: '400px' }}
                            {...register("direccion", { required: true })} />


                        <TextField id="telefono"
                            label="Telefono"
                            variant="filled"
                            sx={{ width: '400px' }}
                            {...register("telefono", { required: true })} />

                        <TextField id="correo_electronico"
                            label="Correo Electronico"
                            variant="filled"
                            sx={{ width: '400px' }}
                            {...register("correo_electronico", { required: true })} />

                        <Container sx={{ display: 'flex', gap: '10px' }}>
                            <Button type="submit" variant="contained" color="error" sx={{ width: '200px' }} onClick={() => Navigate('/cliente/home')}>Cancelar</Button>
                            <Button type="submit" variant="contained" sx={{ width: '200px' }}>Confirmar datos</Button>

                        </Container>
                    </Container>
                </form >

                <Container sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', gap: '10px', marginTop: '90px' }}>
                    <h1>Detalle de las ordenes</h1>
                    <Button sx={{ fontSize: '15px', background: 'var(--primary-color)', color: 'white', width: '100%' }} >Total: {TotalCard()} Q</Button>
                    {productsInCart?.map((ele: typeProductsApi) => (
                        <div key={ele.id}>
                            <Card sx={{ display: 'flex', width: 300, flexDirection: 'column' }}>
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
                                            <Typography
                                                variant="subtitle1"
                                                component="div"
                                                sx={{ color: 'var(--primary-color)' }}
                                            >
                                                Cantidad: {ele.cantidad}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                        </Box>
                                    </Box>
                                </Container>

                            </Card>
                        </div >

                    ))}

                </Container>

            </Container>

        </>
    )


}