/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react"
import { typeProductsApi } from "../../../types/operator"

export const useProducts = (obj: unknown) => {
    const [products, setProducts] = useState<typeProductsApi | null | typeProductsApi>(null)
    const [errorProducts, setErrorProducts] = useState<null | string>(null)
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false)


    useEffect(() => {
        async function CallProducts() {
            if (products) return

            setLoadingProducts(true)
            setErrorProducts(null)

            try {
                const newProducts: any = await apiProducts(obj)
                console.log(newProducts)
                const changeProducts = newProducts.dataQuery.map((ele: any) => ({
                    ...ele,
                    quantity: 0,
                    total: 0
                }))

                setProducts(changeProducts)

            } catch (error: any) {
                setErrorProducts(error.message || 'Error al cargar los productos')
            } finally {
                setLoadingProducts(false)
            }
        }
        CallProducts()
    }, [obj, products])

    return { products, errorProducts, loadingProducts, setProducts, setErrorProducts }
}



export async function apiProducts(obj: unknown) {
    console.log(obj)
    const responseProducts = await fetch('http://localhost:3000/products', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await responseProducts.json()
}


export async function apiProductsText(obj: any) {
    console.log('Objetos', obj)
    const formdata = new FormData()
    const { foto, ...data }: any = obj
    formdata.append('foto', foto ? foto[0] : null)
    formdata.append('data', JSON.stringify(data))
    // for (const [key, value] of formdata.entries()) {
    //     console.log(key, value);
    // }


    const responseProducts = await fetch('http://localhost:3000/products', {
        method: 'POST',
        credentials: 'include',
        body: formdata,
    })
    return await responseProducts.json()
}