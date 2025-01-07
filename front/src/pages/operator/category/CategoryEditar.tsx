import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import { useParams } from "react-router-dom";
import { Category } from "../../../types/operator";
import { FormCategorias } from "../../../components/operatorComponents/categorias/FormCategory";
import { apiCategory } from "../../../utils/apis/operator/category";

export const PagesCategoryEditar = () => {
    const [category, setCategory] = useState<Category | null>(null)


    const context = useContext(loginContext)
    const { id } = useParams()

    useEffect(() => {
        const newCategory = async () => {
            const obj = {
                "acction": "VI",
                "data": {
                    "id": Number(id)
                }
            }
            const response = await apiCategory(obj)
            if (response && response.success && !category) {
                setCategory(response.dataQuery)
            }
        }

        newCategory()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!id) return <h1>Cliente no Valido o no existe</h1>
    if (!context) return <h1>Error: Contexto no disponible</h1>;

    const validationContext = context
    if (validationContext.loading) return <h1>Cargando...</h1>;
    if (!validationContext.user) return <h1>No Permitido</h1>;
    if (!category) return <h1>No hay categorias existente</h1>



    return (
        <FormCategorias isEdit={true} category={category} />
    )

}