import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/loginContext";
import { CategoryForm } from "../../types/operator";
import { FormProductos } from "../../components/operatorComponents/productos/productos";
import { apiCategory } from "../../utils/apis/operator/category";
import NavBarOperator from "../../components/common/navigateOperator";


export const PagesProductosCreate = () => {
    const [categorias, setCategorias] = useState<CategoryForm[] | null>(null)
    const context = useContext(loginContext)

    useEffect(() => {
        const CallData = async () => {

            const obj = {
                "acction": "V",
            }
            const response = await apiCategory(obj)
            if (response && response.success && !categorias) {
                setCategorias(response.dataQuery)
            }

        }
        CallData()

    }, [])



    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>
    if (!categorias) return <h1>No hay Categorias</h1>
    return (

        <>
            <NavBarOperator />
            <FormProductos isEdit={false} categorias={categorias} />
        </>

    )



}