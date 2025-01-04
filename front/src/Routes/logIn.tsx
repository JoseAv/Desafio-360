import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/LogIn/LogIn"
import { ProtectedLogin } from './protectedRoutes'



export const RouterLogIn = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <ProtectedLogin  >
                        <Login />
                    </ProtectedLogin>} />
            </Routes>
        </>

    )
}

