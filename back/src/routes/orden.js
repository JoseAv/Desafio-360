import { Router } from "express";
import { OrdenControllers } from '../controllers/ordenControllers.js'


export const ordenRoutes = ({ ModelOrden }) => {

    const ordenRoutes = Router()
    const controllersOrden = new OrdenControllers({ ModelOrden })

    ordenRoutes.post('/', controllersOrden.acctionsOrden)
    return ordenRoutes
}