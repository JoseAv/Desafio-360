import { Router } from "express";
import { CategoryControllers } from '../controllers/categoriaControllers'


export const rolRoute = ({ ModelCategory }) => {

    const categoryRoutes = Router()
    const controllersCategory = new CategoryControllers({ ModelCategory })

    categoryRoutes.post('/', controllersCategory.acctionsCategory)
    return categoryRoutes
}