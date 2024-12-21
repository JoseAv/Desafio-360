import express from 'express'
import { routesUser } from './routes/user.js'
import { stateRoutes } from './routes/state.js'
import { rolRoute } from './routes/rol.js'
import { ModelUsers } from './model/userModel.js'
import { ModelState } from './model/statesModel.js'
import { ModelRol } from './model/rolModel.js'
import cors from 'cors'


const app = express()
const PORT = process.env.PORT ?? 3000
const dependencies = {
    ModelUsers,
    ModelState,
    ModelRol
}

const main = async (dependencies) => {
    app.use(express.json())
    app.use(cors())
    app.use('/user', routesUser({ ModelUsers: dependencies.ModelUsers }))
    app.use('/states', stateRoutes({ ModelState: dependencies.ModelState }))
    app.use('/rol', rolRoute({ ModelRol: dependencies.ModelRol }))


    app.listen(PORT, () => {
        console.log('LISTEN IN PORT', PORT)
    })

}

main(dependencies)


