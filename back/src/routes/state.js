import { Router } from "express";
import { ControllersStates } from '../controllers/statesControllers.js'

export const stateRoutes = ({ ModelState }) => {
    console.log('ROUTES', ModelState)

    const RouterStates = Router()
    const states = new ControllersStates({ ModelState })
    RouterStates.post('/', states.accionStates)
    return RouterStates



}