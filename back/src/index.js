import express from 'express'
import { routesUser } from './routes/user.js'
import { routesProducts } from './routes/product.js'
import { stateRoutes } from './routes/state.js'
import { rolRoute } from './routes/rol.js'
import { categoryRoutes } from './routes/categoria.js'
import { clienteRoutes } from './routes/cliente.js'

import { ModelUsers } from './model/userModel.js'
import { ModelState } from './model/statesModel.js'
import { ModelRol } from './model/rolModel.js'
import { ModelProducts } from './model/productModel.js'
import { ModelCategory } from './model/categoriaModel.js'
import { ModelCliente } from './model/clienteModel.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import jwt from 'jsonwebtoken'
const SecretePass = 'secreto no dejarlo aqui pero es solo para hacer pruebas luego hay que pasrlo a variables de entorno'


const app = express()
const PORT = process.env.PORT ?? 3000
const dependencies = {
    ModelUsers,
    ModelState,
    ModelRol,
    ModelProducts,
    ModelCategory,
    ModelCliente
}

const main = async (dependencies) => {

    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use((req, res, next) => {
        let infoDate = req.cookies.access_user ?? null
        req.session = null
        if (infoDate) {
            try {
                let comprobateToken = jwt.verify(infoDate, SecretePass)
                req.session = { ...comprobateToken }
            } catch { }
        }
        next()

    })


    app.use('/', routesUser({ ModelUsers: dependencies.ModelUsers }))
    app.use('/states', stateRoutes({ ModelState: dependencies.ModelState }))
    app.use('/rol', rolRoute({ ModelRol: dependencies.ModelRol }))
    app.use('/products', routesProducts({ ModelProducts: dependencies.ModelProducts }))
    app.use('/category', categoryRoutes({ ModelCategory: dependencies.ModelCategory }))
    app.use('/cliente', clienteRoutes({ ModelCliente: dependencies.ModelCliente }))


    app.listen(PORT, () => {
        console.log('LISTEN IN PORT', PORT)
    })

}

main(dependencies)


