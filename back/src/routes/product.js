import { Router } from "express";
import { ControllerProducts } from '../controllers/productsControllers.js'
import multer from 'multer'



const upload = multer({ storage: multer.memoryStorage() });

export const routesProducts = ({ ModelProducts }) => {

    const productRouter = Router()
    const productController = new ControllerProducts({ ModelProducts })
    productRouter.post('/', upload.single('foto'), productController.accionProducts)

    return productRouter

}