import { typeProductsApi } from "./operator"

export interface ShopingTypes {
    children: JSX.Element
}

export interface ShopingValues {
    products: typeProductsApi[] | null
    loading: boolean
    error: string | null
    callProducts: () => void
    AddProduct: (product: typeProductsApi) => void
    productsInCart: typeProductsApi[] | null
    minProducts: (product: typeProductsApi) => void
    resetCart: () => void
    openShop: () => void
    closeShop: boolean
    TotalCard: () => number
}