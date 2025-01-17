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
    const { AddProduct, productsInCart } = context
    const comprobation = productsInCart?.some((ele: typeProductsApi) => ele.id === (product ? product.id : null)) ?? false;
    if (!product) return <h1>No disponible</h1>

    return (
        <>

            <Card sx={{ maxWidth: 360, width: 220, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardMedia
                    sx={{
                        height: 90,
                        width: '100%',
                        objectFit: 'contain',
                    }}
                    component={'img'}
                    alt="Imagen de la tarjeta"
                    image={product?.foto || '../../../public/No_Disponible_Imagen.jpg'}

                    title="green iguana"
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                        {product?.nombre.toUpperCase()}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="div">
                        Stock total : {product?.stock}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#003366' }}>
                        Marca: {product?.marca}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#003366', fontWeight: 'bold' }}>
                        Precio:  {product?.precio} Q
                    </Typography>

                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {comprobation ?
                        <>
                            <Button size="small" variant="contained" onClick={() => AddProduct(product)}>Agregar +</Button>
                        </>
                        :
                        product.id_estados === 1 ?
                            product.stock !== 0 ?
                                <Button size="small" variant="contained" onClick={() => AddProduct(product)}>Agregar </Button>
                                : <Button size="small" disabled={true}>No hay stock Disponible </Button>
                            : <Button size="small" disabled={true}>Producto no disponible</Button>
                    }

                </CardActions>
            </Card>
        </>
    );


}