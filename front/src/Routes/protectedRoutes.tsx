import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { loginContext } from "../context/loginContext"

export const ProtectedOperator = () => {
    const user = useContext(loginContext)
    if (user) {
        user.loginUser()
    }
    if (user?.loading) return <h1>Cargando...</h1>;

    if (!user || !user.user || !user.user.id) return <Navigate to="/login" />

    const newUser = user.user
    if (newUser && newUser.rol) {
        if (newUser.rol === 2) return <Navigate to="/cliente" />
    }

    return <Outlet />
}

export const ProtectedCliente = () => {
    const user = useContext(loginContext)
    if (user) {
        user.loginUser()
    }
    if (user?.loading) return <h1>Cargando...</h1>;

    if (!user || !user.user || !user.user.id) return <Navigate to="/login" />
    return <Outlet />
}

export const ProtectedLogin = () => {
    const user = useContext(loginContext)
    if (user) {
        user.loginUser()
    }

    if (user?.user && user.user.rol) {
        if (user.user.rol === 2) return <Navigate to="/cliente" />
        if (user.user.rol === 1) return <Navigate to="/operator/home" />
    }

    return <Outlet />
}