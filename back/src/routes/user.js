import { Router } from "express";
import { ControllersUser } from '../controllers/userController.js'


export const routesUser = ({ ModelUsers }) => {

    const userRouter = Router()
    const userController = new ControllersUser({ ModelUsers })

    userRouter.post('/', userController.userAccion)
    return userRouter


}