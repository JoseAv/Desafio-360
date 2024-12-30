import { Router } from "express";
import { CategoryControllers } from '../controllers/categoriaControllers.js'


export const categoriaRoute = ({ ModelCategory }) => {

    const categoryRoutes = Router()
    const controllersCategory = new CategoryControllers({ ModelCategory })

    categoryRoutes.post('/', controllersCategory.acctionsCategory)
    return categoryRoutes
}