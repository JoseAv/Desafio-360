import { Router } from "express";
import { ClienteControllers } from '../controllers/clientesControllers.js'


export const clienteRoutes = ({ ModelCliente }) => {

    const clienteRoutes = Router()
    const controllersRol = new ClienteControllers({ ModelCliente })

    clienteRoutes.post('/', controllersRol.acctionsCliente)
    return clienteRoutes
}