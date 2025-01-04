import { useContext } from "react"
import { loginContext } from "../../context/loginContext"

export const Operator = () => {
    const context = useContext(loginContext)




    if (!context) {
        return <h1>Error: Contexto no disponible</h1>;
    }

    const { user, loading } = context;

    if (loading) {
        return <h1>Cargando...</h1>;
    }

    if (!user) {
        return <h1>No Permitido</h1>;
    }

    return (
        <div>
            <h1>Bienvenido, {user.correo_electronico}</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );


}