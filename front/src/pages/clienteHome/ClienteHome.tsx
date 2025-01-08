import { Container } from "@mui/material"
import { PagesCard } from "../../components/userComponents/card"
import { useContext } from "react"
import { ShopingContext } from "../../context/shopingCardContext"
import { typeProductsApi } from "../../types/operator"
import ShoppingCar from "../../components/userComponents/shopingCart"


export const PagesClienteUser = () => {
    const context = useContext(ShopingContext)
    if (!context) return <h1>No existe Contexto</h1>
    const { products, loading, error, callProducts } = context
    callProducts()

    if (!products) return <h1>No hay Productos</h1>
    if (loading) return <h1>Cargando</h1>
    if (error) return <h1>Hubo un error</h1>
    console.log('Productos Aqui', products)


    return (
        <>


            <Container sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1200px', gap: '30px', marginTop: '100px' }}>
                {products.map((pro: typeProductsApi) => (
                    <PagesCard product={pro} key={pro.id} />

                ))}
            </Container>
            <ShoppingCar />

        </>

    )


}


