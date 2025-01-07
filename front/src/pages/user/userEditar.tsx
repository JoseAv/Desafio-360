import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../context/loginContext";
import { FormUsuarios } from "../../components/operatorComponents/usuarios/FormUsuario";
import { typeClienteUser, typeRol } from "../../types/operator";
import { apiClient } from "../../utils/apis/operator/clientes";
import { apiRol } from "../../utils/apis/operator/rol";
import { useParams } from "react-router-dom";
import { callAcctionUser } from "../../utils/apis/opUser/acctionUser";


export const PagesUserEditar = () => {
    const [client, setClient] = useState<typeClienteUser[] | null>(null)
    const [rol, setRol] = useState<typeRol[] | null>(null)
    const [userData, setUserData] = useState<null>(null)
    const context = useContext(loginContext)

    const { id } = useParams()

    useEffect(() => {
        const CallData = async () => {

            const obj = {
                "acction": "V",
            }

            const newObject = {
                "acction": "VI",
                "data": {
                    "id": Number(id)
                }
            }
            const responseUser = await callAcctionUser(newObject)
            if (responseUser && responseUser.success && !userData) {
                const { password, ...newResponse } = responseUser.dataQuery[0]
                console.log(password)
                setUserData(newResponse)
            }

            const response = await apiClient(obj)
            if (response && response.success && !client) {
                setClient(response.dataQuery)
            }

            const responseRol = await apiRol(obj)
            if (responseRol && responseRol.success && !client) {
                setRol(responseRol.dataQuery)
            }



        }
        CallData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    if (!context) return <h1>Error: Contexto no disponible</h1>;
    const { user, loading } = context
    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <h1>No Permitido</h1>
    if (!client) return <h1>No hay cliente</h1>
    if (!rol) return <h1>No hay rol</h1>
    if (!userData) return <h1>No hay Usuario</h1>

    console.log(userData)
    return (


        <FormUsuarios isEdit={true} client={client} rol={rol} usuarios={userData} />

    )



}