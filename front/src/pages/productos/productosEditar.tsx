import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/loginContext";
import { CategoryForm, typeProductsApi } from "../../types/operator";
import { FormProductos } from "../../components/operatorComponents/productos/productos";
import { apiCategory } from "../../utils/apis/operator/category";
import { useParams } from "react-router-dom";
import { apiProducts } from "../../utils/apis/shared/productos";


export const PagesProductosEditar = () => {
    const [categorias, setCategorias] = useState<CategoryForm[] | null>(null)
    const [productos, setProduct] = useState<typeProductsApi | null>(null)
    const context = useContext(loginContext)
    const { id } = useParams()


    useEffect(() => {
        const CallData = async () => {

            const obj = {
                "acction": "V",
            }

            const newObj =
            {
                "acction": "VI",
                "data": { id: id }
            }

            const response = await apiCategory(obj)
            if (response && response.success && !categorias) {
                setCategorias(response.dataQuery)
            }

            const responseOne = await apiProducts(newObj)
            if (responseOne && responseOne.success && !productos) {
                const newDatas = responseOne.dataQuery[0]
                newDatas.foto = null
                setProduct(newDatas)
            }


        }
        CallData()

    }, [])



    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>
    if (!categorias) return <h1>No hay Categorias</h1>
    if (!productos) return <h1>No hay Categorias</h1>
    console.log('Productos aqui', productos)
    return (


        <FormProductos isEdit={true} categorias={categorias} productos={productos} />

    )



}