import { useContext } from "react";
import { loginContext } from "../../../context/loginContext";
import { FormClientes } from "../../../components/operatorComponents/clientes/Form";
import NavBarOperator from "../../../components/common/navigateOperator";

export const PagesClienteCreate = () => {

    const context = useContext(loginContext)
    if (!context) return <h1>Error: Contexto no disponible</h1>;

    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>;


    return (

        <>
            <NavBarOperator />
            <FormClientes isEdit={false} />
        </>

    )



}