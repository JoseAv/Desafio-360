/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useEffect, useState } from "react";
import { typeProductsApi } from "../types/operator";
import { apiProducts } from "../utils/apis/shared/productos";
import { ShopingTypes, ShopingValues } from "../types/contextCar";



export const ShopingContext = createContext<ShopingValues | null>(null)


export const Shoping: React.FC<ShopingTypes> = ({ children }) => {
    const [products, setProducts] = useState<typeProductsApi[] | null>(null)
    const [productsInCart, setProductsInCart] = useState<typeProductsApi[] | null>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [closeShop, setCloseShop] = useState<boolean>(false)


    function openShop() {
        setCloseShop((prev) => {
            return !prev
        })
    }


    function TotalCard() {
        let total = 0
        if (!productsInCart?.length) return total

        productsInCart.forEach((ele: typeProductsApi) => {
            if (ele.total) {
                total += Number(ele.total)
            }
        })
        return total

    }

    const callProducts = useCallback(async () => {
        try {
            setLoading(true);
            const newProducst = await apiProducts({ acction: "V" });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const changeProducts = newProducst.dataQuery.map((ele: any) => ({
                ...ele,
                cantidad: 1,
                total: ele.precio,
                subtotal: 0,
                id_productos: ele.id
            }))
            setProducts(changeProducts);
        } catch (error) {
            console.log(error);
            setError("Error en los productos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        callProducts();
    }, [callProducts])

    const AddProduct = (product: typeProductsApi) => {
        const newProducts = []
        if (!productsInCart) {
            newProducts.push(product)
            return setProducts(newProducts)
        }

        const indexProducts = productsInCart.findIndex((ele: typeProductsApi) => ele.id === product.id)
        if (indexProducts === -1) {
            newProducts.push(...productsInCart, product)
            setProductsInCart(newProducts)
            return
        } else {
            setProductsInCart((prev) => {
                if (!prev) return [product]
                const newPrev = [...prev]
                if (newPrev[indexProducts].cantidad) {
                    newPrev[indexProducts].cantidad += 1;
                    newPrev[indexProducts].total = newPrev[indexProducts].cantidad * newPrev[indexProducts].precio;
                }

                return newPrev;
            });
        }
    }

    const minProducts = (product: typeProductsApi) => {
        if (!productsInCart) return

        const indexProducts = productsInCart.findIndex((ele: typeProductsApi) => ele.id === product.id)
        if (indexProducts === -1) return

        if (productsInCart[indexProducts].cantidad === 1) {
            const newProducts = productsInCart.filter(product => product.id !== productsInCart[indexProducts].id);
            setProductsInCart(newProducts)
            return
        }
        setProductsInCart((prev) => {
            if (!prev) return [product]
            const newPrev = [...prev]
            if (newPrev[indexProducts].cantidad) {
                newPrev[indexProducts].cantidad -= 1;
                newPrev[indexProducts].total = newPrev[indexProducts].cantidad * newPrev[indexProducts].precio;
            }
            return newPrev;
        });

    }


    const resetCart = () => {
        setProductsInCart([])
    }

    return (
        <ShopingContext.Provider value={
            {
                products,
                loading,
                error,
                callProducts,
                AddProduct,
                productsInCart,
                minProducts,
                resetCart,
                openShop,
                closeShop,
                TotalCard


            }}>
            {children}
        </ShopingContext.Provider>


    )




}