import { Router } from "express";
import { userControllers } from '../controllers/user.js'


export const routesUser = async ({ userModel }) => {

    const userRouter = Router()
    const userController = new userControllers({ userModel })
    userRouter.get('/', userController.userSeach)


    return userRouter


}