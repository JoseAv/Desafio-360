import { Router } from "express";
import { ControllersUser } from '../controllers/userController.js'


export const routesUser = ({ ModelUsers }) => {

    const userRouter = Router()
    const userController = new ControllersUser({ ModelUsers })

    userRouter.post('/login', userController.login)
    userRouter.get('/logout', userController.logout)
    userRouter.post('/register', userController.register)
    userRouter.post('/actualizar', userController.updateUser)
    userRouter.get('/session', userController.inSession)
    userRouter.post('/users', userController.accionUser)

    return userRouter

}