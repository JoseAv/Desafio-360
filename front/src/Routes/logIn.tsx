import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/LogIn/LogIn"



export const RouterLogIn = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </>

    )
}

