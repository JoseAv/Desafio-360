import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import { FormClientes } from "../../../components/operatorComponents/clientes/Form";
import { useParams } from "react-router-dom";
import { Inputs } from "../../../types/operator";
import { apiClient } from "../../../utils/apis/operator/clientes";
import NavBarOperator from "../../../components/common/navigateOperator";

export const PagesClienteEditar = () => {
    const [client, setClient] = useState<Inputs | null>(null)


    const context = useContext(loginContext)
    const { id } = useParams()

    useEffect(() => {
        const newClient = async () => {
            console.log('Id', id)
            const obj = {
                "acction": "VI",
                "data": {
                    "id": Number(id)
                }
            }
            const response = await apiClient(obj)
            if (response && response.success && !client) {
                setClient(response.dataQuery[0])
            }
        }

        newClient()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    if (!id) return <h1>Cliente no Valido o no existe</h1>
    if (!context) return <h1>Error: Contexto no disponible</h1>;

    const validationContext = context
    if (validationContext.loading) return <h1>Cargando...</h1>;
    if (!validationContext.user) return <h1>No Permitido</h1>;
    if (!client) return <h1>No hay cliente existente</h1>



    return (

        <>
            <NavBarOperator />
            <FormClientes isEdit={true} cliente={client} />
        </>
    )

}