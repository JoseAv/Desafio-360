import { useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import { FormCategorias } from "../../../components/operatorComponents/categorias/FormCategory";

export const PagesCategoriasCreate = () => {

    const context = useContext(loginContext)
    if (!context) return <h1>Error: Contexto no disponible</h1>;

    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>;


    return (


        <FormCategorias isEdit={false} />

    )



}