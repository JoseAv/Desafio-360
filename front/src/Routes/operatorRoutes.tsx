import { Route, Routes } from "react-router-dom"
import { ProtectedOperator } from './protectedRoutes'
import { Operator } from "../pages/operator/Operator"



export const RouterOperator = () => {




    return (
        <>
            <Routes>
                <Route path="/" element={
                    <ProtectedOperator  >
                        <Operator />
                    </ProtectedOperator>} />
            </Routes>
        </>

    )
}

