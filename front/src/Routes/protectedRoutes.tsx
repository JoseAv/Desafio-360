import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { loginContext } from "../context/loginContext"


interface protectedData {
    children: JSX.Element
    user?: unknown
    rol?: number

}


export const ProtectedOperator: React.FC<protectedData> = ({ children }) => {
    const user = useContext(loginContext)
    console.log('Usuario', user)
    if (!user || !user.user || !user.user.id) return <Navigate to="/login" />


    const newUser = user?.user
    if (newUser && newUser.rol) {
        if (newUser.rol === 2) return <Navigate to="/cliente" />
    }


    return children

}


export const ProtectedLogin: React.FC<protectedData> = ({ children }) => {
    const user = useContext(loginContext)
    if (user) {
        user.loginUser()
    }

    if (user?.user && user.user.rol) {
        if (user.user.rol === 2) return <Navigate to="/cliente" />
        if (user.user.rol === 1) return <Navigate to="/operator" />
    }


    return children
}