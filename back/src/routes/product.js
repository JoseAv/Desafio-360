import { Router } from "express";
import { ControllerProducts } from '../controllers/productsControllers.js'


export const routesProducts = ({ ModelProducts }) => {

    const productRouter = Router()
    const productController = new ControllerProducts({ ModelProducts })
    productRouter.post('/', productController.accionProducts)

    return productRouter

}