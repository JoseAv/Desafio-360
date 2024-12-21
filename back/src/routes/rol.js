import { Router } from "express";
import { rolControllers } from '../controllers/rolControllers.js'


export const rolRoute = ({ ModelRol }) => {

    const RolRoutes = Router()
    const controllersRol = new rolControllers({ ModelRol })

    RolRoutes.post('/', controllersRol.acctionsRol)
    return RolRoutes
}