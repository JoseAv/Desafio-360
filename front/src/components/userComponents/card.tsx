import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext } from "react";
import { typeProductsApi } from "../../types/operator";
import { ShopingContext } from "../../context/shopingCardContext";

interface typeProducts {
    product: typeProductsApi | null
}

export const PagesCard: React.FC<typeProducts> = ({ product = null }) => {

    const context = useContext(ShopingContext)
    if (!context) return <h1>No existe Contexto</h1>
    const { AddProduct, productsInCart, minProducts } = context
    const comprobation = productsInCart?.some((ele: typeProductsApi) => ele.id === (product ? product.id : null)) ?? false;
    if (!product) return <h1>No disponible</h1>

    return (
        <>

            <Card sx={{ maxWidth: 360, width: 360 }}>
                <CardMedia
                    sx={{
                        height: 120,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    component={'img'}
                    alt="Imagen de la tarjeta"
                    image={product?.foto ?? '/'}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {product?.nombre.toUpperCase()}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Stock total : {product?.stock}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                        Precio: {product?.precio}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Marca: {product?.marca}
                    </Typography>

                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {comprobation ?
                        <>
                            <Button size="small" onClick={() => minProducts(product)}>Menos</Button>
                            <Button size="small">Total: {product.total}</Button>
                            <Button size="small" onClick={() => AddProduct(product)}>Mas</Button>
                        </>
                        :
                        product.id_estados === 1 ?
                            product.stock !== 0 ? <Button size="small" onClick={() => AddProduct(product)}>Agregar</Button> : <Button size="small" >No hay stock Disponible </Button>
                            : <Button size="small" >Producto no disponible</Button>
                    }

                </CardActions>
            </Card>
        </>
    );


}