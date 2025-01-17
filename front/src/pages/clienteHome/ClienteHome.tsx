import { Container } from "@mui/material"
import { PagesCard } from "../../components/userComponents/card"
import { useContext, useEffect } from "react"
import { ShopingContext } from "../../context/shopingCardContext"
import { typeProductsApi } from "../../types/operator"
import ShoppingCar from "../../components/userComponents/shopingCart"
import BarCliente from "../../components/common/navigateCliente"


export const PagesClienteUser = () => {
    const context = useContext(ShopingContext)
    useEffect(() => {
        if (context) {
            callProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!context) return <h1>No existe Contexto</h1>
    const { products, loading, error, callProducts } = context


    if (!products) return <h1>No hay Productos</h1>
    if (loading) return <h1>Cargando</h1>
    if (error) return <h1>Hubo un error</h1>
    console.log('Productos Aqui', products)


    return (
        <>
            <BarCliente />

            <Container sx={{ display: 'flex', flexWrap: 'wrap', width: '1200px', gap: '30px', marginTop: '100px', marginBottom: '50px' }}>
                {products.map((pro: typeProductsApi) => (
                    <PagesCard product={pro} key={pro.id} />

                ))}
            </Container>
            <ShoppingCar />

        </>

    )


}


